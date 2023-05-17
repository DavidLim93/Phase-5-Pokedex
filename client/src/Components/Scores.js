import React, { useState, useEffect } from 'react';

function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('/scores')
      .then((r) => r.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <div>
    <ul className='score-list'>
      {scores.length > 0 ? (
        scores.map((score, index) => (
          <li key={index}>
            <strong>Game {index + 1} :</strong> {score}
          </li>
        ))
      ) : (
        <li>No scores available</li>
      )}
    </ul>
    {/* {
        console.log(scores)
    } */}
  </div>
  );
}

export default Scores;
