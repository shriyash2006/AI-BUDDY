import hashlib
import math

from app.core.config import get_settings


def mock_embedding(text: str) -> list[float]:
    """Deterministic local embedding placeholder until OpenAI/Gemini embeddings are configured."""
    dimensions = get_settings().embedding_dimensions
    digest = hashlib.sha256(text.encode("utf-8")).digest()
    values = [((digest[index % len(digest)] / 255) * 2) - 1 for index in range(dimensions)]
    norm = math.sqrt(sum(value * value for value in values)) or 1
    return [value / norm for value in values]
