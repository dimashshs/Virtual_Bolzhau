"use client";
import { useState, useRef, useEffect } from "react";
import { BIGRAM_ENDPOINT, TRIGRAM_ENDPOINT } from "./src/config";

const MainPage = () => {
  const [textInput, setTextInput] = useState("");
  const [predictionsBigram, setPredictionsBigram] = useState<string[]>([]);
  const [predictionsTrigram, setPredictionsTrigram] = useState<string[]>([]);
  const controllerRef = useRef<AbortController | null>(null);

  // Функция для получения предсказаний
  const getPredictions = async (text: string) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const responses = await Promise.allSettled([
        fetch(BIGRAM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        }),
        fetch(TRIGRAM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        }),
      ]);

      responses.forEach((response, index) => {
        if (response.status === "fulfilled" && response.value.ok) {
          response.value.json().then((data) => {
            if (index === 0) setPredictionsBigram(data.predictions || []);
            if (index === 1) setPredictionsTrigram(data.predictions || []);
          });
        } else if (response.status === "rejected") {
          console.error(`Error in request ${index + 1}:`, response.reason);
        }
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error fetching predictions:", error);
      }
    }
  };

  // Обработчик ввода текста
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTextInput(value);

    if (value.endsWith(" ")) {
      getPredictions(value.trim());
    } else {
      setPredictionsBigram([]);
      setPredictionsTrigram([]);
    }
  };

  // Обработчик выбора предсказания
  const handlePredictionSelect = (prediction: string) => {
    setTextInput((prev) =>
      prev.endsWith(" ") ? prev + prediction : prev + " " + prediction
    );
    getPredictions(textInput + " " + prediction);
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="absolute inset-0 w-full min-h-screen h-auto hero-header "></div>
      <main className="relative z-10 flex flex-col w-full p-4">
        <div className="relative w-full max-w-2xl mx-auto mb-8 mt-16">
          <input
            type="text"
            placeholder="Мәтінді енгізіңіз..."
            className="border rounded-full px-4 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={textInput}
            onChange={handleInputChange}
          />
        </div>

        {/* Flexbox контейнер для моделей */}
        <div className="flex flex-wrap justify-center gap-4">
          <div
            className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md flex-1 min-w-[300px] max-w-md"
            style={{ height: "30rem" }}
          >
            <h3 className="text-lg mb-2">
              <b>Сөздің аяғы</b>
            </h3>
            <div className="text-gray-400 mb-2 text-xs">
              Сөздің дұрыс аяқталу нұсқалары
            </div>
            <div className="flex justify-center flex-1">
              <h3 className="text-m text-gray-300 text-center italic">
                Дамытулыда
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <h4 className="text-xs text-gray-500">Модель:</h4>
              <select className="w-22 p-1 border rounded-md text-xs">
                <option value="model1">Keras</option>
                <option value="model2">Модель 2</option>
                <option value="model3">Модель 3</option>
              </select>
            </div>
          </div>

          {/* Модель Bigram*/}
          <div
            className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md flex-1 min-w-[300px] max-w-md"
            style={{ height: "30rem" }}
          >
            <h3 className="text-lg mb-2">
              <b>Келесі сөз</b>
            </h3>
            <div className="text-gray-400 mb-2 text-xs">
              Мәтінге сәйкес келесі мүмкін сөз
            </div>

            <div className="flex justify-between gap-4">
              <ul
                className="flex-1 border-r pr-2 max-h-80 overflow-y-auto"
                id="scrollbar"
              >
                {predictionsBigram.map((prediction, index) => {
                  const words = textInput.trim().split(/\s+/);
                  const lastWord = words[words.length - 1] || "";

                  return (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => handlePredictionSelect(prediction)}
                    >
                      <span className="text-black font-medium">{lastWord}</span>{" "}
                      <span className="text-gray-500">{prediction}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <h4 className="text-xs text-gray-500">Модель:</h4>
              <select className="w-22 p-1 border rounded-md text-xs">
                <option value="model1">Bigram</option>
                <option value="model2">Bigram 2</option>
                <option value="model3">Bigram 3</option>
              </select>
            </div>
          </div>

          {/* Фраза */}
          <div
            className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md flex-1 min-w-[300px] max-w-md"
            style={{ height: "30rem" }}
          >
            <h3 className="text-lg mb-2">
              <b>Фраза</b>
            </h3>
            <div className="text-gray-400 mb-2 text-xs">
              Сөз тіркесін толықтыру
            </div>

            <div className="flex justify-between gap-4">
              {/* Trigram (только если введено >=2 слов) */}
              {textInput.trim().split(/\s+/).length > 1 && (
                <ul
                  className="flex-1 border-r pr-2 max-h-80 overflow-y-auto"
                  id="scrollbar"
                >
                  {predictionsTrigram.map((prediction, index) => (
                    <li
                      key={index}
                      className="text-black cursor-pointer hover:bg-gray-200"
                      onClick={() => handlePredictionSelect(prediction)}
                    >
                      {textInput.trim().split(/\s+/).slice(-2).join(" ")}{" "}
                      <span className="text-gray-500">{prediction}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 mt-auto">
              <h4 className="text-xs text-gray-500">Модель:</h4>
              <select className="w-22 p-1 border rounded-md text-xs">
                <option value="model1">Trigram</option>
                <option value="model2">Trigram 2</option>
                <option value="model3">Trigram 3</option>
              </select>
            </div>
          </div>

         
        </div>
        {/* Блок с выбором модели и кнопкой загрузки */}
        {/* <div className="flex flex-col items-center mt-8 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h4 className="text-sm text-gray-600 mb-2">Выберите модель для скачивания:</h4>
        <select className="w-full p-2 border rounded-md text-sm mb-4">
          <option value="keras">Keras</option>
          <option value="bigram">Bigram</option>
          <option value="trigram">Trigram</option>
          <option value="kazllm">KazLLM</option>
        </select>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Скачать модель
        </button>
      </div> */}
      </main>
    </div>
  );
};
export default MainPage;
