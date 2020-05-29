import axios from "axios";

export const wtd = axios.create({
  baseURL: "/api/proxy",
});

//Supplement WTD API which does not carry NASDAQ-listed securities
//These are the 20 most heavily weighted components in NASDAQ
export const nasdaq100 = [
  { title: "AAPL", description: "Apple Inc." },
  { title: "MSFT", description: "Microsoft Corp." },
  { title: "AMZN", description: "Amazon.com Inc." },
  { title: "FB", description: "Facebook Inc." },
  { title: "GOOGL", description: "Alphabet Inc Class A" },
  { title: "GOOG", description: "Alphabet Inc Class C" },
  { title: "INTC", description: "Intel Corp." },
  { title: "NVDA", description: "NVIDIA Corp." },
  { title: "CSCO", description: "Cisco Systems Inc." },
  { title: "NFLX", description: "Netflix Inc." },
  { title: "PEP", description: "PepsiCo Inc." },
  { title: "CMCSA", description: "Comcast Corp." },
  { title: "ADBE", description: "Adobe Inc." },
  { title: "PYPL", description: "PayPal Holdings Inc." },
  { title: "TSLA", description: "Tesla Inc." },
  { title: "COST", description: "Costco Wholesale Corp." },
  { title: "AMGN", description: "Amgen Inc." },
  { title: "TMUS", description: "T-Mobile US Inc." },
  { title: "AVGO", description: "Broadcom Inc." },
  { title: "CHTR", description: "Charter Communications Inc." },
];
