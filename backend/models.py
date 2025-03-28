import os
import pickle
from functools import lru_cache

BIGRAM_MODEL = None
TRIGRAM_MODEL = None

def load_bigram_model(model_path="models/bi_gram_model.pkl"):
    global BIGRAM_MODEL
    if BIGRAM_MODEL is not None:
        return BIGRAM_MODEL  # Уже загружено
    if os.path.exists(model_path):
        print("Loading bigram model...")  # Проверка загрузки
        with open(model_path, 'rb') as f:
            BIGRAM_MODEL = pickle.load(f)
        conditional_prob = {
            (pair[0], pair[1]): count / BIGRAM_MODEL['word_counts'][pair[0]]
            for pair, count in BIGRAM_MODEL['pair_counts'].items()
        }
        BIGRAM_MODEL = conditional_prob  # Сохраняем модель в памяти
        return BIGRAM_MODEL
    raise FileNotFoundError(f"Bigram model not found at {model_path}")

def load_trigram_model(model_path="models/tri_gram_model_mini.pkl"):
    global TRIGRAM_MODEL
    if TRIGRAM_MODEL is not None:
        return TRIGRAM_MODEL  # Уже загружено
    if os.path.exists(model_path):
        print("Loading trigram model...")  # Проверка загрузки
        with open(model_path, 'rb') as f:
            TRIGRAM_MODEL = pickle.load(f)
        return TRIGRAM_MODEL
    raise FileNotFoundError(f"Trigram model not found at {model_path}")
