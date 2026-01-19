from pydantic import BaseModel, Field
from typing import List, Optional


# ---------- API REQUEST MODELS ----------

class StartDecisionRequest(BaseModel):
    decision_text: str = Field(..., min_length=10)


class FollowUpRequest(BaseModel):
    answer: str = Field(..., min_length=3)


# ---------- CORE DECISION STATE ----------

class DecisionState(BaseModel):
    goal: Optional[str] = None
    constraints: List[str] = []
    assumptions: List[str] = []
    alternatives: List[str] = []
    risks: List[str] = []
    stress_tests: List[str] = []
    confidence_score: Optional[float] = None
    confidence_rationale: Optional[str] = None


# ---------- FINAL RESPONSE ----------

class FinalDecisionResponse(BaseModel):
    goal: str
    constraints: List[str]
    assumptions: List[str]
    alternatives: List[str]
    risks: List[str]
    stress_tests: List[str]
    confidence_score: float
    confidence_rationale: str
