from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .agent import agent

router = APIRouter()

# -------------------------------------------------
# REQUEST MODELS
# -------------------------------------------------

class StartDecisionRequest(BaseModel):
    decision_text: str


class FollowUpRequest(BaseModel):
    answer: str


# -------------------------------------------------
# SIMPLE IN-MEMORY SESSION (OK FOR ASSIGNMENT)
# -------------------------------------------------

SESSION = {
    "decision": None,
    "answers": []
}


# -------------------------------------------------
# HELPER: SAFELY EXTRACT MODEL TEXT
# -------------------------------------------------

def get_model_text(result) -> str:
    """
    Extract actual model output from AgentRunResult
    across older pydantic-ai versions.
    """
    # Some versions expose .output
    if hasattr(result, "output"):
        return result.output

    text = str(result)

    # Older versions wrap text like AgentRunResult(output='...')
    if "output='" in text:
        return text.split("output='", 1)[1].rsplit("'", 1)[0]

    return text


# -------------------------------------------------
# START DECISION
# -------------------------------------------------

@router.post("/decision/start")
async def start_decision(payload: StartDecisionRequest):
    SESSION["decision"] = payload.decision_text
    SESSION["answers"] = []

    prompt = f"""
A user has the following decision:

"{payload.decision_text}"

Ask exactly ONE follow-up question to better understand the decision.
Return ONLY the question as plain text.
Do NOT explain anything.
Do NOT return JSON.
"""

    result = await agent.run(prompt)

    return {
        "follow_up_question": get_model_text(result)
    }


# -------------------------------------------------
# FOLLOW-UP LOOP
# -------------------------------------------------

@router.post("/decision/followup")
async def followup(payload: FollowUpRequest):
    if not SESSION["decision"]:
        raise HTTPException(
            status_code=400,
            detail="No active decision session"
        )

    SESSION["answers"].append(payload.answer)

    prompt = f"""
Decision:
{SESSION['decision']}

User answers so far:
{SESSION['answers']}

If more information is required:
- Ask exactly ONE follow-up question (plain text only).

If you have enough information:
- Reply EXACTLY with this word:
ANALYSIS_READY
"""

    result = await agent.run(prompt)
    text = get_model_text(result)

    if "ANALYSIS_READY" in text:
        return {"analysis_ready": True}

    return {
        "follow_up_question": text
    }


# -------------------------------------------------
# FINAL ANALYSIS
# -------------------------------------------------

@router.post("/decision/analyze")
async def analyze():
    if not SESSION["decision"]:
        raise HTTPException(
            status_code=400,
            detail="No active decision session"
        )

    prompt = f"""
Decision:
{SESSION['decision']}

User answers:
{SESSION['answers']}

Now provide a clear analysis in plain text with:
- Key risks
- Possible alternatives
- A final recommendation
- Confidence level (low / medium / high)

Do NOT return JSON.
Be concise and structured.
"""

    result = await agent.run(prompt)

    # Clear session after analysis
    SESSION["decision"] = None
    SESSION["answers"] = []

    return {
        "analysis": get_model_text(result)
    }
