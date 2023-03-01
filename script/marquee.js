class marqueeHandler {
  constructor(marqueeOutPut) {
    this.marqueeOutPut = marqueeOutPut;
  }

  presentMarquee = (data) => {
    const marqueeContainer = document.querySelector(`${this.marqueeOutPut}`);

    const itemArray = [];
    data.forEach((element) => {
      itemArray.push({
        name: `   |   ${element.companyName}`,
        value: `price: ${element.price}`,
      });
    });
    const marqueeContent = itemArray
      .map((item) => `${item.name}: ${item.value}`)
      .join(" ");
    marqueeContainer.textContent = marqueeContent;
  };
  getMarquee = async () => {
    const url = `${baseUrL}/api/v3/stock-screener?/AAPL?&limit=45`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      this.presentMarquee(data);
    } catch (error) {
      console.error(error);
    }
  };
}
const activeMarquee = new marqueeHandler(".marquee-container");
activeMarquee.getMarquee();

//using functions for marquee
/* const marqueeContainer = document.querySelector(".marquee-container");
const getMarquee = async () => {
  try {
    let response = await fetch(
      `${baseUrL}/api/v3/stock-screener?&limit=45`
    );
    let data = await response.json();
    presentMarquee(data);
  } catch (error) {
    console.error(error);
  }
};

const presentMarquee = (data) => {
  const itemArray = [];
  data.forEach((element) => {
    itemArray.push({
      name: `   |   ${element.companyName}`,
      value: `price: ${element.price}`,
    });
  });
  const marqueeContent = itemArray
    .map((item) => `${item.name}: ${item.value}`)
    .join(" ");
  marqueeContainer.textContent = marqueeContent;
};
getMarquee(); */
