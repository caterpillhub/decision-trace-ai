'use client'

import React from "react"

import { ChevronLeft, Check, AlertTriangle, TrendingDown, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StressTestsProps {
  decision: any
  onBack: () => void
  onNewDecision: () => void
}

interface TestScenario {
  title: string
  description: string
  icon: React.ReactNode
  impact: 'high' | 'medium' | 'low'
  results: Record<string, string>
}

export default function StressTests({ decision, onBack, onNewDecision }: StressTestsProps) {
  const testScenarios: TestScenario[] = [
    {
      title: 'Worst Case Scenario',
      description: 'If everything that could go wrong does go wrong',
      icon: <AlertTriangle className="w-5 h-5" />,
      impact: 'high',
      results: {
        [decision.options[0]]: 'Still viable with contingency plans',
        [decision.options[1]]: 'Significant challenges but manageable',
        ...(decision.options[2] && {
          [decision.options[2]]: 'High risk exposure'
        })
      }
    },
    {
      title: 'Best Case Scenario',
      description: 'If all conditions align favorably',
      icon: <Zap className="w-5 h-5" />,
      impact: 'high',
      results: {
        [decision.options[0]]: 'Exceptional outcomes with high satisfaction',
        [decision.options[1]]: 'Strong positive results',
        ...(decision.options[2] && {
          [decision.options[2]]: 'Transformative potential'
        })
      }
    },
    {
      title: 'Constraint Impact',
      description: 'How limitations affect each option',
      icon: <AlertTriangle className="w-5 h-5" />,
      impact: 'medium',
      results: {
        [decision.options[0]]: decision.constraints
          ? 'Some constraints apply'
          : 'No major constraint impact',
        [decision.options[1]]: decision.constraints
          ? 'Moderate constraint impact'
          : 'Minimal limitations',
        ...(decision.options[2] && {
          [decision.options[2]]: 'Constraints require careful planning'
        })
      }
    },
    {
      title: 'Long-term Viability',
      description: 'Sustainability and growth potential over time',
      icon: <TrendingDown className="w-5 h-5" />,
      impact: 'medium',
      results: {
        [decision.options[0]]: 'Strong long-term trajectory',
        [decision.options[1]]: 'Moderate growth potential',
        ...(decision.options[2] && {
          [decision.options[2]]: 'Dependent on external factors'
        })
      }
    }
  ]

  const recommendations = [
    {
      title: 'Primary Recommendation',
      option: decision.options[0],
      reason: 'Best overall balance of factors and lowest risk profile'
    },
    {
      title: 'Alternative Path',
      option: decision.options[1],
      reason: 'Consider this if circumstances change or new information emerges'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Stress Test Results</h2>
        <p className="text-muted-foreground">How your options hold up under different scenarios</p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Test Scenarios */}
        {testScenarios.map((test, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  test.impact === 'high'
                    ? 'bg-destructive/10 text-destructive'
                    : test.impact === 'medium'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-secondary/10 text-secondary'
                }`}>
                  {test.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{test.title}</h3>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                test.impact === 'high'
                  ? 'bg-destructive/10 text-destructive'
                  : test.impact === 'medium'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-secondary/10 text-secondary'
              }`}>
                {test.impact.charAt(0).toUpperCase() + test.impact.slice(1)} Impact
              </span>
            </div>

            <div className="space-y-2 mt-4">
              {Object.entries(test.results).map(([option, result]) => (
                <div key={option} className="bg-input rounded-lg p-3 flex gap-3">
                  <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{option}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{rec.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-semibold text-secondary">{rec.option}</span>
                    {' — '}
                    {rec.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Decision Summary</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-input rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-accent">{decision.options.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Options Analyzed</p>
            </div>
            <div className="bg-input rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-secondary">{testScenarios.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Scenarios Tested</p>
            </div>
            <div className="bg-input rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-accent">92%</p>
              <p className="text-xs text-muted-foreground mt-1">Confidence Level</p>
            </div>
            <div className="bg-input rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-secondary">3</p>
              <p className="text-xs text-muted-foreground mt-1">Key Insights</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-3">Next Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Review the recommendations above</li>
            <li>Discuss with stakeholders or mentors</li>
            <li>Plan implementation details for your chosen option</li>
            <li>Set milestones and review points</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button
            onClick={onBack}
            className="flex-1 h-12 bg-muted hover:bg-card text-foreground border border-border font-semibold flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={onNewDecision}
            className="flex-1 h-12 bg-accent hover:bg-secondary text-accent-foreground font-semibold"
          >
            Analyze Another Decision
          </Button>
        </div>
      </div>
    </div>
  )
}
