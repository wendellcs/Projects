(function(){
    'use strict';

    // BUTTONS 
    const display = document.querySelector(".display")
    const clear = document.querySelector(".btn-clear-display")
    const backSpace = document.querySelector(".btn-backspace")
    const enter = document.querySelector(".solve-problem")

    // AddEventListeners
    const btnList = document.querySelectorAll(".value-btn")
    for(let i = 0; i < btnList.length; i++) {
        btnList[i].addEventListener('click', function(e){
            insert(e.target.value)
        })
    }

    // Insert numbers
    function insert(n){
        const numbers = document.querySelector(".display").value;
        document.querySelector(".display").value = numbers + n
    }

    // Clear display
    clear.addEventListener('click', clearDisplay)
    function clearDisplay(){
        display.value = ""
    }

    // Backspace 
    backSpace.addEventListener('click', function() {
        let value = display.value
        value = value.slice(0, -1)
        display.value = value 
    })

    // Solve problem
    enter.addEventListener('click', function() {
        if(display.value){
            return display.value = eval(display.value)
        }
    })
})()