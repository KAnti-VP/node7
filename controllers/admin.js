import Product from '../models/product.js'

export const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

export const postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl || "https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png"
  const price = req.body.price
  const description = req.body.description
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

export const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  const product = Product.findById(prodId)
  if (!product) {
    return res.redirect('/')
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product
  })
}

export const postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')
}

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll()
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
}

export const postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}
