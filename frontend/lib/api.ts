const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function apiFetch(path: string, body?: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'API error')
  }

  return res.json()
}

// ----------------------------
// Start decision
// ----------------------------
export async function startDecision(decisionText: string) {
  return apiFetch('/decision/start', {
    decision_text: decisionText
  })
}

// ----------------------------
// Follow-up loop (FIXED)
// ----------------------------
export async function sendFollowUp(answer: string) {
  return apiFetch('/decision/followup', {
    answer // ✅ THIS IS THE FIX
  })
}

// ----------------------------
// Final analysis
// ----------------------------
export async function analyzeDecision() {
  return apiFetch('/decision/analyze')
}
