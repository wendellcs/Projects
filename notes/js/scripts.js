const sendBtn = document.querySelector('.btn.formButton')
const form = document.getElementById('form')
const containerCards = document.querySelector('.container-cards')
const qtd = document.querySelector('.qtd')

const word = document.querySelector('.form-box-word')
const meaning = document.querySelector('.form-box-meaning')

const cardPopup = document.querySelector('.container-popup')
form.addEventListener('submit', (e) => { e.preventDefault() })

const cardList = []

class Card {
    constructor(title, text) {
        this.title = title
        this.text = text
    }
}

sendBtn.addEventListener('click', (e) => {
    if (word.value && meaning.value) {
        const card = new Card(word.value, meaning.value)
        cardList.push(card)

        renderCards()
        word.value = ''
        meaning.value = ''
    } else {
        alert('Preencha todos os campos')
    }
})

function renderCards(saved) {
    containerCards.innerHTML = ''

    if (saved) {
        cardList.push(...saved)
    }

    cardList.forEach((box, index) => {
        containerCards.append(createCard(box, index))
    })

    qtd.textContent = cardList.length
    updateAndSaveCards(cardList)
}


function createCard(card, index) {
    const { title, text } = card

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')

    const _title = document.createElement('h2')
    _title.textContent = title

    const _text = document.createElement('p')
    _text.textContent = text

    const buttonsContainer = document.createElement('div')
    buttonsContainer.classList.add('buttons-container')

    const editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    editBtn.setAttribute('data', index)
    editBtn.classList.add('btn', 'edit')

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.setAttribute('data', index)
    deleteBtn.classList.add('btn', 'delete')

    buttonsContainer.appendChild(editBtn)
    buttonsContainer.appendChild(deleteBtn)

    cardDiv.appendChild(_title)
    cardDiv.appendChild(_text)
    cardDiv.appendChild(buttonsContainer)

    return cardDiv
}


document.addEventListener("click", (e) => {
    if (cardPopup.closest('.card')) {
        if (!cardPopup.contains(e.target) && !e.target.classList.contains('edit')) {
            cardPopup.parentElement.removeChild(cardPopup)
        }
    }
})

containerCards.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data")
    const parent = e.target.closest('.card')

    if (e.target.classList.contains('delete')) {
        cardList.splice(index, 1)
        containerCards.removeChild(parent)
        renderCards()
    }

    if (e.target.classList.contains('edit')) {
        if (cardPopup.parentElement == parent) {
            cardPopup.classList.add('hidden')
            parent.removeChild(cardPopup)
        } else {
            cardPopup.classList.remove('hidden')
            parent.append(cardPopup)
            cardPopup.querySelector('#popup-word').focus()
            verifyCardHeight(parent)
        }
    }
})


// Verify the height of the new card and if necessary, generate the popup further from the top
function verifyCardHeight(parent) {
    const elementHeigh = parent.offsetHeight
    if (elementHeigh > 180) {
        cardPopup.style.top = elementHeigh + 'px'
    } else {
        cardPopup.style.top = '180px'
    }
}


// Preventing default popup-form behavior 
document.querySelector('.popup-form').addEventListener('submit', (e) => e.preventDefault())

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

// Updates the information on the cards
const confirmBtn = document.querySelector('.btn.confirm')
confirmBtn.addEventListener('click', (e) => {
    const parent = confirmBtn.closest('.card')
    const newWord = document.querySelector('#popup-word')
    const newMeaning = document.querySelector('#popup-meaning')
    const index = returnCardIndex(parent)

    if (newWord.value) {
        cardList[index].title = newWord.value
        parent.querySelector('h2').textContent = cardList[index].title
    }

    if (newMeaning.value) {
        cardList[index].text = newMeaning.value
        parent.querySelector('p').textContent = cardList[index].text
    }

    newWord.value = ''
    newMeaning.value = ''
})

// Get every note which has been saved in the browser
renderCards(JSON.parse(localStorage.getItem('cards')))