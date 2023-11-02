import { Router } from "express";
import ProductManager from "../models/product.js";

const router = Router()

const productos = new ProductManager('./data/productos.json')

router.get('/products', (req, res) => {
    const p = productos.getProduct()
    return res.render('productos', { productos: p })
})

router.get('/realtimeproducts', (req, res) => {
    return res.render('realtimeprod')
})

router.get('*', (req, res) => {
    return res.render('404')
})

export default router