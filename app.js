import express from 'express';
import hbs from 'hbs';
import products from './router/products.js';
import carts from './router/carts.js';
import init from './router/init.js'
import __dirname from './utils/dirname.js';
import Productos from './models/product.js'

import { Server } from 'socket.io'


const app = express()
const port = 8080
const datos = new Productos()

app.use(express.static('public'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials', function (err) { });
app.use(express.json())

app.use('/api/products', products)
app.use('/api/carts', carts)
app.use('/', init)

const httpServer = app.listen(port, () => {
    console.log(`Runing in the port ${port}...`)
})

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log('Nuevo cliente activo')

    const productos = datos.getProduct()

    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })

    socket.emit('productos', productos)

})