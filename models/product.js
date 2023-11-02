//const fs = require('fs')

import { readFileSync, writeFileSync, existsSync } from "node:fs"

export default class ProductManager {

    static #id
    #products
    #path

    constructor(path) {
        this.#path = path
        this.#products = this.#leerArchivo()
        ProductManager.#id = this.#products.length > 0 ? this.#products[this.#products.length - 1].id : 0
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
    addProduct(title, description, code, price, status, stock, category, thumbnail) {

        try {
            let mensaje

            const existeCodigo = this.#products.some(p => p.code === code)

            if (existeCodigo) {
                mensaje = `El código del producto ${code} ya existe`
            } else {
                const newProduct = {
                    id: ++ProductManager.#id,
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumbnail
                }

                if (!Object.values(newProduct).includes(undefined)) {
                    this.#products.push(newProduct)
                    writeFileSync(this.#path, JSON.stringify(this.#products))
                    mensaje = 'Se agrego el producto exitosamente!'
                } else {
                    mensaje = "Completar todos los campos"
                }
                return mensaje;
            }
        } catch (error) {
            console.log(error)
        }
    }
    getProduct() {
        return this.#products
    }

    getProductById(id) {
        const productId = this.#products.find(p => p.id === id)

        return productId ? productId : `No existe ningun producto con el Id ${id}`
    }

    updateProduct(id, propiedades) {
        try {
            let mensaje
            const index = this.#products.findIndex(p => p.id === id)

            if (index != -1) {
                const { id, ...rest } = propiedades
                this.#products[index] = { ...this.#products[index], ...rest }
                writeFileSync(this.#path, JSON.stringify(this.#products))
                mensaje = 'Se actualizo correctamente el producto'
            } else
                mensaje = `El producto con ID ${id} no existe`

            return mensaje
        } catch (error) {
            console.log(error)
        }
    }

    deleteproduct(id) {
        try {
            let mensaje
            const index = this.#products.findIndex(p => p.id === id)

            if (index >= 0) {
                this.#products.splice(index, 1)
                writeFileSync(this.#path, JSON.stringify(this.#products))
                mensaje = 'Producto fue eliminado'
            } else
                mensaje = `No existe ningun producto con el ID ${id}`

            return mensaje
        } catch (error) {
            console.log(error)
        }
    }
}


