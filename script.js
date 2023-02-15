"use strict";
const getInput = document.getElementById("input");
const getSearchBtn = document.getElementById("search");
const showResultList = document.getElementById("result-list");
const loadingSymbol = document.getElementById("loading");

const loaderIndicator = () => {
  loadingSymbol.classList.toggle("visually-hidden");
};

const baseUrL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com";
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
  const companyPage = "./company.html?symbol=";

  for (const company of data) {
    const aCompany = document.createElement("div");
    aCompany.innerHTML = `<a href=${companyPage}${company.symbol} target="_blank"><div>${company.name} (${company.symbol})</div></a>`;
    showResultList.appendChild(aCompany);
  }
};

getSearchBtn.addEventListener("click", getStockPrices);
