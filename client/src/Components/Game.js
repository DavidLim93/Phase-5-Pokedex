import React, {useState, useEffect} from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { updateScores } from "./ScoreSlice";


function Game({user_id}) {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  const cardImg = [
    {"src": "/img/charizard.png", matched: false},
    {"src": "/img/eevee.png", matched: false},
    {"src": "/img/gengar.png", matched: false},
    {"src": "/img/jigglypuff.png", matched: false},
    {"src": "/img/pikachu.png", matched: false},
    {"src": "/img/snorlax.png", matched: false}
  ]

  const dispatch = useDispatch();


  function shuffleCards () {
    const shuffleCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffleCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setGameWon(false)
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
        
        setTimeout(() => resetTurn(), 2000)
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

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched === true)) {
      setGameWon(true);
      dispatch(updateScores(turns));
      saveScore()
    }
  }, [cards, dispatch, turns]);

  function saveScore() {
    setScore(turns)
      fetch('/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, user_id}),
      })
        .then((response) => response.json())
        // .then((newScore) => {
        //   setScore([...score, newScore]);
        // })
  }
 
  return (
    
    <div className="App">
      
      {gameWon ? (
        <div className="congrats">
          <h2>Congratulations! You won the game!</h2>
          <button onClick={shuffleCards} className="button">
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <button onClick={shuffleCards} className="button">
            New Game
          </button>
          <p>Turns: {turns}</p>
          <div className="card-grid">
            {cards.map((card) => (
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
      )}
      </div>
      

    
  )
}

export default Game;