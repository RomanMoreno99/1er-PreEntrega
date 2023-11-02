import { readFileSync, writeFileSync, existsSync } from "node:fs"
import ProductManager from "./product.js"

export default class Cart {

    static #id
    #path
    #carts
    #products

    constructor() {
        this.#path = './data/carts.json'
        this.#carts = this.#leerArchivo()
        Cart.#id = this.#carts.length > 0 ? this.#carts[this.#carts.length - 1].id : 0
        this.#products = new ProductManager()
    }

    #leerArchivo() {
        try {
            let data
            if (existsSync(this.#path))
                data = JSON.parse(readFileSync(this.#path, 'utf-8'));
            else
                data = []
            return data
        } catch (error) {
            console.log(error)
        }
    }

    createCart() {
        try {
            const newCart = {
                id: ++Cart.#id,
                products: [],
            }
            this.#carts.push(newCart)
            writeFileSync(this.#path, JSON.stringify(this.#carts))
            return 'Carrito creado exitosamente'
        } catch (error) {
            console.log(error)
        }
    }

    getCarts() {
        return this.#carts
    }

    getCartById(id) {
        const carritoId = this.#carts.find(c => c.id === id)

        return carritoId ? carritoId : `El carrito con el ID ${id}, no existe!`
    }

    addProductCart(idCart, idProduct) {
        try {
            let mensaje

            const indiceCarrito = this.#carts.findIndex(c => c.id === idCart)
            const existeProduct = this.#products.getProductById(idProduct)

            if (indiceCarrito != -1 && existeProduct) {

                const existeProduct = this.#carts[indiceCarrito].products.findIndex(p => p.id === idProduct)

                if (existeProduct != -1) {

                    this.#carts[indiceCarrito].products[existeProduct].quantity = this.#carts[indiceCarrito].products[existeProduct].quantity + 1
                }else {
                    const producto = {
                        id: idProduct,
                        quantity: 1
                    }

                    this.#carts[indiceCarrito].products.push(producto)
                }

                writeFileSync(this.#path, JSON.stringify(this.#carts))

                mensaje = 'El producto fue agregado exitosamente al carrito!'

            }else {
                mensaje = 'No existe tal producto o carrito con ese id '
            }

            return mensaje
        } catch (error) {
            console.log(error)
        }
    }

}