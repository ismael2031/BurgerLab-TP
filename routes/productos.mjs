import { Router } from 'express';

const rutasProductos = Router();
let productos = [
    {
        id: 1,
        nombre: 'Hamburguesa Clasica',
        precio: 5000,
        imagen: 'imagenes/hamburguesa.jpg'
    },
    {
        id: 2,
        nombre: 'Papas Fritas',
        precio: 2500,
        imagen: 'imagenes/papas.jpg'
    },
    {
        id: 3,
        nombre: 'Pizza Especial',
        precio: 7000,
        imagen: 'imagenes/pizza.jpg'
    }
];

// este paso lo mostramos
rutasProductos.get('/', (solicitud, respuesta) => {
    respuesta.json(productos);
});

// este paso seria agregar el producto
rutasProductos.post('/', (solicitud, respuesta) => {
    const nuevoProducto = solicitud.body;
    productos.push(nuevoProducto);
    respuesta.json({
        mensaje: 'Producto agregado',
        productos
    });
});

// este paso seria eliminar el producto
rutasProductos.delete('/:id', (solicitud, respuesta) => {
    const id = parseInt(solicitud.params.id);
    productos = productos.filter(producto => producto.id !== id);
    respuesta.json({
        mensaje: 'Producto eliminado',
        productos
    });
});
export default rutasProductos;