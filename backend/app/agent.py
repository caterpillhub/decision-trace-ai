import os
from pydantic_ai import Agent
from pydantic_ai.models.openrouter import OpenRouterModel

# Ensure API key is set
if not os.getenv("OPENROUTER_API_KEY"):
    raise RuntimeError("OPENROUTER_API_KEY is not set")

# You can change the model if needed, this one is fine now
model = OpenRouterModel("openai/gpt-3.5-turbo")

agent = Agent(
    model=model,
    system_prompt="""
You are a decision-support AI assistant.

Your job:
- Follow the user's instructions EXACTLY.
- Do not assume output formats unless explicitly asked.
- Do not force JSON unless the user requests JSON.
- Respond clearly and concisely.

Never add extra explanations unless asked.
"""
)
