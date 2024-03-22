// HTML containers
const containers = {
    definitionsContainer: document.querySelector('.container-results-box'),
    cardsContainer: document.querySelector('.container-cards'),
}

// Form elements
const formElements = {
    form: document.querySelector('.form'),
    formInput: document.querySelector('.form-box-word'),
    send: document.querySelector('.btn.send'),
}

// Dictionary API instance
const dictionary = new DictionaryAPI()
// MVC instances
const cardService = new CardService()
const render = new Render(containers)
const cardController = new CardController(cardService, render)

formElements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const word = formElements.formInput.value

    try {
        const data = await dictionary.getWord(word)
        const card = new CardModel(data)

        cardController.addCard(card)
        formElements.formInput.value = ''

    } catch (err) {
        console.log(err)
    }
})


document.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('view')) {
        const id = target.closest('.card').getAttribute('data')
        const cardInfos = cardService.getDefinitions(id)

    }
})