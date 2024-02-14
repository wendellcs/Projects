const header = document.querySelector('#header')
const logo = document.querySelector('.logo-container')

const menu = document.querySelector('.menu')
const menuControl = document.querySelector('.menu-control')
const menuIcon = document.querySelector('.icon')

// Open and close the menu.
menuControl.addEventListener('click', toggleElementClass)

const search = document.querySelector('.search-area')
const searchIcon = document.querySelector('.search-icon')

// Verify whether the menu is closed, if so, the user will be able to open it by clicking on the search icon.
// The search icon can't close the menu.
search.addEventListener('click', () => {
    if (!header.classList.contains('close')) return
    toggleElementClass()
})

const userContainer = document.querySelector('.container-user')

// Toggle elements classes
function toggleElementClass() {
    header.classList.toggle('close')

    menu.classList.toggle('small')
    logo.classList.toggle('small')
    search.classList.toggle('small')
    menuIcon.classList.toggle('rotate')
    userContainer.classList.toggle('small')
}