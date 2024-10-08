import fs from 'fs'
import path from 'path'

import __dirname from '../util/rootpath.js'

const cartPath = path.join(__dirname, 'data', 'cart.json')

class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) console.log(err)
      })
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        return
      }
      const updatedCart = { ...JSON.parse(fileContent) }
      const product = updatedCart.products.find(prod => prod.id === id)
      if (!product) {
          return
      }
      const productQty = product.qty
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      )
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

      fs.writeFile(cartPath, JSON.stringify(updatedCart), err => {
        if (err) console.log(err)
      })
    })
  }

  static getCart(callbck) {
    fs.readFile(cartPath, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
      if (err) {
        callbck(null)
      } else {
        callbck(cart)
      }
    })
  }
}

export default Cart
