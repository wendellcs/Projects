import { Dictionary } from "./meanings.js"


const cardList = []
async function sendSearch(word) {
    await Dictionary.getWordMeaning(word)
        .then(data => {
            cardList.push(data)

            renderCards()
        })
        .catch(err => console.log(err.message))
}


// Criar opção de salvar palavras

const sendBtn = document.querySelector('.btn.formButton')
const form = document.getElementById('form')
const containerCards = document.querySelector('.container-cards')
const qtd = document.querySelector('.qtd')

const word = document.querySelector('.form-box-word')

const fieldsPopup = document.querySelector('.container-invalid-data-popup')
const closePopupBtn = document.querySelector('.close-popup')
form.addEventListener('submit', (e) => { e.preventDefault() })


sendBtn.addEventListener('click', (e) => {
    if (word.value) {
        sendSearch(word.value)
        word.value = ''
    } else {
        fieldsPopup.classList.remove('hidden')
    }
})

closePopupBtn.addEventListener('click', (e) => {
    fieldsPopup.classList.add('hidden')
})

// Render all the cards on the screen and get saved cards
function renderCards(saved) {
    containerCards.innerHTML = ''

    if (saved) {
        cardList.push(...saved)
    }

    cardList.forEach((card, index) => {
        containerCards.append(createCard(card, index))
    })

    qtd.textContent = cardList.length
    updateAndSaveCards(cardList)
}

// Create and return the cards HTML
function createCard(card, index) {
    const { word, titles, definitions } = card

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    const buttonsContainer = document.createElement('div')
    buttonsContainer.classList.add('buttons-container')
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.setAttribute('data', index)
    deleteBtn.classList.add('btn', 'delete')


    const _word = document.createElement('h2')
    _word.textContent = word

    const topics = document.createElement('select')
    topics.className = 'topics'
    titles.forEach(title => {
        const option = document.createElement('option')
        option.textContent = title
        option.className = 'topics-option'
        option.value = title
        topics.appendChild(option)
    })

    buttonsContainer.appendChild(deleteBtn)

    cardDiv.appendChild(_word)
    cardDiv.appendChild(topics)
    cardDiv.appendChild(buttonsContainer)

    console.log(cardDiv)

    return cardDiv
}

document.addEventListener("click", (e) => {
    // Close fields popup if clicked outside
    if (!fieldsPopup.contains(e.target) && !e.target.classList.contains('formButton')) {
        fieldsPopup.classList.add('hidden')
    }
})

containerCards.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data")
    const parent = e.target.closest('.card')

    // Verify if the clocked was the delete button and delete the selected card
    if (e.target.classList.contains('delete')) {
        cardList.splice(index, 1)
        containerCards.removeChild(parent)
        renderCards()
    }
})


// Verify the height of the new card and if necessary, generate the popup further from the card's top
function verifyCardHeight(parent) {
    const elementHeigh = parent.offsetHeight
    if (elementHeigh > 180) {
        cardPopup.style.top = elementHeigh + 'px'
    } else {
        cardPopup.style.top = '180px'
    }
}

// Preventing default popup-form behavior 
// Saves all the notes in the user's browser
function updateAndSaveCards(list) {
    localStorage.clear()
    localStorage.setItem('cards', JSON.stringify(list))
}

function returnCardIndex(element) {
    const documentCards = document.getElementsByClassName('card')

    for (let i = 0; i < documentCards.length; i++) {
        if (documentCards[i] == element) {
            return i
        }
    }
    return -1
}

// Get every note which has been saved in the browser
renderCards(JSON.parse(localStorage.getItem('cards')))