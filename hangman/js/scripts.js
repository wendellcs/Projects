/*
Exercício: Jogo da Forca
Crie um jogo da forca em que o computador escolhe uma palavra aleatória de uma lista predefinida de palavras e o jogador tenta adivinhar a palavra, uma letra por vez. O jogo deve funcionar da seguinte forma:

Preparação do Jogo:

Crie uma lista de palavras predefinidas.
Escolha aleatoriamente uma palavra da lista para ser a palavra secreta.
Interface do Usuário:

Mostre ao jogador a quantidade de espaços vazios correspondentes ao número de letras na palavra secreta. Por exemplo, se a palavra secreta for "javascript", você pode exibir "_ _ _ _ _ _ _ _ _" para indicar que há 10 letras na palavra.
Entrada do Usuário:

Permita que o jogador insira uma letra por vez.
Verificação da Letra:

Verifique se a letra inserida pelo jogador está na palavra secreta. Se estiver, substitua o espaço vazio correspondente à posição da letra na palavra. Se não estiver, informe ao jogador que a letra não está na palavra e mantenha um contador de tentativas incorretas.
Fim do Jogo:

Continue o jogo até que o jogador adivinhe a palavra inteira ou exceda um número máximo de tentativas incorretas (por exemplo, 6 tentativas, que representam as partes do corpo de um enforcado).
Mensagens ao Usuário:

Forneça mensagens ao jogador indicando se eles acertaram uma letra, se a palavra foi adivinhada ou se eles perderam o jogo.
Reinicialização do Jogo:

Após o jogo terminar (seja por vitória ou derrota), permita que o jogador decida se deseja jogar novamente.


Fazer contador de vidas
    A cada vida perdida, cair um dos corações. (Procurar um icone de coração que nem o do
        minecraft)

Caso o jogador já tenha inserido uma letra, armazenar e mostrar ela em uma div.
*/

'use strict';


// How to play 

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

function toggleElementVisibility(element) {
    if (!element.classList.contains('hidden')) {
        element.classList.add('hidden')
    } else {
        element.classList.remove('hidden')
    }

}



// const randomWords = ["abacaxi", "banana", "laranja", "morango", "uva", "kiwi", "melancia", "limao", "pera", "maça", "abacate", "manga", "pessego", "cereja", "framboesa", "blueberry", "abóbora", "cenoura", "batata", "brocolis", "espinafre", "alface", "tomate", "pepino", "abobrinha", "beterraba", "couve", "repolho", "cebola"];

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


// Change the visibility of the elements
// function toggleElementVisibility(element) {
//     element.classList.toggle('hidden')
// }