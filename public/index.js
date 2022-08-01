function getColor(stock) {
  if (stock === "GME") {
    return "rgba(61, 161, 61, 0.7)";
  }
  if (stock === "MSFT") {
    return "rgba(209, 4, 25, 0.7)";
  }
  if (stock === "DIS") {
    return "rgba(18, 4, 209, 0.7)";
  }
  if (stock === "BNTX") {
    return "rgba(166, 43, 158, 0.7)";
  }
}
async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );
  // 2.fetch data...Getting access to the stock data requires us to go through three steps:
  // 1.Sign up for an account with twelvedata.com.
  // 2.Read twelvedata's documentation on fetching stock data.
  // 3.Write the fetch request in the main function in index.js.
  // Twelvedata provides a free API for getting current stock data. Signing up for an account requires a valid email address but does not require any payment information. After you've signed up for an account, copy your API key from the homepage:

  const response = await fetch(
    "https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=7a9b3316aebd40fd9d505848fac645b8"
  );

  const result = await response.json();

  const { GME, MSFT, DIS, BNTX } = result;

  const stocks = [GME, MSFT, DIS, BNTX];

  stocks.forEach((stock) => stock.values.reverse());

  //Time Chart
  new Chart(timeChartCanvas.getContext("2d"), {
    // type: 'bar',
    type: "line",
    data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      labels: stocks[0].values.map((value) => value.datetime),
      // datesets: [{
      datasets: stocks.map((stock) => ({
        // label: '# of Votes',
        label: stock.meta.symbol,
        // data: [12, 19, 3, 5, 2, 3],
        data: stock.values.map((value) => parseFloat(value.high)),
        // backgroundColor:  'rgba (255, 99, 132, 0.2)',
        backgroundColor: getColor(stock.meta.symbol),
        // borderColor:  'rgba (255, 99, 132, 1)',
        borderColor: getColor(stock.meta.symbol),
        data: stock.values.map((value) => parseFloat(value.high)),
      })),
    },
  });

  // High Chart
  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          // label:'Average',
          label: "Highest",
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          data: stocks.map((stock) => findHighest(stock.values)),
        },
      ],
    },
  });

  // Average Chart
  new Chart(averagePriceChartCanvas.getContext("2d"), {
    type: "pie",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "Average",
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          data: stocks.map((stock) => calculateAverage(stock.values)),
        },
      ],
    },
  });
}

function findHighest(values) {
  let highest = 0;
  values.forEach((value) => {
    if (parseFloat(value.high) > highest) {
      highest = value.high;
    }
  });
  return highest;
}

function calculateAverage(values) {
  let total = 0;
  values.forEach((value) => {
    total += parseFloat(value.high);
  });
  return total / values.length;
}

main();
