import express from 'express';
import dotenv from 'dotenv';
import rutasProductos from './routes/productos.mjs';
import conexion from './baseDatos/conexion.mjs';
import rutasUsuarios from './routes/usuarios.mjs';
import cookieParser from 'cookie-parser';

dotenv.config();



const aplicacion = express();
const PUERTO = process.env.PUERTO || 3000;

conexion.query('SELECT NOW()')
    .then(() => {
        console.log('Base de datos conectada');
    })
    .catch(error => {
        console.log(error.message);
    });

aplicacion.use(express.json());
aplicacion.use(cookieParser());
aplicacion.use(express.static('publico'));
aplicacion.use('/productos', rutasProductos);
aplicacion.use('/usuarios', rutasUsuarios);
aplicacion.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});