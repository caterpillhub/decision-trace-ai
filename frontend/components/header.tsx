import { Brain } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary">
              <Brain className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">DecisionTrace</h1>
              <p className="text-xs text-muted-foreground">AI-powered decision analysis</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Make better decisions</p>
          </div>
        </div>
      </div>
    </header>
  )
}
