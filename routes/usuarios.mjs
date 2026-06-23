import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import conexion from '../baseDatos/conexion.mjs';

const rutasUsuarios = Router();

// REGISTRO
rutasUsuarios.post('/registro', async (solicitud, respuesta) => {

    const { usuario, password } = solicitud.body;

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        await conexion.query(
            'INSERT INTO usuarios (usuario, password) VALUES ($1, $2)',
            [usuario, passwordHash]
        );

        respuesta.json({
            mensaje: 'Usuario registrado'
        });

    } catch (error) {

        respuesta.status(500).json({
            error: error.message
        });

    }

});

// LOGIN
rutasUsuarios.post('/login', async (solicitud, respuesta) => {

    const { usuario, password } = solicitud.body;

    try {

        const resultado = await conexion.query(
            'SELECT * FROM usuarios WHERE usuario = $1',
            [usuario]
        );

        if (resultado.rows.length === 0) {
            return respuesta.status(401).json({
                mensaje: 'Usuario inexistente'
            });
        }

        const usuarioBD = resultado.rows[0];

        const coincide = await bcrypt.compare(
            password,
            usuarioBD.password
        );

        if (!coincide) {
            return respuesta.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: usuarioBD.id,
                usuario: usuarioBD.usuario
            },
            process.env.JWT_SECRETO,
            {
                expiresIn: '1h'
            }
        );

        respuesta.cookie('token', token, {
            httpOnly: true
        });

        respuesta.json({
            mensaje: 'Login correcto',
            token
        });

    } catch (error) {

        respuesta.status(500).json({
            error: error.message
        });

    }

});

export default rutasUsuarios;