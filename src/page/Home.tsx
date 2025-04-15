import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cards } from "../data/cardData";

const Home = () => {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState<boolean[]>(
    Array(cards.length).fill(true)
  );

  const handleCheckboxChange = (index: number) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards[index] = !newSelectedCards[index];
    setSelectedCards(newSelectedCards);
  };

  const handleStart = () => {
    const selectedCardIndices = selectedCards
      .map((selected, index) => (selected ? index : -1))
      .filter((index) => index !== -1);

    navigate("/card-flip", { state: { selectedCards: selectedCardIndices } });
  };

  return (
    <div className="home-container">
      <img src="/MemomoLogo.png" alt="Memomo" className="home-logo" />
      <span className="home-description">
        * 카드를 선택하고 시작하기 버튼을 눌러 게임을 시작해주세요 *
      </span>
      <div className="home-grid">
        {selectedCards.map((selected, index) => (
          <div key={index} className="home-item">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                id={`card-${index}`}
                checked={selected}
                onChange={() => handleCheckboxChange(index)}
                className="home-checkbox"
              />
              <span className="checkmark"></span>
              <span className="label-text">
                {cards[index][0].name} / {cards[index][1].name}
              </span>
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleStart} className="home-button">
        시작하기
      </button>
    </div>
  );
};

export default Home;
