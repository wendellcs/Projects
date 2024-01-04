'use strict';

const randomWords = ["abacaxi", "banana", "laranja", "morango", "uva", "kiwi", "melancia", "limao", "pera", "maca", "abacate", "manga", "pessego", "cereja", "framboesa", "blueberry", "abóbora", "cenoura", "batata", "brocolis", "espinafre", "alface", "tomate", "pepino", "abobrinha", "beterraba", "couve", "repolho", "cebola"];

// Destacar mais o nivel que a pessoa ta
// Criar palavras em inglês e portugues e deixar o usuario escolher

// Containers
const containerHowToPlay = document.querySelector('.container-start-howtoplay')
const gameContainer = document.querySelector('.container-game')
const creditsContainer = document.querySelector('.container-credits')
const menuContainer = document.querySelector('.container-start')
// HTPs
const textHowToPlay = document.querySelector('.htp-text')
const btnHowToPlay = document.querySelector('.container-start-icon-btnHtp')
const iconHowToPlay = document.querySelector('.container-start-icon-btnHtp-circle')
// Other
const btnStartGame = document.querySelector('.btn.start-game')
const keyboard = document.querySelectorAll('.keyboard-letter')
const display = document.querySelector('.word-display')

keyboard.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('clicked')) return
        updateCircle(e.target.textContent)
        animationController(e.target)
        playSound(4)
    })
})

btnHowToPlay.addEventListener('click', (e) => {
    toggleElementVisibility(containerHowToPlay)
    toggleElementVisibility(iconHowToPlay)
    verifyContainerStatus(containerHowToPlay)
})

btnStartGame.addEventListener('click', () => {
    toggleElementVisibility(menuContainer)
    toggleElementVisibility(gameContainer)

    getRandomWord()
    createWordCircles()
})

let word;
function getRandomWord() {
    const randomNumber = Math.round(Math.random() * randomWords.length)
    return word = randomWords[randomNumber - 1]
}

function createWordCircles() {
    for (let i = 0; i < word.length; i++) {
        const circle = document.createElement('div')
        circle.className = 'circle'
        display.appendChild(circle)
    }
}

function updateCircle(letter) {
    const circles = document.querySelectorAll('.circle')
    let exists = false
    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter.toLowerCase()) {
            circles[i].innerHTML = letter
            exists = true
        }
    }
    if (!exists) drawHangman()

    setTimeout(() => {
        verifyGameOver()
    }, 100)
}

// Hangman 

const head = document.querySelector('.container-head')
const rope = document.querySelector('.hangman-rope')

const body = document.querySelector('.body')

const rigthArm = document.querySelector('.right-arm')
const leftArm = document.querySelector('.left-arm')

const leftLeg = document.querySelector('.left-leg')
const leftFoot = document.querySelector('.left-foot')

const rigthLeg = document.querySelector('.right-leg')
const rightFoot = document.querySelector('.right-foot')


let wrongAnswer = 0
function drawHangman() {
    console.log(wrongAnswer)
    switch (wrongAnswer) {
        case 0:
            removeElementClass(head, 'hidden')
            removeElementClass(rope, 'hidden')
            break
        case 1:
            removeElementClass(body, 'hidden')
            break
        case 2:
            removeElementClass(rigthArm, 'hidden')
            break
        case 3:
            removeElementClass(leftArm, 'hidden')
            break
        case 4:
            removeElementClass(leftLeg, 'hidden')
            removeElementClass(leftFoot, 'hidden')
            break
        case 5:
            removeElementClass(rigthLeg, 'hidden')
            removeElementClass(rightFoot, 'hidden')
            break
        default:
            addElementClass(document.querySelectorAll('.eye'), 'dead')
            addElementClass(document.querySelectorAll('.mouth'), 'dead')
            setTimeout(() => { gameOver(false) }, 1000)

            break

    }
    wrongAnswer++
}

