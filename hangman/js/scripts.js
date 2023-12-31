'use strict';

const randomWords = ["abacaxi", "banana", "laranja", "morango", "uva", "kiwi", "melancia", "limao", "pera", "maça", "abacate", "manga", "pessego", "cereja", "framboesa", "blueberry", "abóbora", "cenoura", "batata", "brocolis", "espinafre", "alface", "tomate", "pepino", "abobrinha", "beterraba", "couve", "repolho", "cebola"];

// Game Menu

const containerHowToPlay = document.querySelector('.container-start-howtoplay')
const textHowToPlay = document.querySelector('.htp-text')
const btnHowToPlay = document.querySelector('.container-start-icon-btnHtp')
const iconHowToPlay = document.querySelector('.container-start-icon-btnHtp-circle')
btnHowToPlay.addEventListener('click', (e) => {
    toggleElementVisibility(containerHowToPlay)
    toggleElementVisibility(iconHowToPlay)
    verifyContainerStatus(containerHowToPlay)
})

function verifyContainerStatus(element) {
    if (!element.classList.contains('hidden')) {
        textHowToPlay.textContent = 'Go Back'
    } else {
        textHowToPlay.textContent = "Don't know how to play?"
    }
}


// Game

const gameContainer = document.querySelector('.container-game')
const creditsContainer = document.querySelector('.container-credits')
const menuContainer = document.querySelector('.container-start')
const btnStartGame = document.querySelector('.btn.start-game')
btnStartGame.addEventListener('click', startGame)


function startGame() {
    const randomNumber = generateRandomNumber()
    createWordCircles(randomWords[randomNumber - 1])

    toggleElementVisibility(menuContainer)
    toggleElementVisibility(gameContainer)
}


// General Functions

const display = document.querySelector('.word-display')

function createWordCircles(word) {
    for (let i = 0; i < word.length; i++) {
        const circle = document.createElement('div')
        circle.className = 'circle'
        display.appendChild(circle)
    }
}

function updateCircleWord() {

}

function toggleElementVisibility(element) {
    if (!element.classList.contains('hidden')) {
        element.classList.add('hidden')
    } else {
        element.classList.remove('hidden')
    }
}

function generateRandomNumber() {
    return Math.round(Math.random() * randomWords.length)
}


// const form = document.querySelector('.form')
// form.addEventListener('submit', (e) => {
//     e.preventDefault()
// })

// const userInput = document.querySelector('.form-input')
// const display = document.querySelector('.container-top-display')
// const divGame = document.querySelector('.container-game')
// divGame.classList.add('hidden')


// // Start Game
// let randomWord;
// const btnStartGame = document.querySelector('.btn.start')
// btnStartGame.addEventListener('click', () => {
// })
// randomWord = getRandomWord()
// renderFirstWord(randomWord)
// toggleElementVisibility(divGame)
// toggleElementVisibility(btnStartGame)

// Check User Answer
// const btnSend = document.querySelector('.btn.send')
// btnSend.addEventListener('click', () => {
//     const userInputValue = userInput.value
//     const displayValue = display.textContent

//     let newString = ''
//     for (let i = 0; i < randomWord.length; i++) {
//         if (displayValue[i] !== '-') {
//             newString += displayValue[i];
//         } else if (randomWord[i] === userInputValue) {
//             newString += userInputValue;
//         } else {
//             newString += '-';
//         }
//     }
//     display.textContent = newString

//     verifyEndGame(newString)
// })



// Generate a random word and return it
// function getRandomWord() {
//     const random = Math.round(Math.random() * randomWords.length)
//     const randomWord = randomWords[random]

//     return randomWord
// }

// Render the hidden word in the page
// function renderFirstWord(randomWord) {
//     console.log(randomWord)
//     const displayedWord = randomWord.replace(randomWord, function () {
//         let retorno = ''
//         for (let i = 0; i < randomWord.length; i++) {
//             retorno += '-'
//         }
//         return retorno
//     })
//     display.textContent = displayedWord
// }