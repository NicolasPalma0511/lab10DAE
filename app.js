const express = require('express');
const sql = require('mssql');
const app = express();

app.set('view engine', 'ejs');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT || 1433,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true 
    }
};


sql.connect(config).then(pool => {
    console.log('Conectado a MSSQL');
}).catch(err => {
    console.log('Error en la conexión a MSSQL:', err);
});

app.get('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT UsuarioID, Nombre, Correo, Contraseña, FechaRegistro FROM Usuarios');
        
        res.render('usuarios', { usuarios: result.recordset });

    } catch (err) {
        console.log('Error al obtener datos de la tabla Usuarios:', err);
        res.status(500).send('Error al obtener los datos de la base de datos.');
    }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
