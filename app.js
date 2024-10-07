import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import __dirname from './util/rootpath.js'
import * as errorController from './controllers/error.js'
import adminRoutes from './routes/admin.js'
import shopRoutes from './routes/shop.js'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(PORT, () => { console.log(`server listens on port http://localhost:${PORT}`)})
