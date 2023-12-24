(function () {
    'use strict';

    const radios = document.querySelectorAll(".opt-radio")
    const span = document.querySelector("#feedback-value")
    const btnSubmit = document.querySelector(".submit")
    const form = document.querySelector("#form")
    const firstSection = document.querySelector("#first-section")
    const secondSection = document.querySelector("#second-section")
    secondSection.style.display = "none"

    form.addEventListener("submit", function (e) {
        e.preventDefault()
    })

    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("click", function (e) {
            returnFeedbackValue(e.target.value)
        });
    };

    function returnFeedbackValue(value) {
        btnSubmit.addEventListener("click", function () {
            firstSection.style.display = "none"
            secondSection.style.display = ""
            span.innerHTML = value
        })
    }
}())