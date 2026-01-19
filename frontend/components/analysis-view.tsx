'use client'

import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnalysisViewProps {
  decision: any
  analysisText: string
  onBack: () => void
  onNext: () => void
}

export default function AnalysisView({
  decision,
  analysisText,
  onBack,
  onNext
}: AnalysisViewProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Decision Analysis
        </h2>
        <p className="text-muted-foreground">
          AI-powered insights for "{decision.title}"
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {/* Decision Overview */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            Decision Overview
          </h3>

          <div className="space-y-3 text-foreground">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Decision</p>
              <p className="font-medium">{decision.title}</p>
            </div>

            {decision.description && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Context</p>
                <p className="text-sm leading-relaxed">
                  {decision.description}
                </p>
              </div>
            )}

            {decision.timeframe && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Timeframe
                </p>
                <p className="text-sm">{decision.timeframe}</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            AI Decision Analysis
          </h3>

          <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
            {analysisText}
          </div>
        </div>

        {/* Constraints */}
        {decision.constraints && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Constraints to Consider
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {decision.constraints}
            </p>
          </div>
        )}

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
            onClick={onNext}
            className="flex-1 h-12 bg-accent hover:bg-secondary text-accent-foreground font-semibold flex items-center justify-center gap-2"
          >
            Stress Tests
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
