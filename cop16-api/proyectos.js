const express = require('express');
const router = express.Router();
const db = require('./db'); // Asegúrate de que la conexión a la base de datos está bien importada

// Obtener todos los proyectos
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error obteniendo proyectos', error: err });
      }
      res.json(results);
    });
});

// Crear un nuevo proyecto
router.post('/', (req, res) => {
  const { name, category, co2Reduction, biodiversityConservation, wasteManagement } = req.body;
  
  const sql = `INSERT INTO projects (name, category, startDate, co2Reduction, biodiversityConservation, wasteManagement) VALUES (?, ?, NOW(), ?, ?, ?)`;
  db.query(sql, [name, category, co2Reduction, biodiversityConservation, wasteManagement], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creando el proyecto', error: err });
    }
    res.status(201).json({ id: result.insertId, message: 'Proyecto creado exitosamente' });
  });
}); 

// Obtener un proyecto por ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM projects WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error obteniendo el proyecto', error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
      res.json(result[0]);
    });
});

// Actualizar un proyecto
router.put('/:id', (req, res) => {
    const { name, category, co2Reduction, biodiversityConservation, wasteManagement, status } = req.body;
  
    const sql = `UPDATE projects SET name = ?, category = ?, co2Reduction = ?, biodiversityConservation = ?, wasteManagement = ?, status = ? WHERE id = ?`;
    db.query(sql, [name, category, co2Reduction, biodiversityConservation, wasteManagement, status, req.params.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error actualizando el proyecto', error: err });
      }
      res.json({ message: 'Proyecto actualizado exitosamente' });
    });
});

// Eliminar un proyecto
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM projects WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error eliminando el proyecto', error: err });
      }
      res.json({ message: 'Proyecto eliminado exitosamente' });
    });
});

// Búsqueda dinámica por nombre y categoría, y filtro por estado
router.get('/search', (req, res) => {
    let sql = 'SELECT * FROM projects WHERE 1=1';  // 1=1 es un truco para agregar dinámicamente condiciones
    const params = [];
  
    if (req.query.name) {
      sql += ' AND name LIKE ?';
      params.push(`%${req.query.name}%`);  // Búsqueda parcial con LIKE
    }
  
    if (req.query.category) {
      sql += ' AND category = ?';
      params.push(req.query.category);
    }
  
    if (req.query.status) {
      sql += ' AND status = ?';
      params.push(req.query.status);
    }
  
    db.query(sql, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error realizando búsqueda', error: err });
      }
      res.json(results);
    });
});

// Reporte de proyectos completados con métricas de impacto
router.get('/report', (req, res) => {
    const sql = 'SELECT COUNT(*) AS totalProjects, SUM(co2Reduction) AS totalCO2Reduction, SUM(biodiversityConservation) AS totalBiodiversity, SUM(wasteManagement) AS totalWaste FROM projects WHERE status = "completado"';
  
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error generando el reporte', error: err });
      }
      res.json(results[0]);
    });
});

module.exports = router;