const hangman = document.querySelectorAll('.hangman-body > div')
function hideHangman() {
    hangman.forEach(part => {
        if (!part.classList.contains('hidden')) {
            part.classList.add('hidden')
        }
    })
}

function verifyGameOver() {
    const circles = document.querySelectorAll('.circle')
    for (let i = 0; i < word.length; i++) {
        if (circles[i].textContent == '') return
    }

    nextLevel()
}

function nextLevel() {
    hideHangman()
    updateLevel()
    getRandomWord()
    removeOldWordCircles()
    createWordCircles()
    resetKeyboard()
    return wrongAnswer = 0
}

const displayLevel = document.getElementById('level')
let level = 1
function updateLevel() {
    if (level > 10) {
        gameOver(true)
    } else {
        displayLevel.textContent = `${level + 1} `
    }
    level++
}

const gameOverContainer = document.querySelector('.container-gameOver')
function gameOver(state) {
    addElementClass(gameContainer, 'hidden')
    hideHangman()
    removeElementClass(gameOverContainer, 'hidden')
    if (state) {
        gameOverContainer.querySelector('.game-over-message').textContent = 'Victory!!'
        gameOverContainer.querySelector('.game-over-score').textContent = `10 / 10`
    } else {
        gameOverContainer.querySelector('.game-over-message').textContent = 'Not this time...'
        gameOverContainer.querySelector('#level').textContent = level
    }
}

function resetKeyboard() {
    keyboard.forEach(button => {
        button.classList.remove('clicked')
        button.classList.remove('hidden')
    })
}

function removeOldWordCircles() {
    const circles = document.querySelectorAll('.circle')
    for (let i = 0; i < circles.length; i++) {
        display.removeChild(circles[i])
    }

}


// Effects functions


const audios = document.querySelectorAll('.audio')
let soundsEnabled = true
function playSound(index) {
    if (soundsEnabled) {
        const audio = audios[index]
        if (!audio.paused) {
            audio.currentTime = 0
        } else {
            audio.play()
        }
    } else {
        return
    }
}

const volumeController = document.querySelector('.volume-controller')
volumeController.addEventListener('onChange', () => {
    console.log(volumeController.value)
})

const btnPlaySounds = document.querySelector('.sound')
const btnMute = document.querySelector('.sound-muted')
const containerOptions = document.querySelector('.container-options')
const btnCloseOptions = document.querySelector('.close-options')
const btnOptions = document.querySelector('.btn-options')
const containerVolume = document.querySelector('.container-volume')

btnCloseOptions.addEventListener('click', () => {
    addElementClass(containerOptions, 'hidden')
    removeElementClass(btnOptions, 'hidden')

})

btnOptions.addEventListener('click', () => {
    addElementClass(btnOptions, 'hidden')
    removeElementClass(containerOptions, 'hidden')
})


btnPlaySounds.addEventListener('click', () => {
    removeElementClass(btnMute, 'hidden')
    addElementClass(btnPlaySounds, 'hidden')
    if (btnPlaySounds.classList.contains('hidden')) {
        addElementClass(containerVolume, 'hidden')
    }
    return soundsEnabled = !soundsEnabled
})

btnMute.addEventListener('click', () => {
    removeElementClass(btnPlaySounds, 'hidden')
    addElementClass(btnMute, 'hidden')
    if (!btnPlaySounds.classList.contains('hidden')) {
        removeElementClass(containerVolume, 'hidden')
    }
    return soundsEnabled = !soundsEnabled
})

function animationController(element) {
    if (!element.classList.contains('clicked')) {
        element.classList.add('clicked')
    } else {
        element.classList.remove('clicked')
    }
    setTimeout(() => {
        element.classList.add('hidden')
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

function addElementClass(element, _class) {
    if (element.length) {
        element.forEach(e => e.classList.add(_class))
    } else {
        element.classList.add(_class)
    }
}

function removeElementClass(element, _class) { element.classList.remove(_class) }