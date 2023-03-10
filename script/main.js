"use strict";

class StockSearch {
  constructor(showResultList) {
    this.baseUrL = baseUrL;
    this.getInput = document.getElementById("input");
    this.getSearchBtn = document.getElementById("search");
    this.showResultList = showResultList;
    this.loadingSymbol = document.getElementById("loading");
    this.errorsContainer = document.getElementById("errors");

    this.getSearchBtn.addEventListener("click", () => this.getStockPrices());
  }

  loaderIndicator() {
    this.loadingSymbol.classList.toggle("visually-hidden");
  }

  async getStockPrices() {
    this.loaderIndicator();
    try {
      let response = await fetch(
        `${this.baseUrL}/api/v3/search?query=${this.getInput.value}&limit=10&exchange=NASDAQ`
      );
      let data = await response.json();
      this.makeResultList(data);
    } catch (error) {
      this.errorsContainer.innerHTML = `Error: ${error.message}`;
    } finally {
      this.loaderIndicator();
    }
  }

  highlightMatches(text, query) {
    const regex = new RegExp(query, "gi");
    return text.replace(regex, match => `<mark id="mark">${match}</mark>`);
  }

  makeResultList(data) {
    this.showResultList.innerHTML = "";
    const companyPage = "./company.html?symbol=";
    for (const company of data) {
      const companyInfoUrl = `${this.baseUrL}/api/v3/company/profile/${company.symbol}`;
      fetch(companyInfoUrl)
        .then((resp) => resp.json())
        .then((data) => {
          let percentage = data.profile.changesPercentage;
          let image = data.profile.image;
          const aCompany = document.createElement("div");
          const name = this.highlightMatches(company.name, this.getInput.value);
          const symbol = this.highlightMatches(`(${company.symbol})`, this.getInput.value);
          aCompany.innerHTML = `<a href=${companyPage}${company.symbol} target="_blank"><div>${name} ${symbol} (${percentage}) <img src="${image}"</div></a>`;
          this.showResultList.appendChild(aCompany);
        });
    }
  }
}

const stockSearch = new StockSearch(document.getElementById("result-list"));


/* "use strict";
//using OOP methodology

class StockSearch {
  constructor(showResultList) {
    this.baseUrL = baseUrL;
    this.getInput = document.getElementById("input");
    this.getSearchBtn = document.getElementById("search");
    this.showResultList = showResultList;
    this.loadingSymbol = document.getElementById("loading");
    this.errorsContainer = document.getElementById("errors");

    this.getSearchBtn.addEventListener("click", () => this.getStockPrices());
  }

  loaderIndicator() {
    this.loadingSymbol.classList.toggle("visually-hidden");
  }

  async getStockPrices() {
    this.loaderIndicator();
    try {
      let response = await fetch(
        `${this.baseUrL}/api/v3/search?query=${this.getInput.value}&limit=10&exchange=NASDAQ`
      );
      let data = await response.json();
      this.makeResultList(data);
    } catch (error) {
      this.errorsContainer.innerHTML = `Error: ${error.message}`;
    } finally {
      this.loaderIndicator();
    }
  }

  makeResultList(data) {
    this.showResultList.innerHTML = "";
    const companyPage = "./company.html?symbol=";
    for (const company of data) {
      const companyInfoUrl = `${this.baseUrL}/api/v3/company/profile/${company.symbol}`;
      fetch(companyInfoUrl)
        .then((resp) => resp.json())
        .then((data) => {
          let percentage = data.profile.changesPercentage;
          let image = data.profile.image;
          const aCompany = document.createElement("div");
          aCompany.innerHTML = `<a href=${companyPage}${company.symbol} target="_blank"><div>${company.name} (${company.symbol}) (${percentage}) <img src="${image}"</div></a>`;
          this.showResultList.appendChild(aCompany);
        });
    }
  }
}
const stockSearch = new StockSearch(document.getElementById("result-list")); */

//using function methodology
/* const getInput = document.getElementById("input");
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
 */
