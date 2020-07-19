export function removeOptionType() {
  //An issue developer has yet to remove
  const elements = document.getElementsByClassName("types");
  for (let element of elements) {
    element.children[1].children[0].style.display = "none";
    element.children[1].children[1].style.display = "none";
  }

  return;
}

export function processData(param, res) {
  if (param === "TIME_SERIES_DAILY") {
    const mapped = res.data.data.map((stock) => {
      return {
        ...stock,
        date: new Date(stock.date),
      };
    });

    return mapped.reverse();
  } else {
    const mapped = res.data.data.map((stock) => {
      return {
        ...stock,
        date: new Date(stock.date),
      };
    });

    return mapped.reverse();
  }
}
