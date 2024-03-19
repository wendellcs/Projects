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

const popup = document.querySelector('.container-popup')
const closePopupBtn = document.querySelector('.close-popup')
form.addEventListener('submit', (e) => { e.preventDefault() })


sendBtn.addEventListener('click', (e) => {
    if (word.value) {
        sendSearch(word.value)
        word.value = ''
    } else {
        popup.classList.remove('hidden')
    }
})

closePopupBtn.addEventListener('click', (e) => {
    popup.classList.add('hidden')
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

document.addEventListener("click", (e) => {
    // Close fields popup if clicked outside
    if (!popup.contains(e.target) && !e.target.classList.contains('formButton')) {
        popup.classList.add('hidden')
    }
})

const containerResults = document.querySelector('.container-left-results')

containerCards.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data")
    const parent = e.target.closest('.card')

    // Verify if the clocked was the delete button and delete the selected card
    if (e.target.classList.contains('delete')) {
        cardList.splice(index, 1)
        containerCards.removeChild(parent)
        renderCards()
    }

    if (e.target.classList.contains('view')) {
        const topic = document.querySelector(`.topics[data="${index}"]`)
        const topicValue = topic.value

        const cardInfos = cardList[index]
        const definitions = createDefinitionList(cardInfos, topicValue)
        const cardDefinition = createCardDefinition(definitions, topicValue, cardInfos)

        containerResults.innerHTML = ''
        containerResults.append(cardDefinition)
    }
})

function createCardDefinition(definitions, topicValue, cardInfos) {
    const resultBox = document.createElement('div')
    resultBox.className = 'result-box'

    const { word } = cardInfos
    const resultWord = document.createElement('span')
    resultWord.className = 'result-box-header-word'
    resultWord.textContent = word


    if (definitions.length > 1) {
        for (let i = 0; i < definitions.length; i++) {
            for (let j = 0; j < definitions[i].length; j++) {
                let resultDefinition = document.createElement('p')
                resultDefinition.className = 'definition'
                resultDefinition.textContent = definitions[i][j].definition
                containerDefinition.appendChild(resultDefinition)
            }
        }
    } else {
        definitions[0].forEach(defin => {
            let resultDefinition = document.createElement('p')
            resultDefinition.className = 'definition'
            resultDefinition.textContent = defin.definition
            containerDefinition.appendChild(resultDefinition)
        })
    }

    resultBox.appendChild(containerDefinition)

    return resultBox
}

function createDefinitionList(cardInfos, topicValue) {
    const { definitions, titles } = cardInfos;
    const definitionsList = definitions.filter((_, i) => titles[i] === topicValue);

    return definitionsList;
}

// Saves all the notes in the user's browser
function updateAndSaveCards(list) {
    localStorage.clear()
    localStorage.setItem('cards', JSON.stringify(list))
}

// Get every note which has been saved in the browser
renderCards(JSON.parse(localStorage.getItem('cards')))