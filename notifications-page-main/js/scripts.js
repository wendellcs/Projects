const notifications = document.querySelectorAll('.notification')
const notificationsCount = document.querySelector('.header-notifications-count')

notifications.forEach(noti => noti.classList.add('unread'))
notifications.forEach(noti => {
    if (noti.classList.contains('unread')) {
        noti.addEventListener('click', () => {
            noti.classList.remove('unread')
            updateNotifications()
        })
    }
    updateNotifications()
})

const btnMarkAllAsRead = document.querySelector('.header-button')

btnMarkAllAsRead.addEventListener('click', () => {
    notifications.forEach(noti => noti.classList.remove('unread'))
    updateNotifications()
})

function updateNotifications() {
    let count = 0
    for (notification of notifications) {
        if (notification.classList.contains('unread')) count++
    }
    notificationsCount.textContent = count
}