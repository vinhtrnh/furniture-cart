const navBars = document.querySelector('.nav-toggle')
const cartBtn = document.querySelector('.cart-btn')
const loginBtn = document.querySelector('.login-btn')
const formCloseBtn = document.querySelector('.form-close-btn')

// handle event listener
function eventListener() {


    // show hide menu bars
    navBars.addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show')
    })

    // show hide cart container
    cartBtn.addEventListener('click', () => {
        document.querySelector('.cart-container').classList.toggle('cart-container--show')
    })

    // show form modal
    loginBtn.addEventListener('click', () => {
        document.querySelector('.modal').classList.toggle('modal-clicked')
    })
    formCloseBtn.addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('modal-clicked')
    })
}
eventListener()

