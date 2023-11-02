import { Router } from "express";
import ProductManager from "../models/product.js";

const router = Router()

const productos = new ProductManager('./data/productos.json')

router.get('/', (req, res) => {
    const { limit } = req.query
    const p = productos.getProduct()
    let cantProductos
    if (limit)
        cantProductos = p.slice(0, limit)
    else
        cantProductos = p
    return res.json({ cantTotal: p.length, productos: cantProductos })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    return res.json(productos.getProductById(parseInt(id)))
})
router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    const result = productos.addProduct(title, description, code, price, status, stock, category, thumbnail)
    return res.json({ result })
})
router.put('/:id', (req, res) => {
    const { id } = req.params
    const result = productos.updateProduct(parseInt(id), req.body)
    return res.json({ result })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const result = productos.deleteproduct(parseInt(id))
    return res.json({ result })
})

export default router
