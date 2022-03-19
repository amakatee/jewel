
import items from "./items.json"
import formatCurrency from "./utils/formatCurrency"
import addGlobalEventListener from "./utils/addGlobalEventListener"

const cartButton = document.querySelector('.shopping-cart-icon')
const cartItemsWrapper = document.querySelector('#shopping-cart-container')
const overlay = document.querySelector('.overlay')
const productsContainer = document.querySelector('.products-container')
const shoppingCartTemplate = document.querySelector('#shopping-cart-template')
const totalPrice = document.querySelector('.total-price')
const cartQuantity = document.querySelector('.span')
const cart = document.querySelector('.cart')
let shoppingCart = loadCart()
const IMAGE_PATH = 'https://inej.s3.ap-southeast-1.amazonaws.com/'
const SESSION_STORAGE_KEY= "SHOPPING_CART-cart"



export function setUpShoppingCart(){
    renderCart()
    addGlobalEventListener("click", '[remove-from-cart-btn ]', e => {
        const id = parseInt(e.target.closest('[data-cart-product]').dataset.productId)
        removeFromCart(id)

    })
    // shoppingCart = loadCart()
    
    cartButton.addEventListener("click", () => {
        cartItemsWrapper.classList.toggle('none')
       
    })
    
 
    
}
function saveCart(){
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))

}
function loadCart(){
   const cart =  sessionStorage.getItem(SESSION_STORAGE_KEY)
   return JSON.parse(cart) || []

}
function removeFromCart(id){
    const existingItem = shoppingCart.find(entry => entry.id === id)
    if(existingItem == null) return
    shoppingCart = shoppingCart.filter(entry => entry.id !== id)
    renderCart()
    saveCart()

}

export function addToCart(id){
    
    const existingItem = shoppingCart.find(entry => entry.id === id)
    if(existingItem){
        existingItem.quantity++
    } else {
    shoppingCart.push({id: id, quantity: 1})
    }
  
    renderCart()
    saveCart()
   
    
   
    
}
function renderCart(){
    
    if(shoppingCart.length === 0 ){
        hideCart()
        
    }
    else{
        showCart()
        renderCartItems()
    }

}
function showCart(){
    cartButton.classList.remove('none')
    
    

}
function hideCart(){
    cartButton.classList.add('none')
    
    cartItemsWrapper.classList.add('none')

}

function renderCartItems(){
    cartQuantity.innerText = `(${shoppingCart.length})`


    const total = shoppingCart.reduce((sum, entry) => {
        const item = items.find(item => entry.id === item.id)
        
        return sum + item.priceAmount * entry.quantity
    },0)
   
    totalPrice.innerText = formatCurrency(total / 100)
   
    productsContainer.innerHTML = ''
    shoppingCart.forEach(entry => {
        const item = items.find(item => entry.id === item.id)
        console.log(item, quantity)
        const cartItem = shoppingCartTemplate.content.cloneNode(true)

        const product = cartItem.querySelector('[data-cart-product]')
        product.dataset.productId = item.id

        const name = cartItem.querySelector("[data-name]")
        name.innerText = item.name

        const image = cartItem.querySelector('[data-image]')
        image.src = `${IMAGE_PATH}${item.imageId}.jpg`

       
        const quantity = cartItem.querySelector('[data-quantity]')
        
        quantity.innerText = `x${entry.quantity}`
        
        
        

        const price =  cartItem.querySelector('[data-price]')
        price.innerText = formatCurrency(item.priceAmount * entry.quantity /100)
        


        productsContainer.appendChild(cartItem)

    })
   

}
