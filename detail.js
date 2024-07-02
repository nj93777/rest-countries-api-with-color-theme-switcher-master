const countryDetailContainer = document.getElementById('country-detail');
const urlParams = new URLSearchParams(window.location.search);
const alpha3Code = urlParams.get('code');
const themeToggle = document.getElementById('theme-toggle');

// Check for saved dark mode preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

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

// Fetch countries data from API
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const country = data.find(c => c.alpha3Code === alpha3Code);
        if (country) {
            displayCountryDetail(country, data);
        }
    });

function displayCountryDetail(country, allCountries) {
    const borders = country.borders ? country.borders.map(borderCode => {
        const borderCountry = allCountries.find(c => c.alpha3Code === borderCode);
        return `<button class="border-button" onclick="location.href='detail.html?code=${borderCode}'">${borderCountry.name}</button>`;
    }).join(' ') : 'None';

    const currencies = country.currencies ? country.currencies.map(currency => currency.name).join(', ') : 'None';
    const topLevelDomain = country.topLevelDomain ? country.topLevelDomain.join(', ') : 'None';

    countryDetailContainer.innerHTML = `
    <div class="country-detail">
        <img src="${country.flags.png}" alt="${country.name} flag">
        <div>
            <h2>${country.name}</h2>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Native Name:</strong> ${country.nativeName}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</p>
            <p><strong>Top Level Domain:</strong> ${topLevelDomain}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Border Countries:</strong> ${borders}</p>
        </div>
    </div>
    `;
}
