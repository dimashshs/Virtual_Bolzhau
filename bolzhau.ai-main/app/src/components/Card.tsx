'use client';

type CardProps = {
  topic: string;
  predictions: string[];
};

const Card = ({ topic, predictions }: CardProps) => {
  return (
    <div className="bg-gray-100 shadow-neuromorphic rounded-lg overflow-hidden mb-4 w-full max-w-sm md:max-w-md lg:max-w-lg h-64">
      <div className="px-6 py-4">
        <h3 className="text-lg font-bold mb-2">{topic}</h3>
        <div className="flex flex-wrap gap-2">
          {predictions.map((prediction, idx) => (
            <div key={idx} className="bg-gray-200 rounded-full px-4 py-2">
              {prediction}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
