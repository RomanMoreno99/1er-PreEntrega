import express from 'express';
import products from './router/products.js'
import carts from './router/carts.js'

const app = express()
const port = 8080

app.use(express.json())

app.use('/api/products', products)
app.use('/api/carts', carts)

app.get('/', function (req, res) {
    return res.send('Primera Pre Entrega :D')
})

app.listen(port, () => {
    console.log(`Runing in the port ${port}...`)
})