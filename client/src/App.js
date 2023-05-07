import React, {useState, useEffect} from "react";
import Card from "./Components/Card"
import './App.css'

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const cardImg = [
    {"src": "/img/charizard.png", matched: false},
    {"src": "/img/eevee.png", matched: false},
    {"src": "/img/gengar.png", matched: false},
    {"src": "/img/jigglypuff.png", matched: false},
    {"src": "/img/pikachu.png", matched: false},
    {"src": "/img/snorlax.png", matched: false}
  ]

  function shuffleCards () {
    const shuffleCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  
  // console.log(cards)

  function resetTurn () {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])
 
  return (
    
    <div className="App">
      <h1>Pokemon Memory Game</h1>
      <button onClick={shuffleCards} className="button">New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map(card => (
          <Card 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      
    </div>
    
  )
}

export default App;