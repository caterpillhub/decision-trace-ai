'use client'

import { useState } from 'react'
import { Plus, Trash2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { startDecision } from '@/lib/api'

interface DecisionEntryProps {
  onFirstQuestion: (question: string) => void
  onSaveDecision: (data: {
    title: string
    description: string
    timeframe: string
    options: string[]
    keyFactors: string
    constraints: string
  }) => void
  initialData: any
}

export default function DecisionEntry({
  onFirstQuestion,
  onSaveDecision,
  initialData
}: DecisionEntryProps) {
  const [title, setTitle] = useState(initialData.title || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [timeframe, setTimeframe] = useState(initialData.timeframe || '')
  const [options, setOptions] = useState(initialData.options || ['', ''])
  const [keyFactors, setKeyFactors] = useState(initialData.keyFactors || '')
  const [constraints, setConstraints] = useState(initialData.constraints || '')
  const [loading, setLoading] = useState(false)

  // ---------------------------
  // OPTION HANDLERS
  // ---------------------------

  const handleAddOption = () => {
    setOptions([...options, ''])
  }

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  // ---------------------------
  // BUILD DECISION TEXT FOR AI
  // ---------------------------

  const buildDecisionText = () => {
    const validOptions = options.filter(o => o.trim() !== '')

    return `
Decision Title:
${title}

Context:
${description || 'Not provided'}

Timeframe:
${timeframe || 'Not specified'}

Options:
${validOptions.map((o, i) => `${i + 1}. ${o}`).join('\n')}

Key Factors:
${keyFactors || 'Not specified'}

Constraints:
${constraints || 'Not specified'}
`.trim()
  }

  // ---------------------------
  // SUBMIT HANDLER
  // ---------------------------

  const handleSubmit = async () => {
    const validOptions = options.filter(o => o.trim() !== '')

    if (!title.trim() || validOptions.length < 2) {
      alert('Please enter a decision title and at least 2 options')
      return
    }

    setLoading(true)

    try {
      // ✅ Save decision locally for UI display
      onSaveDecision({
        title: title.trim(),
        description: description.trim(),
        timeframe: timeframe.trim(),
        options: validOptions,
        keyFactors: keyFactors.trim(),
        constraints: constraints.trim()
      })

      // ✅ Send narrative to backend
      const decisionText = buildDecisionText()
      const res = await startDecision(decisionText)

      // ✅ Move to AI follow-up flow
      onFirstQuestion(res.follow_up_question)
    } catch (err) {
      console.error(err)
      alert('Check browser console for error details')
    } finally {
      setLoading(false)
    }
  }

  const isValid = title.trim() && options.filter(o => o.trim()).length >= 2

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Define Your Decision
        </h2>
        <p className="text-muted-foreground">
          Help us understand your situation for better analysis
        </p>
      </div>

      <div className="grid gap-8 max-w-2xl mx-auto">
        {/* Decision Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            What decision are you facing?
          </label>
          <Input
            placeholder="e.g., Should I change careers?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Provide more context
          </label>
          <textarea
            placeholder="Describe the situation, your current circumstances, and why this decision matters..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-28"
          />
        </div>

        {/* Timeframe */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Decision timeframe
          </label>
          <Input
            placeholder="e.g., Within 3 months, by end of year"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
          />
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">
            Options to consider
          </label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(index, e.target.value)
                  }
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="px-3 py-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleAddOption}
            className="flex items-center gap-2 text-accent hover:text-secondary transition-colors text-sm font-medium mt-2"
          >
            <Plus className="w-4 h-4" />
            Add another option
          </button>
        </div>

        {/* Key Factors */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Key factors to consider
          </label>
          <textarea
            placeholder="What matters most? (e.g., salary, growth, work-life balance, location)"
            value={keyFactors}
            onChange={(e) => setKeyFactors(e.target.value)}
            className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-24"
          />
        </div>

        {/* Constraints */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Constraints or limitations
          </label>
          <textarea
            placeholder="What limits your choices? (e.g., budget, timeline, location)"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-24"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full h-12 bg-accent hover:bg-secondary text-accent-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze My Decision'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
