const countriesContainer = document.querySelector(".countries-container");
const countryDropDown = document.querySelector(".countryDropDown");
const countryInput = document.querySelector(".countryInput");
const body = document.querySelector("body");
const themeButton = document.querySelector(".themeButton");
const currentTheme = document.querySelector(".currentTheme");


let darkMode = localStorage.getItem('darkMode') === 'true';

// Set the initial theme and icon
if (darkMode) {
  body.classList.add("dark");
  currentTheme.innerHTML = '<i class="fas fa-sun spin"></i> Light Mode ';
} else {
  currentTheme.innerHTML = ' <i class="fas fa-moon"></i> Dark Mode ';
}

themeButton.addEventListener("click", () => {
  darkMode = !darkMode;

  if (darkMode) {
    body.classList.add("dark");
    currentTheme.innerHTML = '<i class="fas fa-sun spin"></i> Light Mode ';
    localStorage.setItem('darkMode', true);
  } else {
    body.classList.remove("dark");
    currentTheme.innerHTML = ' <i class="fas fa-moon"></i> Dark Mode ';
    localStorage.setItem('darkMode', false);
  }
});


let allCountries = "";

countryDropDown.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(render);
});

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;

    render(data);
  });

function render(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="">

      <div class="card-text">

          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString(
            "en-In"
          )}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital}</p>
      </div>
  `;
    countriesContainer.appendChild(countryCard);
  });
}

countryInput.addEventListener("input", (e) => {
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  render(filteredCountries);
});
