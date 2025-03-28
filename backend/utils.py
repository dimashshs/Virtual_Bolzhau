def predict_trigrams(model, word1, word2, top_n=10):
    triple_counts = model['triple_counts']
    predictions = {}

    for (w1, w2, w3), count in triple_counts.items():
        if w1 == word1 and w2 == word2:
            predictions[w3] = count

    sorted_predictions = sorted(predictions.items(), key=lambda x: x[1], reverse=True)
    return sorted_predictions[:top_n]
