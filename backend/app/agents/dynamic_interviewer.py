from typing import Any, TypedDict

try:
    from langgraph.graph import END, StateGraph
except Exception:  # pragma: no cover - keeps local imports friendly before dependencies are installed.
    END = "__end__"
    StateGraph = None


STUDENT_SCHEMA = ["name", "skills", "availability_hours", "career_goal", "preferred_domains"]
BEGINNER_SCHEMA = ["name", "learning_goals", "available_hours", "target_learning_path"]


class InterviewState(TypedDict):
    target_schema: list[str]
    collected_data: dict[str, Any]
    chat_history: list[dict[str, str]]
    missing_keys: list[str]
    is_beginner: bool
    latest_input: str
    next_question: str


def initial_state(text: str, is_beginner: bool = False) -> InterviewState:
    return {
        "target_schema": BEGINNER_SCHEMA if is_beginner else STUDENT_SCHEMA,
        "collected_data": {},
        "chat_history": [{"role": "user", "content": text}],
        "missing_keys": [],
        "is_beginner": is_beginner,
        "latest_input": text,
        "next_question": ""
    }


def extract_factual_data(state: InterviewState) -> InterviewState:
    text = state["latest_input"]
    collected = dict(state["collected_data"])

    if "name" not in collected:
        collected["name"] = "Demo Student"
    if "skills" not in collected and not state["is_beginner"]:
        collected["skills"] = _extract_keywords(text, ["python", "react", "next.js", "ai", "design", "data"])
    if "career_goal" not in collected and not state["is_beginner"]:
        collected["career_goal"] = text[:180]
    if "preferred_domains" not in collected and not state["is_beginner"]:
        collected["preferred_domains"] = _extract_keywords(text, ["fintech", "healthcare", "edtech", "saas", "genai"])
    if "availability_hours" not in collected and not state["is_beginner"]:
        collected["availability_hours"] = 10
    if state["is_beginner"]:
        collected.setdefault("learning_goals", text[:180])
        collected.setdefault("available_hours", 8)
        collected.setdefault("target_learning_path", ["frontend", "ai tools", "product thinking"])

    return {**state, "collected_data": collected}


def analyze_missing_keys(state: InterviewState) -> InterviewState:
    missing = [key for key in state["target_schema"] if key not in state["collected_data"]]
    return {**state, "missing_keys": missing}


def generate_question(state: InterviewState) -> InterviewState:
    if not state["missing_keys"]:
        question = "Your profile is ready. I can now match you with relevant startup projects."
    else:
        key = state["missing_keys"][0].replace("_", " ")
        question = f"Tell me more about your {key}."
    return {**state, "next_question": question}


def run_dynamic_interviewer(text: str, is_beginner: bool = False) -> InterviewState:
    state = initial_state(text, is_beginner)

    if StateGraph is None:
        return generate_question(analyze_missing_keys(extract_factual_data(state)))

    graph = StateGraph(InterviewState)
    graph.add_node("extract_factual_data", extract_factual_data)
    graph.add_node("analyzer", analyze_missing_keys)
    graph.add_node("generate_question", generate_question)
    graph.set_entry_point("extract_factual_data")
    graph.add_edge("extract_factual_data", "analyzer")
    graph.add_edge("analyzer", "generate_question")
    graph.add_edge("generate_question", END)
    return graph.compile().invoke(state)


def _extract_keywords(text: str, candidates: list[str]) -> list[str]:
    lowered = text.lower()
    matches = [candidate for candidate in candidates if candidate in lowered]
    return matches or candidates[:2]
