const btnOpenMobileMenu = document.getElementById('mobile-menu-icon')
const divWrapper = document.querySelector('.wrapper')
btnOpenMobileMenu.addEventListener('click', () => {
    divWrapper.classList.toggle('active')
    if (divWrapper.classList.contains('active')) {
        btnOpenMobileMenu.className = 'active'
    } else {
        btnOpenMobileMenu.className = ''
    }
});

// Hides the mobile menu if the page width is greater than 1095px.
window.addEventListener('resize', () => {
    if (window.innerWidth > 1095) {
        divWrapper.classList.remove('active')
    }
})

// Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = Array.from(document.querySelectorAll('.hidden'))
hiddenElements.forEach((el) => {
    observer.observe(el)
})