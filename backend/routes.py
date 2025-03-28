from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import load_bigram_model, load_trigram_model
from utils import predict_trigrams

router = APIRouter()

class PredictionRequest(BaseModel):
    text: str

BIGRAM_MODEL = load_bigram_model()
TRIGRAM_MODEL = load_trigram_model()

@router.post("/bigram/")
async def predict_bigram(request: PredictionRequest):
    text = request.text.strip().lower()
    if not text:
        raise HTTPException(status_code=400, detail="Input text must contain at least one word.")

    words = text.split()
    last_word = words[-1]

    predictions = {
        pair[1]: prob
        for pair, prob in BIGRAM_MODEL.items()
        if pair[0] == last_word
    }

    sorted_predictions = sorted(predictions.items(), key=lambda x: x[1], reverse=True)[:10]
    predicted_words = [word for word, _ in sorted_predictions]

    return {"input": text, "predictions": predicted_words}


@router.post("/trigram/")
async def predict_trigram(request: PredictionRequest):
    text = request.text.strip().lower()
    if not text:
        raise HTTPException(status_code=400, detail="Input text must contain at least two words.")

    words = text.split()
    if len(words) < 2:
        raise HTTPException(status_code=400, detail="Input text must contain at least two words.")

    word1, word2 = words[-2], words[-1]

    predictions = {w3: count for (w1, w2, w3), count in TRIGRAM_MODEL['triple_counts'].items() if w1 == word1 and w2 == word2}
    sorted_predictions = sorted(predictions.items(), key=lambda x: x[1], reverse=True)[:10]
    predicted_words = [word for word, _ in sorted_predictions]

    return {"input": f"{word1} {word2}", "predictions": predicted_words}
