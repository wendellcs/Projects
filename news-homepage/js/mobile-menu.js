const openMenuBtn = document.getElementById("open-menu-icon")
const closeMenuBtn = document.getElementById("close-menu-icon")
const mobileMenu = document.querySelector(".mobile-menu__open")

openMenuBtn.addEventListener("click" , function() {
    mobileMenu.style.display = "block"
})

closeMenuBtn.addEventListener("click" , function() {
    mobileMenu.style.display = "none"
})
