"use strict";

const urlParams = new URLSearchParams(window.location.search).get("symbol");
const companyInfo = document.getElementById("company-info");
const loadingSymbol = document.getElementById("loading");
const ctx = document.getElementById("myChart");

const loaderIndicator = () => {
  loadingSymbol.classList.toggle("visually-hidden");
};
const getCompanyInfo = async () => {
  const companyInfoUrl = `${baseUrL}/api/v3/company/profile/${urlParams}`;

  try {
    loaderIndicator();

    let response = await fetch(companyInfoUrl);
    const data = await response.json();
    presentCompanyInfo(data);
  } catch (error) {
    console.log(error);
  }
  loaderIndicator();

  getCompanyHistory();
};

const getCompanyHistory = async () => {
  const historyUrl = `${baseUrL}/api/v3/historical-price-full/${urlParams}?serietype=line`;
  try {
    loaderIndicator();

    const response = await fetch(historyUrl);
    const data = await response.json();
    showCompanyHistory(data.historical);
  } catch (error) {
    console.log(error);
  }
  loaderIndicator();
};
const presentCompanyInfo = (data) => {
  let number = data.profile.changesPercentage;
  let statusColor = "";
  if (number > 0) {
    statusColor = "text-success";
  } else {
    statusColor = "text-danger";
  }
  companyInfo.innerHTML = `<div>
                <img src=${data.profile.image} alt="${data.profile.companyName}">
                <h2>price: ${data.profile.price}</h2>
                <h2 class=${statusColor}>change: ${data.profile.changesPercentage}%</h2>
                <h1>${data.profile.companyName}</h1>
                <h2>${data.profile.description}</h2>
                <a href=${data.profile.website} target="_blank">visit us</a>`;
};

const showCompanyHistory = (data) => {
  const labelArray = [];
  const valueArray = [];

  for (let i = 0; i < data.length; i++) {
    labelArray.push(data[i].date);
    valueArray.push(data[i].close);
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labelArray,
      datasets: [
        {
          label: "stack worth",
          data: valueArray,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

getCompanyInfo();
