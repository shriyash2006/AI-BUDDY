from app.schemas import ProjectIngestionResponse


def run_product_manager(raw_input: str, budget: int, timeline_weeks: int) -> ProjectIngestionResponse:
    hours_required = max(40, len(raw_input.split()) // 4)
    max_realistic_hours = timeline_weeks * 12
    is_realistic = hours_required <= max_realistic_hours and budget >= hours_required * 500

    schema = {
        "stack": ["Next.js", "FastAPI", "PostgreSQL", "AI"],
        "deliverables": [
            "Clickable product flow",
            "Role-based dashboard",
            "AI-assisted matching endpoint"
        ],
        "hours_required": hours_required,
        "timeline_weeks": timeline_weeks,
        "budget": budget
    }

    if is_realistic:
        message = "Scope looks realistic. The project can move to matching."
    else:
        message = "Scope needs reduction. Reduce deliverables or increase budget/timeline before matching."

    return ProjectIngestionResponse(proposed_schema=schema, is_realistic=is_realistic, message=message)
