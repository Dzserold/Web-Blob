const navMenu = document.getElementById("nav-menu")
const hamburger = document.getElementById("hamburger")
const nav = document.getElementById("nav")

hamburger.addEventListener("click", navBtnMove)
window.addEventListener('resize', navOnScreenChange);

function navOnScreenChange(event) {
  let screenWidth = event.target.innerWidth

  if (screenWidth > 775) {
    navMenu.classList.remove("active-hamby")
    nav.classList.remove("active-hamby-nav")
    hamburger.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 35 35" fill="none">
      <path d="M6.01562 26.7969H28.9844M6.01562 18.0469H28.9844M6.01562 9.29688H28.9844" stroke="#17F8C2"
        stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    `
    navMenu.style.display = "flex"
  }
}

function navBtnMove() {
  nav.classList.toggle("active-hamby-nav")
  spin()

  if (navMenu.classList.contains("active-hamby")) {
    navMenu.classList.toggle("active-hamby")

    setTimeout(() => {
      navMenu.style.display = "none"
    }, 500);
  } else {

    navMenu.style.display = "flex"
    setTimeout(() => {
      navMenu.classList.toggle("active-hamby")
    }, 1);
  }

}

function spin() {
  if (navMenu.classList.contains("active-hamby")) {
    hamburger.classList.add("spin")
    setTimeout(() => {
      hamburger.classList.remove("spin")
      hamburger.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 35 35" fill="none">
      <path d="M6.01562 26.7969H28.9844M6.01562 18.0469H28.9844M6.01562 9.29688H28.9844" stroke="#17F8C2"
        stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    `
    }, 500);
  }
  else {
    hamburger.classList.add("spin")
    setTimeout(() => {
      hamburger.classList.remove("spin")
      hamburger.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 30 30" fill="none">
<path d="M5.55 5.55C5.72391 5.37584 5.93045 5.23767 6.15781 5.1434C6.38516 5.04913 6.62887 5.00061 6.875 5.00061C7.12112 5.00061 7.36483 5.04913 7.59219 5.1434C7.81954 5.23767 8.02608 5.37584 8.2 5.55L15 12.3475L21.8 5.55C21.974 5.376 22.1806 5.23797 22.4079 5.1438C22.6353 5.04963 22.8789 5.00116 23.125 5.00116C23.3711 5.00116 23.6147 5.04963 23.8421 5.1438C24.0694 5.23797 24.276 5.376 24.45 5.55C24.624 5.724 24.762 5.93057 24.8562 6.15791C24.9504 6.38526 24.9988 6.62892 24.9988 6.875C24.9988 7.12107 24.9504 7.36474 24.8562 7.59208C24.762 7.81943 24.624 8.02599 24.45 8.2L17.6525 15L24.45 21.8C24.8014 22.1514 24.9988 22.628 24.9988 23.125C24.9988 23.622 24.8014 24.0986 24.45 24.45C24.0986 24.8014 23.622 24.9988 23.125 24.9988C22.628 24.9988 22.1514 24.8014 21.8 24.45L15 17.6525L8.2 24.45C7.84858 24.8014 7.37197 24.9988 6.875 24.9988C6.37803 24.9988 5.90141 24.8014 5.55 24.45C5.19858 24.0986 5.00116 23.622 5.00116 23.125C5.00116 22.628 5.19858 22.1514 5.55 21.8L12.3475 15L5.55 8.2C5.37584 8.02608 5.23767 7.81954 5.1434 7.59219C5.04913 7.36483 5.00061 7.12112 5.00061 6.875C5.00061 6.62887 5.04913 6.38516 5.1434 6.15781C5.23767 5.93045 5.37584 5.72391 5.55 5.55Z" fill="#17F8C2"/>
</svg>
    `
    }, 500);
  }
}

const navLang = document.querySelectorAll(".language")

navLang.forEach(l => {
  l.addEventListener("click", (e) => {
    let selectedLang = e.target.innerHTML.toLowerCase()
    setLanguage(selectedLang);
    loadTranslations()
    addActiveClass()
  })
});

// Function to set the language in local storage
function setLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
}

// Function to get the language from local storage or use a default
function getLanguage() {
  addActiveClass()
  return localStorage.getItem('preferredLanguage') || 'en';
}

// Function to load and display translations
function loadTranslations() {
  const lang = getLanguage();

  fetch(`languages/${lang}.json`)
    .then(response => response.json()).catch((err) => {
      console.log(err)
    })
    .then(data => {
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = data[key];
      });
    }).catch((err) => {
      console.log(err)
    })
}

function addActiveClass() {
  const prefLang = localStorage.getItem("preferredLanguage")

  navLang.forEach(x => {
    let y = x.innerText.toLowerCase()
    if (y == prefLang) {
      x.classList.add("active")
    } else {
      x.classList.remove("active")
    }
  });
}

// Set the initial language and load translations
setLanguage(getLanguage());
loadTranslations();