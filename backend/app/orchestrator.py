from .models import DecisionState


REQUIRED_FIELDS = [
    "goal",
    "constraints",
    "assumptions",
    "alternatives",
    "risks",
]


def get_missing_field(state: DecisionState) -> str | None:
    for field in REQUIRED_FIELDS:
        value = getattr(state, field)
        if not value:
            return field
    return None


def follow_up_question(field: str) -> str:
    questions = {
        "goal": "What exactly is the decision you are trying to make?",
        "constraints": "What constraints do you have? (money, time, responsibilities, etc.)",
        "assumptions": "What assumptions are you making that must hold true?",
        "alternatives": "What alternative options are you considering?",
        "risks": "What could go wrong if this decision fails?",
    }
    return questions[field]


def is_ready_for_analysis(state: DecisionState) -> bool:
    return get_missing_field(state) is None
