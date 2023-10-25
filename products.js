import ProductManager from "./models/PreEntrega.js";

const productos = new ProductManager('./data/productos.json')

const p1 = productos.addProduct("Nike", "Jordan1", 200, "thumbnail1", "xx1", 10)
const p2 = productos.addProduct("Nike", "Jordan2", 240, "thumbnail2", "xx2", 50)
const p3 = productos.addProduct("Nike", "Jordan3", 220, "thumbnail3", "xx3", 20)
const p4 = productos.addProduct("Nike", "Jordan4", 350, "thumbnail4", "xx4", 15)
const p5 = productos.addProduct("Nike", "Dunk Panda", 200, "thumbnail5", "xx5", 12)
const p6 = productos.addProduct("Nike", "AF1", 150, "thumbnail6", "xx6", 9)
console.log({ p1, p2, p3, p4, p5, p6 })

//console.log(productos.deleteProduct(2))
//console.log(productos.deleteProduct(15))

/*const updateP1 = {
    id: 25,
    price: 350,
    stock: 30,
    thumbnail: './img/AFSupreme.jpg',
    title: 'AirForce Supreme'
}*/

//console.log(productos.updateProduct(3, updateP1))
console.log(productos.getProduct())