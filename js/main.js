var instance = new vidbg('.video', {
    mp4: 'video/world.mp4', // URL or relative path to MP4 video
    webm: 'video/world.webm', // URL or relative path to webm video
    poster: 'img/main-screen.png', // URL or relative path to fallback image
    overlay: false, // Boolean to display the overlay or not
})

var rellax = new Rellax('.rocket');

AOS.init();

const popupMenu = document.querySelector('.popup-menu'),
    body = document.querySelector('body')


let closestItemByClass = function (item, className) {
    let node = item
    while (node) {
        if (node.classList.contains(className)) {
            return node
        }
        node = node.parentElement
    }
    return null
}

let closestAttr = function (item, attr) {
    let node = item
    while (node) {
        let attrValue = node.getAttribute(attr)
        if (attrValue) {
            return attrValue
        }
        node = node.parentElement
    }
    return null
}

const showPopup = target => {
    target.classList.add('popup-active')
}

const closePopup = target => {
    target.classList.remove('popup-active')
}

let toggleScroll = () => {
    body.classList.toggle('no-scroll')
}

body.addEventListener('click', event => {
    const target = event.target
    const popupClass = closestAttr(target, 'data-popup')
    if (popupClass === null) {
        return
    }
    event.preventDefault()
    let popup = document.querySelector('.' + popupClass)
    if (popup) {
        showPopup(popup)
        toggleScroll()
    }
})

body.addEventListener('click', event => {
    let target = event.target
    if (target.classList.contains('popup-close') ||
        target.classList.contains('popup-inner')) {
        let popup = closestItemByClass(target, 'popup')
        closePopup(popup)
        toggleScroll()
    }
})

body.addEventListener('keydown', event => {
    if (event.keyCode !== 27) {
        return
    }

    let popup = document.querySelector('.popup-active')
    if (popup) {
        closePopup(popup)
        toggleScroll()
    }
})
