const express = require('express');
const router = express.Router();
const { crearReporte, obtenerReportes } = require('../controllers/reporteController');

// Ruta para obtener todos los reportes
router.get('/', obtenerReportes);

// Ruta para crear un nuevo reporte
router.post('/', crearReporte);

module.exports = router;
