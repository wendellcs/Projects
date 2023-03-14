(function(){
    'use strict';

    const form = document.querySelector(".form")
    const name = document.querySelector(".first-name")
    const email= document.querySelector(".email")
    const password = document.querySelector(".password")
    const passwordConfirmation = document.querySelector(".confirm-password")

   form.addEventListener("submit" , (e) => {
        e.preventDefault();
        checkErrors()
   })
    
    function checkErrors(){
        const nameValue = name.value
        const emailValue = email.value
        const passwordValue = password.value
        const passwordConfirmationValue = passwordConfirmation.value

        if(nameValue === "") {
            setError(name , "Field cannot be empty.")
        } else {
            setSuccess(name)
        }
        if(emailValue === ""){
            setError(email , "Field cannot be empty.")
        } else if (!checkEmail(emailValue)){
            setError(email , "Prease enter a valid email address.")
        }else {
            setSuccess(email)
        }
        if(passwordValue === ""){
            setError(password , "Field cannot be empty.")
        } else if(passwordValue.length < 7){
            setError(password , "The password is too short.")
        } else {
            setSuccess(password)
        }

        if(passwordConfirmationValue === ""){
            setError(passwordConfirmation , "Field cannot be empty.")
        } else if(passwordConfirmationValue !== passwordValue){
            setError(passwordConfirmation , "Password didn't match.")
        } else {
            setSuccess(passwordConfirmation)
        }
        
        const control = form.querySelectorAll(".name-box");

        const formIsValid = [...control].every((control) => {
            return (control.className === ".name-box success");
        });
    }

    function setError(input , message){
        const control = input.parentElement;
        control.className = "name-box error";
        
        const errorReturn = control.querySelector(".errorAlertMessage")
        errorReturn.innerText = message
    }

    function setSuccess (input){
        const control = input.parentElement;
        control.className = 'name-box success';
    }

    function checkEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        );
    }
})()