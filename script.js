const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const regionFilter = document.getElementById('region-filter');
const themeToggle = document.getElementById('theme-toggle');

let countriesData = [];

// Check for saved dark mode preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Fetch countries data from API
fetch('data.json')  // Päivitetty polku
    .then(response => response.json())
    .then(data => {
        countriesData = data;
        displayCountries(countriesData);
    });

// Display countries
function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name} flag">
            <h2>${country.name}</h2>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
        `;
        countryCard.addEventListener('click', () => {
            // Save dark mode preference before navigating
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.setItem('dark-mode', 'disabled');
            }
            // Navigate to country detail page
            window.location.href = `detail.html?code=${country.alpha3Code}`;
        });
        countriesContainer.appendChild(countryCard);
    });
}

// Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCountries = countriesData.filter(country => 
        country.name.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
});

// Region filter functionality
regionFilter.addEventListener('change', () => {
    const selectedRegion = regionFilter.value;
    const filteredCountries = selectedRegion 
        ? countriesData.filter(country => country.region === selectedRegion) 
        : countriesData;
    displayCountries(filteredCountries);
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save dark mode preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});
