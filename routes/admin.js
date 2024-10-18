import express from 'express'

import * as adminController from '../controllers/admin.js'

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/products => GET
router.get('/products', adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct)

// /admin/edit-product/0.154875214 => GET
router.get('/edit-product/:productId', adminController.getEditProduct)

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct)

// /admin/delete-product => DELETE
router.post('/delete-product', adminController.postDeleteProduct)

export default router
