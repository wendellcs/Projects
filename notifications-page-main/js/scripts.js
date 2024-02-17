const notifications = document.querySelectorAll('.notification')
notifications.forEach(noti => noti.classList.add('unread'))
notifications.forEach(noti => {
    if (noti.classList.contains('unread')) {
        noti.addEventListener('click', () => {
            noti.classList.remove('unread')
        })
    }
})

const btnMarkAllAsRead = document.querySelector('.header-button')

btnMarkAllAsRead.addEventListener('click', () => {
    notifications.forEach(noti => noti.classList.remove('unread'))
})