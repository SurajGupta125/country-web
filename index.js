let darkToggle = document.querySelector(".right");
let searchInput = document.querySelector("#searchByRegion");
let regionSelect = document.querySelector("#regionSelect");

darkToggle.addEventListener("click", () => {
  searchInput.classList.toggle("inputDark");
  regionSelect.classList.toggle("inputDark");
});

let mainBox = document.querySelector(".container");

// ✅ Fetch All Countries
fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,tld')
  .then((res) => res.json())
  .then((data) => {
    data.map((curData) => {

      let createA = document.createElement("a");
      createA.classList.add("contry");

      // ✅ FIX: correct link
      createA.href = `index1.html?name=${curData.name.common}`;

      let capital = curData.capital ? curData.capital[0] : "N/A";

      createA.innerHTML = `
        <div class="contry-card">
          <img src="${curData.flags.svg}" alt="${curData.flags.alt || "Country Flag"}">
        </div>
        <div class="contry-info">
          <p><b>${curData.name.common}</b></p>
          <p class="pop">Capital: ${capital}</p>
          <p class="pop">Population: ${curData.population.toLocaleString()}</p>
          <p class="pop">Region: ${curData.region}</p>
        </div>
      `;
      mainBox.append(createA);
    });
  });


// ✅ Dark mode
let dark = document.querySelector(".nav-bar .right");
let Bodydark = document.querySelector("body");

dark.addEventListener('click', () => {
  Bodydark.classList.toggle("dark");
});

// ✅ Filter Region
let filter = document.querySelector("#regionSelect");

filter.addEventListener("change", (e) => {
  mainBox.innerHTML = "";
  let filterData = e.target.value;

  fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,tld')
    .then((res) => res.json())
    .then((data) => {

      data.map((curData1) => {
        if (curData1.region === filterData) {

          let createA = document.createElement("a");
          createA.classList.add("contry");

          // ✅ FIX
          createA.href = `index1.html?name=${curData1.name.common}`;

          let capital = curData1.capital ? curData1.capital[0] : "N/A";

          createA.innerHTML = `
            <div class="contry-card">
              <img src="${curData1.flags.svg}" alt="flag">
            </div>
            <div class="contry-info">
              <p><b>${curData1.name.common}</b></p>
              <p class="pop">Capital: ${capital}</p>
              <p class="pop">Population: ${curData1.population.toLocaleString()}</p>
              <p class="pop">Region: ${curData1.region}</p>
            </div>
          `;
          mainBox.append(createA);
        }
      });
    });
});

// ✅ Search Country
let searchCountry = document.querySelector("#searchByRegion");

searchCountry.addEventListener("input", (e) => {
  mainBox.innerHTML = "";
  let region = e.target.value.toLowerCase();

  fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,tld')
    .then((res) => res.json())
    .then((data) => {

      data.map((curData1) => {
        let countryName = curData1.name.common.toLowerCase();

        if (countryName.includes(region)) {
          let createA = document.createElement("a");
          createA.classList.add("contry");

          // ✅ FIX
          createA.href = `index1.html?name=${curData1.name.common}`;

          let capital = curData1.capital ? curData1.capital[0] : "N/A";

          createA.innerHTML = `
            <div class="contry-card">
              <img src="${curData1.flags.svg}" alt="flag">
            </div>
            <div class="contry-info">
              <p><b>${curData1.name.common}</b></p>
              <p class="pop">Capital: ${capital}</p>
              <p class="pop">Population: ${curData1.population.toLocaleString()}</p>
              <p class="pop">Region: ${curData1.region}</p>
            </div>
          `;
          mainBox.append(createA);
        }
      });
    });
});
