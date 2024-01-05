'use strict';

const portuguese = ["Maçã", "Banana", "Laranja", "Morango", "Uva", "Pera", "Abacaxi", "Melancia", "Mamão", "Cereja", "Kiwi", "Pêssego", "Abacate", "Manga", "Limão", "Coco", "Goiaba", "Framboesa", "Pitanga", "Ameixa", "Maracujá", "Caju", "Figo", "Açaí", "Melão", "Pêssego", "Tangerina"];
const english = ["Apple", "Banana", "Orange", "Strawberry", "Grape", "Pear", "Pineapple", "Watermelon", "Papaya", "Cherry", "Kiwi", "Peach", "Avocado", "Mango", "Lemon", "Coconut", "Guava", "Raspberry", "Surinam Cherry", "Plum", "Passion Fruit", "Cashew", "Fig", "Açaí", "Melon", "Peach", "Tangerine"];
const fruits = []
fruits.push(portuguese, english)

// Destacar mais o nivel que a pessoa ta

// Containers
const containerHowToPlay = document.querySelector('.container-start-howtoplay')
const gameContainer = document.querySelector('.container-game')
const creditsContainer = document.querySelector('.container-credits')
const menuContainer = document.querySelector('.container-start')
const gameOverContainer = document.querySelector('.container-gameOver')
// HTPs
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
    containerHowToPlay.classList.contains('hidden') ? removeElementClass(containerHowToPlay, 'hidden') : addElementClass(containerHowToPlay, 'hidden')
    iconHowToPlay.classList.contains('hidden') ? removeElementClass(iconHowToPlay, 'hidden') : addElementClass(iconHowToPlay, 'hidden')
    if (getSelectedTranslation() == 'pt') {
        translateElements('pt')
    } else {
        translateElements('en')
    }

})

btnStartGame.addEventListener('click', () => {
    addElementClass(menuContainer, 'hidden')
    removeElementClass(gameContainer, 'hidden')
    reset()
})

btnLeave.addEventListener('click', () => {
    addElementClass(gameOverContainer, 'hidden')
    removeElementClass(menuContainer, 'hidden')
    reset()
})

btnPlayAgain.addEventListener('click', () => restartGame())


// Main functions

function normalizeWords(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

let word;
function getRandomWord() {
    const randomNumber = Math.round(Math.random() * fruits[0].length)
    if (getSelectedTranslation() == 'pt') {
        return word = normalizeWords(fruits[0][randomNumber - 1])
    } else {
        return word = normalizeWords(fruits[1][randomNumber - 1])
    }
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
    removeElementClass(eyes, 'dead')
    removeElementClass(mouth, 'dead')
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
        if (getSelectedTranslation() == 'en') {
            gameOverContainer.querySelector('.game-over-message').textContent = 'Victory!!'
        } else {
            gameOverContainer.querySelector('.game-over-message').textContent = 'Vitória!!'
        }
        gameOverContainer.querySelector('.game-over-score').textContent = `10 / 10`
    } else {
        if (getSelectedTranslation() == 'en') {
            gameOverContainer.querySelector('.game-over-message').textContent = 'Not this time...'
        } else {
            gameOverContainer.querySelector('.game-over-message').textContent = 'Mais sorte na próxima...'
        }
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


function getSelectedTranslation() {
    const selected = document.querySelector('.selected')
    if (selected.classList.contains('portuguese')) {
        return 'pt'
    } else {
        return 'en'
    }
}

const btnPortuguese = document.querySelector('.portuguese')
const btnEnglish = document.querySelector('.english')
const textHowToPlay = document.querySelector('.htp-text')

btnPortuguese.addEventListener('click', () => {
    translateElements('pt')
    addElementClass(btnPortuguese, 'selected')
    removeElementClass(btnEnglish, 'selected')
})

btnEnglish.addEventListener('click', () => {
    translateElements('en')
    addElementClass(btnEnglish, 'selected')
    removeElementClass(btnPortuguese, 'selected')
})


function translateElements(_language) {
    if (_language == 'pt') {
        if (containerHowToPlay.classList.contains('hidden')) {
            textHowToPlay.textContent = 'Não sabe como jogar?'
        } else {
            textHowToPlay.textContent = 'Voltar'
        }
        btnPlayAgain.textContent = 'Jogar de novo'
        btnLeave.textContent = 'Sair'
        btnStartGame.textContent = 'Começar'
        translateHowToPlay('pt')
    } else {
        if (containerHowToPlay.classList.contains('hidden')) {
            textHowToPlay.textContent = "Don't know how to play?"
        } else {
            textHowToPlay.textContent = "Go back"
        }
        btnPlayAgain.textContent = 'Play Again'
        btnLeave.textContent = 'Leave'
        btnStartGame.textContent = 'Start'
        translateHowToPlay('en')
    }
}

function translateHowToPlay(_language) {
    if (_language == 'pt') {
        containerHowToPlay.innerHTML = ''
        containerHowToPlay.innerHTML = `
            <h2>Como jogar</h2>
            <ul>
                <li>
                    <p>(1) - Você pode chutar uma letra de cada vez. </p>
                </li>
                <li>
                    <p>
                        (2) - Se a letra escolhida estiver na palavra, a letra irá aparecer no espaço correspondente.
                    </p>
                </li>
                <li>
                    <p>
                        (3) - Se a letra escolhida não estiver na palavra, uma parte do boneco será desenhada.
                    </p>
                </li>
                <li>
                    <p>
                        (4) - Você pode continuar tentando até que acerte a palavra ou até que o boneco esteja completamente desenhado.
                    </p>
                </li>
            </ul>
    `
    } else {
        containerHowToPlay.innerHTML = ''
        containerHowToPlay.innerHTML = `
            <h2>How to play</h2>
            <ul>
                <li>
                    <p>(1) - You can guess one letter at a time. </p>
                </li>
                <li>
                    <p>
                        (2) - If a guessed letter is in the word, the letter will fill the corresponding
                        blanks spaces.
                    </p>
                </li>
                <li>
                    <p>
                        (3) - If a guessed letter is not in the word, a part of the hangman will be drawn.
                    </p>
                </li>
                <li>
                    <p>
                        (4) - You can continue guessing until you either correctly guess the word or the
                        hangman isfully drawn.
                    </p>
                </li>
            </ul>
        `
    }
}