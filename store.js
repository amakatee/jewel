import items from "./items.json"
import formatCurrency from "./utils/formatCurrency"
import { addToCart } from "./shoppingCart"
import addGlobalEventListener from "./utils/addGlobalEventListener"

const templateProduct = document.querySelector("#product-template")
const productsContainer = document.querySelector('.gallery-products')


const IMAGE_PATH = 'https://inej.s3.ap-southeast-1.amazonaws.com/'

export function setUpStore(){
    items.forEach(renderItem)
    addGlobalEventListener("click", '[data-add-to-cart]', e => {
        const id = e.target.closest("[data-product]").dataset.productId
            
            addToCart(parseInt(id))

    })
   
  
  
}

function renderItem(item){
    const template = templateProduct.content.cloneNode(true)
    const product = template.querySelector('[data-product]')
    product.dataset.productId = item.id

    const name = template.querySelector('[data-name]')
    name.innerText = item.name

    const price = template.querySelector('[data-price]')
    price.innerText = formatCurrency(item.priceAmount / 100)



    const image = template.querySelector('[data-image]')
    image.src = `${IMAGE_PATH}${item.imageId}.jpg`
    

    

    productsContainer.appendChild(template)
    
}