(function () {
    'use strict';

    const mobileMenu = document.querySelector('.mobile-menu')

    // Open mobile menu
    const btnOpenMobileMenu = document.querySelector('#open-menu-mobile')
    btnOpenMobileMenu.addEventListener('click', () => {
        toggleMobileMenuClass()
        toggleOverflowVisibility()
    })

    // Close the mobile menu by clicking on the close button.
    const btnCloseMobileMenu = document.querySelector('.svg-container svg')
    btnCloseMobileMenu.addEventListener('click', () => {
        toggleMobileMenuClass()
        toggleOverflowVisibility()
    })

    // Close the mobile menu by clicking on the filter.
    const mobileMenuFilter = document.querySelector('.mobile-menu__filter')
    mobileMenuFilter.addEventListener('click', () => {
        toggleMobileMenuClass()
        toggleOverflowVisibility()
    })

    // Toggle the class 'show' of mobile menu.
    function toggleMobileMenuClass() {
        mobileMenu.classList.toggle('show')
    }

    // Toggle the activation of body's overflow to control scrolling behavior.
    function toggleOverflowVisibility() {
        if (mobileMenu.classList.contains('show')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'visible'
        }
    }
})()