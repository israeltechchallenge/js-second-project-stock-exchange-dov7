"use strict";

const getInput = document.getElementById("input");
const getSearchBtn = document.getElementById("search");
const showResultList = document.getElementById("result-list");
const loadingSymbol = document.getElementById("loading");
const errorsContainer = document.getElementById('errors')


const loaderIndicator = () => {
  loadingSymbol.classList.toggle("visually-hidden");
};

const getStockPrices = async () => {
  loaderIndicator();
  let response = await fetch(
    `${baseUrL}/api/v3/search?query=${getInput.value}&limit=10&exchange=NASDAQ`
  );
  let data = await response.json();
  makeResultList(data);
  loaderIndicator();
};

const makeResultList = (data) => {
  showResultList.innerHTML = "";
  const companyPage = "./company.html?symbol=";
  for (const company of data) {
    const companyInfoUrl = `${baseUrL}/api/v3/company/profile/${company.symbol}`;
    fetch(companyInfoUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        let percentage = data.profile.changesPercentage;
        let image = data.profile.image;
        const aCompany = document.createElement("div");
        aCompany.innerHTML = `<a href=${companyPage}${company.symbol} target="_blank"><div>${company.name} (${company.symbol}) (${percentage}) <img src="${image}"</div></a>`;
        showResultList.appendChild(aCompany);
      });
  }
};

getSearchBtn.addEventListener("click", getStockPrices);
