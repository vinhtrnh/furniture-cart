

const productList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list')
const cartTotalValue = document.querySelector('.cart-total-value')
const cartCountInfo = document.querySelector('.cart-count-info')

let cartItemID = 1




// handle event listener
function eventListener() {
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON()
        loadCarts()
    })


    productList.addEventListener('click', purchaseProduct)

    cartList.addEventListener('click', deleteProduct)
}
eventListener()

// update cart Total

function updateCartTotal() {
    let cartInfo = findCartInfo()
    cartCountInfo.textContent = cartInfo.productCount
    cartTotalValue.textContent = cartInfo.total
}

updateCartTotal()

function loadJSON() {
    fetch('furniture.json')
        .then(response => response.json())
        .then(data => {
            let html = ''
            data.forEach(product => {
                html += `
                <div class="col l-4">
                    <div class="product-container">
                        <div class="product-img">
                            <img src="${product.image}" alt="">
                            <div class="overlay">
                                <button class="btn add-to-cart">add to cart</button>
                            </div>
                        </div>
                        <div class="product-desc">
                            <h5 class="product-name">${product.name}</h5>
                            <span class="product-category">${product.category}</span>
                            <span class="product-price">$${product.price}</span>
                        </div>
                    </div>
                </div>
                `
            })
            productList.innerHTML = html
        })
        .catch(error => {
            // alert('Use live server or local server please')
        })
}

// purchase product
function purchaseProduct(e) {
    if (e.target.classList.contains('add-to-cart')) {
        let product = e.target.parentElement.parentElement.parentElement.parentElement
        getProductInfo(product)
    }
}

// get product info after add to cart button click
function getProductInfo(product) {
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        price: product.querySelector('.product-price').textContent,
        category: product.querySelector('.product-category').textContent
    }
    cartItemID++
    addToCartList(productInfo)
    saveProductInStorage(productInfo)
}

function addToCartList(product) {
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')
    cartItem.setAttribute('data-id', `${product.id}`)
    cartItem.innerHTML = `
        <img src="${product.imgSrc}" alt="product image">
        <div class="cart-item-info">
            <h3 class="cart-item-name">${product.name}</h3>
            <span class="cart-item-category">${product.category}</span>
            <span class="cart-item-price">${product.price}</span>
        </div>

        <button type="button" class="cart-item-del-btn">
            <i class="fas fa-times"></i>
        </button>
    `
    cartList.appendChild(cartItem)
}


// save the product in the local storage
function saveProductInStorage(item) {
    let products = getProductFromStorage()
    products.push(item)
    localStorage.setItem('products', JSON.stringify(products))
    updateCartTotal()
}

// get all the products info if there is any in the local storage
function getProductFromStorage() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
}
// load carts products
function loadCarts() {
    let products = getProductFromStorage()
    if (products.length < 1) {
        cartItemID = 1
        // if there is no product in the local storage
    } else {
        cartItemID = products[products.length - 1].id
        cartItemID++
        // else get the id of the last product and increase it by 1 
    }
    products.forEach(product => addToCartList(product))
    // calculate and update cart cartInfo
    updateCartTotal()
}

// calculate total price of the cart and orther info
function findCartInfo() {
    let products = getProductFromStorage()
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1))
        // removing dolla sign 
        return acc += price
    }, 0) // adding all the price 
    return {
        total: total.toFixed(2),
        productCount: products.length
    }
}

function deleteProduct(e) {
    let cartItem
    if (e.target.tagName === 'BUTTON') {
        cartItem = e.target.parentElement
        cartItem.remove() // remove from DOM only
    } else if (e.target.tagName === 'I') {
        cartItem = e.target.parentElement.parentElement
        cartItem.remove() // remove from DOM only
    }
    let products = getProductFromStorage()
    let updatedProduct = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id)
    })
    localStorage.setItem('products', JSON.stringify(updatedProduct))
    // updating product after deletion
    updateCartTotal()

}

// password hide show


console.log('123')