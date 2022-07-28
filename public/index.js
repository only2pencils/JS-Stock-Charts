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

  const result = await response.json;
}

main();
