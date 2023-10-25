import { Router } from 'express';
import Cart from '../models/carts.js';

const router = Router()

const cart = new Cart()

//Carrito
router.get('/', (req, res) => {
    const result = cart.getCarts()
    return res.json({ result })
})
//Carrito por id
router.get('/:id', (req, res) => {
    const result = cart.getCartById(parseInt(req.params.id))
    return res.json({ result })
})
router.post('/', (req, res) => {
    const result = cart.createCart()
    return res.json({ result })
})

router.post('/:id/product/:pid', (req, res) => {
    const result = cart.addProductCart(parseInt(req.params.id), parseInt(req.params.pid))
    return res.json({ result })
})

export default router