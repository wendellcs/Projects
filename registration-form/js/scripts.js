(function () {
    'use strict';

    const form = document.querySelector(".form")

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    })

    const buttonSubmitForm = document.querySelector('.btn-submit-form')
    buttonSubmitForm.addEventListener('click', checkErrors)

    const name = document.querySelector(".first-name")
    const email = document.querySelector(".email")
    const password = document.querySelector(".password")
    const passwordConfirmation = document.querySelector(".confirm-password")
    function checkErrors() {
        !name.value ? setErrorStatus(name, 'Field cannot be empty.') : setSuccessStatus(name)
        !checkEmail(email.value) ? setErrorStatus(email, 'Valid email required') : setSuccessStatus(email)
        checkPassword(password)

        if (password.value !== passwordConfirmation.value || !passwordConfirmation.value) {
            setErrorStatus(passwordConfirmation, "Password didn't match.")
        } else {
            setSuccessStatus(passwordConfirmation)
        }
    }

    function setErrorStatus(element, msg) {
        if (!element.classList.contains('error')) {
            removeElementClass(element, 'success')
            addElementClass(element, 'error')
            setErrorMessage(element, msg)
        } else {
            setErrorMessage(element, msg)
        }
    }

    function setSuccessStatus(element) {
        if (!element.classList.contains('success')) {
            removeElementClass(element, 'error')
            addElementClass(element, 'success')
            setErrorMessage(element, ' ')
        }
    }


    function addElementClass(element, _class) {
        element.classList.add(_class)
    }
    function removeElementClass(element, _class) {
        element.classList.remove(_class)
    }

    function setErrorMessage(element, msg) {
        const parent = element.nextElementSibling
        parent.textContent = msg
    }

    function checkPassword(password) {
        const minLength = 8
        const charactersRegex = /[A-Z]/i;
        const numberRegex = /\d/;

        let passwordStr = password.value.toString()
        if (passwordStr.length < minLength) {
            return setErrorStatus(password, 'Password must have at least 8 characters.')
        }
        if (!charactersRegex.test(password.value)) {
            return setErrorStatus(password, "Must contain at least one character.")
        }
        if (!numberRegex.test(password.value)) {
            return setErrorStatus(password, "Must contain at least one number.")
        }

        return setSuccessStatus(password)
    }

    function checkEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }
})()