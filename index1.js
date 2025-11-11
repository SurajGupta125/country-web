let countryFlag = document.querySelector(".c-img img")
let countryName = document.querySelector(".name")
let countryPopulation = document.querySelector(".Population")
let countryCapital = document.querySelector(".Capital")
let countryBorder = document.querySelector(".border")
let NativeName = document.querySelector(".NativeName")
let Currency = document.querySelector(".Currency")
let Language = document.querySelector(".Languages")
let Region = document.querySelector('.Region')
let subRegion = document.querySelector('.subRegion')
let TopLevelDomain = document.querySelector(".TopLevelDomain")
let btn = document.querySelector("#backBtn")
let dark = document.querySelector(".nav .right")
let Bodydark = document.querySelector("body")

// ✅ URL se country name lo
let countryDetails = new URLSearchParams(window.location.search).get('name')

// ✅ Agar name missing ho
if (!countryDetails) {
  alert("Country name missing in URL!");
  window.location.href = "index.html";
}

// ✅ Country detail load function
function loadCountry(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true&fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders`)
    .then((res) => res.json())
    .then((data) => {

      let country = data[0]

      // ✅ Image
      countryFlag.src = country.flags?.svg || ""

      // ✅ Name
      countryName.innerText = country.name?.common || "-"

      // ✅ Population
      countryPopulation.innerText = `Population: ${country.population?.toLocaleString() || "-"}`

      // ✅ Capital
      countryCapital.innerText = `Capital: ${country.capital ? country.capital[0] : "-"}`

      // ✅ Native Name
      if (country.name?.nativeName) {
        let nativeObj = Object.values(country.name.nativeName)[0]
        NativeName.innerText = `Native Name: ${nativeObj?.official || "-"}`;
      } else {
        NativeName.innerText = `Native Name: -`
      }

      // ✅ Currency
      if (country.currencies) {
        let firstCurrency = Object.values(country.currencies)[0]
        Currency.innerText = `Currency: ${firstCurrency?.name || "-"}`;
      } else {
        Currency.innerText = `Currency: -`
      }

      if (country.languages) {
        Language.innerText = `Languages: ${Object.values(country.languages).join(", ")}`;
      } else {
        Language.innerText = `Languages: -`;
      }


      Region.innerText = `Region: ${country.region || "-"}`
      subRegion.innerText = `Sub Region: ${country.subregion || "-"}`

     
      TopLevelDomain.innerText = `Top Level Domain: ${country.tld ? country.tld.join(", ") : "-"}`

     
      if (!country.borders || country.borders.length === 0) {
        countryBorder.innerHTML = "No Border Countries"
        return;
      }

      let borderCodes = country.borders.join(",")

      fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=name`)
        .then((res) => res.json())
        .then((borderData) => {

          countryBorder.innerHTML = `Border Country ${""}`

          borderData.forEach(c => {
            let btn = document.createElement("button")
            btn.classList.add("clickme")
            btn.innerText = c.name.common
            countryBorder.append(btn)
          })
        })
    });
}


loadCountry(countryDetails)


countryBorder.addEventListener("click", (e) => {
  if (!e.target.classList.contains("clickme")) return;

  let countryName = e.target.innerText;
  loadCountry(countryName);
});


btn.addEventListener('click', () => {
  window.history.back()
})


dark.addEventListener('click', () => {
  Bodydark.classList.toggle("dark")
})
