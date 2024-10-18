import express from 'express'

import * as shopController from '../controllers/shop.js'

const router = express.Router()

// / => GET
router.get('/', shopController.getIndex)

// /products => GET
router.get('/products', shopController.getProducts)

// /products/0.012548 => GET
router.get('/products/:productId', shopController.getProduct)

// /cart => GET
router.get('/cart', shopController.getCart)

// /cart => POST
router.post('/cart', shopController.postCart)

// /cart-delete-item => POST
router.post('/cart-delete-item', shopController.postCartDeleteProduct)

// /order => GET
router.get('/orders', shopController.getOrders)

// /checkout => GET
router.get('/checkout', shopController.getCheckout)

export default router
