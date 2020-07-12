import React from "react";
import { Row, Button } from "antd";

const getTotalVotes = (results) => {
  const allVotes = results.map((card) => card.count);
  return allVotes.reduce((a, b) => a + b, 0);
};

const getAverageVote = (results, totalVotes) => {
  let sum = 0;

  results.forEach((poll) => {
    console.log(poll);
    console.log(poll.name);
    sum += parseInt(poll.name) * poll.count;
  });

  const average = sum / totalVotes;

  return Math.round(average);
};

function Results({ results, resetHandler }) {
  const totalVotes = getTotalVotes(results);
  const averageVote = getAverageVote(results, totalVotes);

  return (
    <div>
      <h2>Results</h2>
      <Row>
        <h3>
          {totalVotes} votes with an average of {averageVote}
        </h3>
      </Row>

      {results && (
        <Row>
          <ul>
            {results.map((card) => (
              <li key={card.name}>
                {card.name} - {card.count}
              </li>
            ))}
          </ul>
        </Row>
      )}

      <Row>
        <Button type='primary' onClick={() => resetHandler()}>
          Reset
        </Button>
      </Row>
    </div>
  );
}

export { Results };
