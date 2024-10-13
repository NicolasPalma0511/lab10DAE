const express = require('express');
const sql = require('mssql');
const app = express();

app.set('view engine', 'ejs');

const config = {
    user: 'SA',
    password: 'YourStrong@Passw0rd',
    server: 'ec2-44-203-122-184.compute-1.amazonaws.com',
    port: 1433,
    database: 'lab10',
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
        const result = await pool.request().query('SELECT * FROM Usuarios');
        
        res.render('usuarios', { usuarios: result.recordset });

    } catch (err) {
        console.log('Error al obtener datos de la tabla Usuarios:', err);
        res.status(500).send('Error al obtener los datos de la base de datos.');
    }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
