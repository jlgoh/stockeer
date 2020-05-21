import { timeParse } from "d3-time-format";
import _ from "lodash";
import alphavantage from "../../api/alphavantage";

function parseData(d) {
  var data = {};
  data.date = d.date;
  data.open = +d["1. open"];
  data.high = +d["2. high"];
  data.low = +d["3. low"];
  data.close = +d["4. close"];

  return data;
}

export async function getData(queryType, symbol) {
  const param =
    queryType === "daily" ? "TIME_SERIES_DAILY" : "TIME_SERIES_INTRADAY";

  if (param === "TIME_SERIES_DAILY") {
    const res = await alphavantage.get(
      `/query?outputsize=compact&apikey=JK56BI96ZRSP0VQN&symbol=${symbol}&function=${param}`
    );

    const parseDate = timeParse("%Y-%m-%d");

    const mapped = _.map(res.data["Time Series (Daily)"], (val, date) => ({
      date: parseDate(date),
      ...val,
    }));

    return mapped.map((d) => parseData(d)).reverse();
  } else {
    const res = await alphavantage.get(
      `/query?interval=5min&apikey=JK56BI96ZRSP0VQN&symbol=${symbol}&function=${param}`
    );

    const parseDate = timeParse("%Y-%m-%d %H:%M:%S");

    const mapped = _.map(res.data["Time Series (5min)"], (val, date) => ({
      date: parseDate(date),
      ...val,
    }));

    return mapped.map((d) => parseData(d)).reverse();
  }
}
