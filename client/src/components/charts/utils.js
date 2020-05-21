import { timeParse } from "d3-time-format";
import _ from "lodash";

function parseData(d) {
  var data = {};
  data.date = d.date;
  data.open = +d["1. open"];
  data.high = +d["2. high"];
  data.low = +d["3. low"];
  data.close = +d["4. close"];

  return data;
}

export function processData(param, res) {
  if (param === "TIME_SERIES_DAILY") {
    const parseDate = timeParse("%Y-%m-%d");

    const mapped = _.map(res.data["Time Series (Daily)"], (val, date) => ({
      date: parseDate(date),
      ...val,
    }));

    return mapped.map((d) => parseData(d)).reverse();
  } else {
    const parseDate = timeParse("%Y-%m-%d %H:%M:%S");

    const mapped = _.map(res.data["Time Series (5min)"], (val, date) => ({
      date: parseDate(date),
      ...val,
    }));

    return mapped.map((d) => parseData(d)).reverse();
  }
}
