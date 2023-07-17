(function () {
    'use strict'

    function getElement(element) { return document.querySelector(element) }

    function addElementClass(element, _class) { element.classList.add(_class) }
    function removeElementClass(element, _class) { element.classList.remove(_class) }

    const errorMessage = getElement('.error-message')
    addElementClass(errorMessage, 'hidden')

    const form = getElement('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })

    const emailInput = getElement('.input-email')
    const buttonSubscribe = getElement('.subscribe-btn')
    buttonSubscribe.addEventListener('click', () => {
        validateEmail(emailInput.value)
    })

    const signUpStartMenu = getElement('.sign-up-start')
    const successMessageMenu = getElement('.success-message')
    const spanEmailAddress = getElement('#email-address')
    function validateEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (regex.test(email)) {
            addElementClass(signUpStartMenu, 'hidden')
            addElementClass(successMessageMenu, 'show')
            spanEmailAddress.textContent = emailInput.value
        } else {
            removeElementClass(errorMessage, 'hidden')
            addElementClass(emailInput, 'denied')
            emailInput.focus()
        }
    }

    const buttonDismissMessage = getElement('.dismiss-message-btn')
    buttonDismissMessage.addEventListener('click', () => {
        if (signUpStartMenu.classList.contains('hidden')) {
            removeElementClass(signUpStartMenu, 'hidden')
            addElementClass(signUpStartMenu, 'show')
        }
        if (successMessageMenu.classList.contains('show')) {
            removeElementClass(successMessageMenu, 'show')
            addElementClass(successMessageMenu, 'hidden')
        }
    })
})()