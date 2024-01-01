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



// Game

const gameContainer = document.querySelector('.container-game')
const creditsContainer = document.querySelector('.container-credits')
const menuContainer = document.querySelector('.container-start')
const btnStartGame = document.querySelector('.btn.start-game')
btnStartGame.addEventListener('click', startGame)

const keyboard = document.querySelectorAll('.keyboard-letter')
keyboard.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('clicked')) return
        mainFunction(e.target, e.target.textContent)
    })
})

function getRandomWord() {
    const randomNumber = generateRandomNumber()
    return randomWords[randomNumber - 1]
}
const word = getRandomWord()
console.log(word)

function startGame() {
    toggleElementVisibility(menuContainer)
    toggleElementVisibility(gameContainer)

    createWordCircles(word)
}


// General Functions

function generateRandomNumber() {
    return Math.round(Math.random() * randomWords.length)
}

function mainFunction(button, value) {
    updateCircle(value)
    animationController(button)
}

const display = document.querySelector('.word-display')

createWordCircles()
function createWordCircles() {
    for (let i = 0; i < word.length; i++) {
        const circle = document.createElement('div')
        circle.className = 'circle'
        display.appendChild(circle)
    }
}

const circles = document.querySelectorAll('.circle')
function updateCircle(letter) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter.toLowerCase()) {
            circles[i].innerHTML = letter
        }
    }
    setTimeout(() => {
        verifyGameOver()
    }, 100)
}

function verifyGameOver() {
    for (let i = 0; i < word.length; i++) {
        if (circles[i].textContent == '') return console.log('Há espaços vazios')
    }

    gameOver()
}

function gameOver() {
    alert('Game over')
}


// Effects functions


const animations = ['drop-animation', "drop-animation-left"]


function animationController(element) {
    if (!element.classList.contains('clicked')) {
        element.classList.add('clicked')
    } else {
        element.classList.remove('clicked')
    }
    setTimeout(() => {
        const parent = element.parentElement
        parent.removeChild(element)
    }, 200);
}

function verifyContainerStatus(element) {
    if (!element.classList.contains('hidden')) {
        textHowToPlay.textContent = 'Go Back'
    } else {
        textHowToPlay.textContent = "Don't know how to play?"
    }
}

function toggleElementVisibility(element) {
    if (!element.classList.contains('hidden')) {
        element.classList.add('hidden')
    } else {
        element.classList.remove('hidden')
    }
}