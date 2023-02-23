const marqueeText = document.querySelector(".marquee-text");
const getMarquee = async () => {
  let response = await fetch(
    `${baseUrL}/api/v3/stock-screener?/AAPL?&limit=45`
  );
  let data = await response.json();
  presentMarquee(data);
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
  marqueeText.textContent = marqueeContent;
};
getMarquee();
