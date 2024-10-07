import fs from 'fs'
import path from 'path'

import __dirname from '../util/rootpath.js'
import Cart from './cart.js'

const prodsPath = path.join(__dirname, 'data', 'products.json')

const getProductsFromFile = callbck => {
  fs.readFile(prodsPath, (err, fileContent) => {
    if (err) {
      callbck([])
    } else {
      callbck(JSON.parse(fileContent))
    }
  })
}

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        )
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(prodsPath, JSON.stringify(updatedProducts), err => {
          if (err) console.log(err);
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(prodsPath, JSON.stringify(products), err => {
          if (err) console.log(err)
        })
      }
    })
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      const updatedProducts = products.filter(prod => prod.id !== id)
      fs.writeFile(prodsPath, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }

  static fetchAll(callbck) {
    getProductsFromFile(callbck)
  }

  static findById(id, callbck) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      callbck(product)
    })
  }
}

export default Product
