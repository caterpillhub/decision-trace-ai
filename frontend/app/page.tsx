'use client'

import { useState } from 'react'
import Header from '@/components/header'
import DecisionEntry from '@/components/decision-entry'
import AnalysisView from '@/components/analysis-view'
import StressTests from '@/components/stress-tests'
import { sendFollowUp, analyzeDecision } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [step, setStep] = useState<'entry' | 'followup' | 'analysis' | 'results'>('entry')

  // ---------------------------
  // Decision state
  // ---------------------------
  const [decision, setDecision] = useState({
    title: '',
    description: '',
    timeframe: '',
    options: ['', ''],
    keyFactors: '',
    constraints: ''
  })

  // ---------------------------
  // AI flow state
  // ---------------------------
  const [question, setQuestion] = useState<string | null>(null)
  const [answer, setAnswer] = useState('')
  const [analysisText, setAnalysisText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // ---------------------------
  // ENTRY → FIRST QUESTION
  // ---------------------------
  const handleFirstQuestion = (q: string) => {
    setQuestion(q)
    setStep('followup')
  }

  // ---------------------------
  // FOLLOW-UP LOOP
  // ---------------------------
  const handleFollowUpSubmit = async () => {
    if (!answer.trim()) return

    setLoading(true)
    try {
      const res = await sendFollowUp(answer)

      // AI still needs clarification
      if ('follow_up_question' in res) {
        setQuestion(res.follow_up_question)
        setAnswer('')
        return
      }

      // AI is ready → final analysis
      const final = await analyzeDecision()
      setAnalysisText(final.analysis)
      setStep('analysis')
    } catch (err) {
      console.error(err)
      alert('Something went wrong during analysis')
    } finally {
      setLoading(false)
    }
  }

  // ---------------------------
  // RESET
  // ---------------------------
  const handleNewDecision = () => {
    setStep('entry')
    setQuestion(null)
    setAnswer('')
    setAnalysisText(null)
    setDecision({
      title: '',
      description: '',
      timeframe: '',
      options: ['', ''],
      keyFactors: '',
      constraints: ''
    })
  }

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* STEP 1 — ENTRY */}
        {step === 'entry' && (
          <DecisionEntry
            initialData={decision}
            onSaveDecision={setDecision}
            onFirstQuestion={handleFirstQuestion}
          />
        )}

        {/* STEP 2 — FOLLOW-UP */}
        {step === 'followup' && question && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Clarifying Question
            </h2>

            <p className="text-lg text-center">{question}</p>

            <Input
              placeholder="Your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <Button
              onClick={handleFollowUpSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Thinking…' : 'Submit Answer'}
            </Button>
          </div>
        )}

        {/* STEP 3 — ANALYSIS */}
        {step === 'analysis' && analysisText && (
          <AnalysisView
            decision={decision}
            analysisText={analysisText}
            onBack={handleNewDecision}
            onNext={() => setStep('results')}
          />
        )}

        {/* STEP 4 — STRESS TESTS */}
        {step === 'results' && (
          <StressTests
            decision={decision}
            onBack={() => setStep('analysis')}
            onNewDecision={handleNewDecision}
          />
        )}
      </main>
    </div>
  )
}
