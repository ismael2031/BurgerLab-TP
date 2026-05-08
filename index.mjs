import express from 'express';
import rutasProductos from './routes/productos.mjs';

const aplicacion = express();
const PUERTO = 3000;

aplicacion.use(express.json());
aplicacion.use(express.static('publico'));
aplicacion.use('/productos', rutasProductos);
aplicacion.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});