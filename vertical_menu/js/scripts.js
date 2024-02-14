const menuControl = document.querySelector('.menu-control')
const menuIcon = document.querySelector('.icon')
const header = document.querySelector('#header')

menuControl.addEventListener('click', () => {

    if (!menuIcon.classList.contains('rotate')) {
        menuIcon.classList.add('rotate')
        header.classList.toggle('close')
    } else {
        menuIcon.classList.remove('rotate')
        header.classList.toggle('close')
    }
})





