const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const PDFDocument = require('pdfkit');
const xlsx = require('xlsx');

// Middleware para verificar JWT
const authenticateToken = require('../middleware/auth');

// Configuración de almacenamiento de Multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se almacenarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo con timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limitar a 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|docx|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  },
});

// Patrón Singleton para la base de datos
class Database {
  constructor() {
    if (!Database.instance) {
      this.db = require('../db'); // Conexión a la base de datos
      Database.instance = this;
    }
    return Database.instance;
  }
}

// Patrón Factory para la creación de usuarios con roles
class UserFactory {
  static createUser(role, userData) {
    switch (role) {
      case 'admin':
        return new AdminUser(userData);
      case 'contributor':
        return new ContributorUser(userData);
      case 'guest':
        return new GuestUser(userData);
      default:
        throw new Error('Rol de usuario no válido');
    }
  }
}

class AdminUser {
  constructor(data) {
    this.role = 'admin';
    this.data = data;
  }
}

class ContributorUser {
  constructor(data) {
    this.role = 'contributor';
    this.data = data;
  }
}

class GuestUser {
  constructor(data) {
    this.role = 'guest';
    this.data = data;
  }
}

// RUTA PARA REGISTRAR UN NUEVO USUARIO
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    // VERIFICAR SI EL USUARIO YA EXISTE
    const [userExiste] = await req.db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (userExiste.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // HASHEAR LA CLAVE
    const has = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, has);

    // INSERTAR EL NUEVO USUARIO
    const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?,?,?)';
    const [results] = await req.db.query(sql, [nombre, email, hashedPassword]);

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// RUTA PARA INICIAR SESIÓN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // BUSCAR EL USUARIO EN LA BASE DE DATOS
    const [users] = await req.db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ err: 'Credenciales no válidas' });
    }

    const user = users[0];

    // COMPARAR CLAVE
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ err: 'Credenciales inválidas' });
    }

    // GENERAR Y ASIGNAR UN TOKEN
    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    res.header('Authorization', token).json({ message: 'Autenticación exitosa', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// RUTA PARA SUBIR UN ARCHIVO
router.post('/uploads', authenticateToken, upload.single('file'), (req, res) => {
  const { originalname, path } = req.file;
  const userId = req.user.id;

  // Guardar la ruta del archivo en la base de datos (debe tener una tabla de archivos)
  const sql = 'INSERT INTO archivos (user_id, file_name, file_path) VALUES (?, ?, ?)';
  req.db.query(sql, [userId, originalname, path], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Archivo subido con éxito', file: originalname });
  });
});

// RUTA PARA DESCARGAR LA INFORMACIÓN DE UN USUARIO EN FORMATO PDF
router.get('/:id/download-pdf', async (req, res) => {
  const { id } = req.params;

  try {
    // Consultar el usuario por ID
    const [user] = await req.db.query('SELECT * FROM usuarios WHERE id =?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'No se puede descargar el usuario en formato PDF' });
    }

    // Crear el documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta para descargar el PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=usuario_${id}.pdf`);
    doc.pipe(res);

    // Agregar contenido al documento PDF
    doc.fontSize(25).text(`Información del Usuario ID:${id}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Nombre: ${user[0].nombre}`);
    doc.text(`Email: ${user[0].email}`);
    doc.text(`Fecha de creación: ${user[0].fecha_creacion || 'No disponible'}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTA PARA DESCARGAR LA INFORMACIÓN DE TODOS LOS USUARIOS EN FORMATO EXCEL
router.get('/download-excel', async (req, res) => {
  try {
    // Seleccionar todos los usuarios
    const [users] = await req.db.query('SELECT * FROM usuarios');
    if (users.length === 0) {
      return res.status(404).json({ error: 'No hay usuarios registrados' });
    }

    // Crear un nuevo libro de trabajo
    const workbook = xlsx.utils.book_new();
    const data = [
      ['ID', 'Nombre', 'Email', 'Fecha de Creación'],
      ...users.map(user => [user.id, user.nombre, user.email, user.fecha_creacion || 'No disponible']),
    ];

    const worksheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.set({
      'Content-Disposition': 'attachment; filename=usuarios.xlsx',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    res.send(excelBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
