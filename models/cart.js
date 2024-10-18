import fs from 'fs'
import path from 'path'

import __dirname from '../util/rootpath.js'

const cartPath = path.join(__dirname, 'data', 'cart.json')

const getCartFileContent = () => {
  let content = { products: [], totalPrice: 0 }
  try {
    content = JSON.parse(fs.readFileSync(cartPath, 'utf8'))
  } catch(err) {
    console.error(`File reading error: ${err}`)
  }
  return content
}

const setCartFileContent = (content) => {
  try {
    fs.writeFileSync(cartPath, JSON.stringify(content))
  } catch(err) {
    console.error(`File writing error: ${err}`)
    return false
  }
  return true
}

class Cart {
  static addProduct(id, productPrice) {
    // console.log(`Add to Cart id: ${id}, product prive: ${productPrice}`)
    // Fetch the previous cart
    const cart = getCartFileContent()
    // Analyze the cart => Find existing product
    const existingProductIndex = cart.products.findIndex( prod => prod.id === id )
    const existingProduct = cart.products[existingProductIndex]
    let updatedProduct
    // Add new product/ increase quantity
    if (existingProduct) {
      updatedProduct = { ...existingProduct }
      updatedProduct.qty = updatedProduct.qty + 1
      cart.products[existingProductIndex] = updatedProduct
    } else {
      updatedProduct = { id: id, qty: 1 }
      cart.products = [...cart.products, updatedProduct]
    }
    cart.totalPrice = cart.totalPrice + +productPrice
    setCartFileContent(cart)
  }

  static deleteProduct(id, productPrice) {
    const updatedCart = getCartFileContent()
    const product = updatedCart.products.find(prod => prod.id === id)
    if (!product) {
        return
    }
    const productQty = product.qty
    updatedCart.products = updatedCart.products.filter( prod => prod.id !== id )
    updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

    setCartFileContent(updatedCart)
  }

  static getCart() {
      const cart = getCartFileContent()
      return cart
  }
}

export default Cart
