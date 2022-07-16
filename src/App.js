import React, { useState, useEffect } from "react";

import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/lightning.png", isMatched: false },
  { src: "/img/King.png", isMatched: false },
  { src: "/img/Queen.png", isMatched: false },
  { src: "/img/Joker.png", isMatched: false },
  { src: "/img/Diamond.png", isMatched: false },
  { src: "/img/Heart.png", isMatched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matched, setMatched] = useState(0);

  //shuffle
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setMatched(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              setMatched(matched + 1);
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Card Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      {matched === cardImages.length ? (
        <h1>YOU WIN!</h1>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              flipped={
                card === choiceOne || card === choiceTwo || card.isMatched
              }
              handleChoice={handleChoice}
              key={card.id}
              card={card}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
