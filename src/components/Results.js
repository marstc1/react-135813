import React from "react";
import { Row, Button } from "antd";
import { Doughnut } from "react-chartjs-2";

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

const getLabels = (results) => {
  return results.map((card) => `${card.name} - ${card.count} votes`);
};

const getData = (results) => {
  return results.map((card) => card.count);
};

function Results({ results, resetHandler }) {
  const sortedResults = results
    .sort((a, b) => {
      return b.count - a.count;
    })
    .filter((poll) => poll.count !== 0);
  const totalVotes = getTotalVotes(results);
  const averageVote = getAverageVote(results, totalVotes);
  const labels = getLabels(sortedResults);
  const data = getData(sortedResults);
  const chartData = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data,
        backgroundColor: [
          "#70D4D4",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "#006464",
          "#006464",
          "#006464",
          "#006464",
          "#006464",
          "#006464",
          "#006464",
        ],
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    legend: {
      display: true,
      position: "left",
      align: "start",
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
  };

  return (
    results && (
      <div>
        <h2>
          {totalVotes} votes with an average of {averageVote}
        </h2>

        <Doughnut data={chartData} options={chartOptions} />

        <Button type='primary' onClick={() => resetHandler()}>
          Reset
        </Button>
      </div>
    )
  );
}

export { Results };
