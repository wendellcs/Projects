'use strict';

const portuguese = ["Maçã", "Banana", "Laranja", "Morango", "Uva", "Pera", "Abacaxi", "Melancia", "Mamão", "Cereja", "Kiwi", "Pêssego", "Abacate", "Manga", "Limão", "Coco", "Goiaba", "Framboesa", "Pitanga", "Ameixa", "Maracujá", "Caju", "Figo", "Açaí", "Melão", "Pêssego", "Tangerina"];
const english = ["Apple", "Banana", "Orange", "Strawberry", "Grape", "Pear", "Pineapple", "Watermelon", "Papaya", "Cherry", "Kiwi", "Peach", "Avocado", "Mango", "Lemon", "Coconut", "Guava", "Raspberry", "Surinam Cherry", "Plum", "Passion Fruit", "Cashew", "Fig", "Açaí", "Melon", "Peach", "Tangerine"];
const fruits = []
fruits.push(portuguese, english)

// Destacar mais o nivel que a pessoa ta
// Criar palavras em inglês e portugues e deixar o usuario escolher

// Containers
const containerHowToPlay = document.querySelector('.container-start-howtoplay')
const gameContainer = document.querySelector('.container-game')
const creditsContainer = document.querySelector('.container-credits')
const menuContainer = document.querySelector('.container-start')
const gameOverContainer = document.querySelector('.container-gameOver')
// HTPs
const textHowToPlay = document.querySelector('.htp-text')
const btnHowToPlay = document.querySelector('.container-start-icon-btnHtp')
const iconHowToPlay = document.querySelector('.container-start-icon-btnHtp-circle')
// Buttons
const btnStartGame = document.querySelector('.btn.start-game')
const btnLeave = document.querySelector('.btn.leave')
const btnPlayAgain = document.querySelector('.btn.play-again')
// Other
const keyboard = document.querySelectorAll('.keyboard-letter')
const display = document.querySelector('.word-display')
const displayLevel = document.getElementById('level')

keyboard.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('clicked')) return
        updateCircle(e.target.textContent)
        animationController(e.target)
        playSound(4)
    })
})

btnHowToPlay.addEventListener('click', (e) => {
    if (containerHowToPlay.classList.contains('hidden')) {
        removeElementClass(containerHowToPlay, 'hidden')
        textHowToPlay.textContent = 'Go Back'
    } else {
        addElementClass(containerHowToPlay, 'hidden')
        textHowToPlay.textContent = "Don't know how to play?"
    }
    iconHowToPlay.classList.contains('hidden') ? removeElementClass(iconHowToPlay, 'hidden') : addElementClass(iconHowToPlay, 'hidden')
})

btnStartGame.addEventListener('click', () => {
    addElementClass(menuContainer, 'hidden')
    removeElementClass(gameContainer, 'hidden')
    reset()
})

btnLeave.addEventListener('click', () => {
    addElementClass(gameOverContainer, 'hidden')
    removeElementClass(menuContainer, 'hidden')
})

btnPlayAgain.addEventListener('click', () => restartGame())


// Main functions

function normalizeWords(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

let word;
function getRandomWord() {
    const randomNumber = Math.round(Math.random() * fruits.length)
    return word = normalizeWords(fruits[randomNumber - 1])
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

function reset() {
    getRandomWord()
    hideHangman()
    removeOldWordCircles()
    createWordCircles()
    resetKeyboard()
}

function verifyGameOver() {
    const circles = document.querySelectorAll('.circle')
    for (let i = 0; i < word.length; i++) {
        if (circles[i].textContent == '') return
    }

    nextLevel()
}

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

function nextLevel() {
    updateLevel()
    reset()
}

let level = 1
function updateLevel() {
    level > 10 ? gameOver(true) : displayLevel.textContent = `${level + 1} `
    return level++
}

function restartGame() {
    reset()
    addElementClass(gameOverContainer, 'hidden')
    removeElementClass(gameContainer, 'hidden')
    removeElementClass(eyes, 'dead')
    removeElementClass(mouth, 'dead')
    displayLevel.textContent = '1 '
    return level = 1
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

const eyes = document.querySelectorAll('.eye')
const mouth = document.querySelector('.mouth')

const hangman = document.querySelectorAll('.hangman-body > div')

let wrongAnswer = 0
function drawHangman() {
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
            addElementClass(eyes, 'dead')
            addElementClass(mouth, 'dead')
            setTimeout(() => { gameOver(false) }, 1000)

            break
    }
    wrongAnswer++
}

function hideHangman() {
    hangman.forEach(part => {
        if (!part.classList.contains('hidden')) {
            part.classList.add('hidden')
        }
    })
    return wrongAnswer = 0
}


// Sound Effects


// Containers
const containerOptions = document.querySelector('.container-options')
const containerVolume = document.querySelector('.container-volume')
// Buttons
const btnCloseOptions = document.querySelector('.close-options')
const btnPlaySounds = document.querySelector('.sound')
const btnMute = document.querySelector('.sound-muted')
const btnOptions = document.querySelector('.btn-options')
// Other
const audios = document.querySelectorAll('.audio')
const volumeController = document.querySelector('.volume-controller')

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

volumeController.addEventListener('onChange', () => {
    console.log(volumeController.value)
})

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


// Animations


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


// Style

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

function removeElementClass(element, _class) {
    if (element.length) {
        element.forEach(e => e.classList.remove(_class))
    } else {
        element.classList.remove(_class)
    }
}


// Translate


const btnPortuguese = document.querySelector('.portuguese')
const btnEnglish = document.querySelector('.english')

btnPortuguese.addEventListener('click', () => {
    translateElements('portuguese')
    addElementClass(btnPortuguese, 'selected')
    removeElementClass(btnEnglish, 'selected')
})

btnEnglish.addEventListener('click', () => {
    translateElements('english')
    addElementClass(btnEnglish, 'selected')
    removeElementClass(btnPortuguese, 'selected')
})

function translateElements() {

}