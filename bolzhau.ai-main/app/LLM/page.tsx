"use client";

import { useState, useRef, useEffect } from "react";
import Layout from "../src/components/Layout";
import Card from "../src/components/Card";
import predictions from "../src/data/predictions";

const useDebounce = (value: any, delay: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Home = () => {
  const [textInput, setTextInput] = useState("");
  const [predictionsBigram, setPredictionsBigram] = useState<string[]>([]);
  const [kerasPrediction, setKerasPrediction] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const debouncedText = useDebounce(textInput, 300);

  const predictionsRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (predictionsBigram.length === 0) return;

    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % predictionsBigram.length;
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === -1
          ? predictionsBigram.length - 1
          : (prevIndex - 1 + predictionsBigram.length) %
            predictionsBigram.length
      );
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      handleWordClick(predictionsBigram[selectedIndex]);
    }

    updateCursorPosition();
  };
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // Функция для расчета позиции курсора
  const updateCursorPosition = () => {
    if (inputRef.current) {
      const input = inputRef.current;
      const { selectionStart } = input;

      if (selectionStart !== null) {
        const tempSpan = document.createElement("span");
        const inputStyle = window.getComputedStyle(input);
        const text = input.value.slice(0, selectionStart);

        Object.assign(tempSpan.style, {
          fontSize: inputStyle.fontSize,
          fontFamily: inputStyle.fontFamily,
          visibility: "hidden",
          whiteSpace: "pre",
          position: "absolute",
        });

        tempSpan.textContent = text;
        document.body.appendChild(tempSpan);

        const inputRect = input.getBoundingClientRect();
        const spanRect = tempSpan.getBoundingClientRect();

        const cursorX = spanRect.width;
        const cursorY = input.height;

        setCursorCoords({
          x: cursorX,
          y: cursorY,
        });

        document.body.removeChild(tempSpan);
      }
    }
  };

  // Получение предсказаний от обеих моделей
  const getPredictions = async (word: string, fullInput: string) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const [bigramResponse, kerasResponse] = await Promise.all([
        fetch("http://127.0.0.1:8000/predict/bigram/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: word }),
          signal: controller.signal,
        }),
        fetch("http://127.0.0.1:8000/predict/keras/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: fullInput }),
          signal: controller.signal,
        }),
      ]);

      if (bigramResponse.ok) {
        const bigramData = await bigramResponse.json();
        setPredictionsBigram(bigramData.predictions || []);
        setSelectedIndex(-1);
      }

      if (kerasResponse.ok) {
        const kerasData = await kerasResponse.json();
        setKerasPrediction(kerasData.completions[0] || "");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error fetching predictions:", error);
      }
    }
  };

  // Обработчик ввода текста
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setTextInput(text);
    updateCursorPosition();
  };

  // Обновление предсказания при изменении текста
  useEffect(() => {
    if (debouncedText.trim() !== "") {
      const words = debouncedText.split(" ");
      const lastWord = words[words.length - 1];
      getPredictions(lastWord.toLowerCase(), debouncedText);
    } else {
      setPredictionsBigram([]);
      setKerasPrediction("");
    }
  }, [debouncedText]);


  const handleWordClick = (word: string) => {
    setTextInput((prevText) => {
      const needsSpace = prevText.trim().length > 0 && !prevText.endsWith(" ");
      return needsSpace ? `${prevText} ${word}` : `${prevText}${word}`;
    });
    setPredictionsBigram([]);
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => updateCursorPosition(), 0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      
      <div className="relative w-full max-w-2xl mx-auto mb-8">
        {/* Поле ввода */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Іздеу..."
          className="border rounded-full px-4 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={textInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {/* Keras предсказание */}
        {kerasPrediction && (
          <div
            className="absolute px-4 py-2 text-gray-400 pointer-events-none"
            style={{
              left: `${cursorCoords.x}px`,
              top: `${cursorCoords.y + 1}px`,
            }}
          >
            {kerasPrediction}
          </div>
        )}
        {/* Список предсказаний */}
        {predictionsBigram.length > 0 && (
          <div
            className="absolute bg-white shadow-lg border border-gray-200 rounded-b-lg max-h-60 overflow-y-auto z-10"
            style={{
              top: "100%",
              left: 0,
              width: "100%",
            }}
          >
            {predictionsBigram.slice(0, 10).map((word, index) => (
              <button
                key={index}
                ref={selectedIndex === index ? selectedRef : null}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-100 ${
                  selectedIndex === index
                    ? "bg-blue-200 text-blue-900"
                    : "text-gray-800"
                }`}
                onClick={() => handleWordClick(word)}
              >
                {word}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* "В разработке" перед футером */}
      <div className="my-12">
        <div className="rounded-2xl text-center">
          <h3 className="text-xl font-bold text-gray-400">
            Дамытылып жатыр
          </h3>
          <p className="text-sm text-gray-300 mt-2">
            Бұл бөлім әзірлену үстінде. Жақын арада жаңа функцияларды күтіңіз!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
