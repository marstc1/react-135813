import React from "react";

function Results({ results }) {
  return (
    <div>
      <h2>Results</h2>
      {results && (
        <ul>
          {results.map((card) => (
            <li key={card.name}>
              {card.name} - {card.count}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Results };
