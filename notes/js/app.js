import { dictionary } from "./controller/Dictionary.controller"


const definition = await dictionary(word)

// HTML containers
const containers = {
    resultsContainer: document.querySelector('.container-results-box'),
    cardsContainer: document.querySelector('.container-cards'),
}


// Others html elements
const htmlElements = {

}

// Form elements
const formElements = {
    form: document.querySelector('.form'),
    formInput: document.querySelector('.form-box-word'),
    send: document.querySelector('.btn.send'),
}

formElements.form.addEventListener('submit', (e) => {
    e.preventDefault()
})