import { useState } from "react";
import { useLocation } from "react-router-dom";

const CardFlip = () => {
  const location = useLocation();
  const selectedCards = location.state?.selectedCards || [];

  console.log(selectedCards);

  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(selectedCards.length).fill(false)
  );

  const handleCardClick = (index: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">카드 뒤집기</h1>
      <div className="grid grid-cols-3 gap-4">
        {selectedCards.map((cardIndex: number, index: number) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`h-40 flex items-center justify-center cursor-pointer rounded-lg border-2 ${
              flippedCards[index] ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            {flippedCards[index] ? `카드 ${cardIndex + 1}` : "뒤집기"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFlip;
