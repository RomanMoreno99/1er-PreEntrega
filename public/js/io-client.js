

const socket = io()

socket.on('connect', () => {
    console.log('Cliente conectado')
})

socket.on('disconnect', () => {
    console.log('El cliente se ha ido')
})

socket.on('productos', datos => {
    console.log(datos)
})
/* const tbody = document.querySelector('.product-table tbody');

 tbody.innerHTML = '';

 productos.forEach(producto => {
     const fila = document.createElement('tr');
     fila.innerHTML = `
         <td><img src="${producto.thumbnail}"></td>
         <td>${producto.title}</td>
         <td>${producto.description}</td>
         <td>${producto.price}</td>
         <td>${producto.stock}</td>
         <td>
             <button class="borrarProducto" data-id="${producto.id}">
                 <i class="fas fa-trash-alt"></i>
             </button>
         </td>
     `;
     tbody.appendChild(fila);
 })*/
