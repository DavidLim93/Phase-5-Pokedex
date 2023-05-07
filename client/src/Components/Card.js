import React from "react";

function Card ({card, handleChoice, flipped, disabled}) {

  function handleClick () {
    if (!disabled) {
      handleChoice(card)
    }
    
  }

    return (
        <div className="card" > 
          <div className={flipped ? "flipped" : ""}>
            <img  
            className="front" src={card.src}alt="card front" />
            <img  
            className="back" 
            src="/img/pokeball.png" 
            alt="card back" 
            onClick={handleClick}
            />
          </div>
    </div>
    )
    

}

export default Card;