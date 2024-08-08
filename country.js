const countryName = new URLSearchParams(window.location.search).get("name");
const flagImage = document.querySelector(".country-detials img");
const countryh1 = document.querySelector(".country-detials h1");
const detailText = document.querySelector(".detail-text");
const borderCountries=document.querySelector(".border-countries");
const body=document.querySelector('body');
const themeButton=document.querySelector('.themeButton');
const currentTheme=document.querySelector('.currentTheme');



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



themeButton.addEventListener('click',()=>{

  darkMode = !darkMode;

  if(darkMode){
    body.classList.add('dark');
    currentTheme.innerText='Light Mode';
    localStorage.setItem(darkMode, true)
   
  }else{
    body.classList.remove('dark')
    currentTheme.innerText='Dark Mode';
    localStorage.setItem(darkMode, false)
    
  }




  console.log(darkMode);
  console.log(localStorage.getItem(darkMode));
 
  

  
 

})

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
   
   

    flagImage.src = country.flags.svg;
    countryh1.innerText = country.name.common;
    detailText.innerHTML = `
      <p><b>Native Name: </b>${(Object.values(country.name.nativeName)[0].common)?
                                Object.values(country.name.nativeName)[0].common:country.name}</p>
      <p><b>Population: </b>${country.population.toLocaleString('en-In')}</p>
      <p><b>Region: </b>${country.region}</p>
      <p><b>Sub-Region: </b>${(country.subregion)?country.subregion:'No sub region'}</p>
      <p><b>Capital: </b>${country.capital}</p>
      <p><b>Currencies: </b>${(country.currencies)?
                              Object.values(country.currencies).map(currency=>currency.name).join(','):''}</p>

      <p><b>Top Level Domain: </b>${country.tld}</p>
      <p><b>Languages: </b>${(country.languages)?
                           Object.values(country.languages).join(','):''}</p>
      
      `;
      if (country.borders){
        country.borders.forEach((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res)=>res.json())
          .then(([borderCountryData])=>{
            console.log(borderCountryData.name.common)
            const countryTag=document.createElement('a');
            countryTag.innerText=borderCountryData.name.common;
            countryTag.href=`/country.html?name=${borderCountryData.name.common}`;
            borderCountries.appendChild(countryTag);
          });
        });
      }





  });
