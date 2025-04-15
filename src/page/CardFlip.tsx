import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cards } from "../data/cardData";
import { FaHome } from "react-icons/fa";

interface Card {
  name: string;
  image: string;
  id: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const CardFlip = () => {
  const location = useLocation();
  const selectedCardIndices = useMemo(
    () => location.state?.selectedCards || [],
    [location.state?.selectedCards]
  );
  const [gameCards, setGameCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [countdown, setCountdown] = useState(3);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // 게임 초기화
  useEffect(() => {
    const selectedCards = selectedCardIndices.flatMap((index: number) => [
      { ...cards[index][0], id: index * 2, isFlipped: true, isMatched: false },
      {
        ...cards[index][1],
        id: index * 2 + 1,
        isFlipped: true,
        isMatched: false,
      },
    ]);

    // 카드 섞기
    const shuffledCards = [...selectedCards].sort(() => Math.random() - 0.5);
    setGameCards(shuffledCards);
  }, [selectedCardIndices]);

  // 카운트다운
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsGameStarted(true);
      setGameCards((prev) =>
        prev.map((card) => ({ ...card, isFlipped: false }))
      );
    }
  }, [countdown]);

  const handleCardClick = (index: number) => {
    if (
      !isGameStarted ||
      gameCards[index].isMatched ||
      gameCards[index].isFlipped ||
      isChecking
    )
      return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    const newGameCards = [...gameCards];
    newGameCards[index].isFlipped = true;
    setGameCards(newGameCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = newGameCards[firstIndex];
      const secondCard = newGameCards[secondIndex];

      if (Math.floor(firstCard.id / 2) === Math.floor(secondCard.id / 2)) {
        // 짝이 맞는 경우
        newGameCards[firstIndex].isMatched = true;
        newGameCards[secondIndex].isMatched = true;
        newGameCards[firstIndex].isFlipped = true;
        newGameCards[secondIndex].isFlipped = true;
        setGameCards(newGameCards);
        setIsChecking(false);
      } else {
        // 짝이 맞지 않는 경우
        setTimeout(() => {
          if (!newGameCards[firstIndex].isMatched) {
            newGameCards[firstIndex].isFlipped = false;
          }
          if (!newGameCards[secondIndex].isMatched) {
            newGameCards[secondIndex].isFlipped = false;
          }
          setGameCards(newGameCards);
          setIsChecking(false);
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  return (
    <div className="card-flip-container">
      <Link to="/" className="float-button">
        <FaHome />
      </Link>
      <h1 className="card-flip-title">
        {countdown > 0
          ? `카드 위치를 외우세요! ${countdown}초`
          : "카드 뒤집기 게임"}
      </h1>
      <div className="card-grid">
        {gameCards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`card ${card.isFlipped ? "flipped" : ""} ${
              card.isMatched ? "matched" : ""
            }`}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={card.image}
                  alt={card.name}
                  className={`card-image `}
                />
              </div>
              <div className="card-back">{index + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFlip;
