const mysql = require('mysql2');

// Crear la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: '',            
  database: 'cop16'     
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Exportar la conexión para usarla en otros módulos
module.exports = connection;
