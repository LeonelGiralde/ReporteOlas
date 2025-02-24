const express = require('express');
const router = express.Router();
const { crearReporte, obtenerReportes, updateReporte } = require('../controllers/reporteController');
const Reporte = require('../models/reporte'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener todos los reportes
router.get('/', obtenerReportes);

// Ruta para crear un nuevo reporte
router.post('/', crearReporte);

// Ruta para actualizar un reporte
router.put('/:id', updateReporte); // Ajuste aquí, eliminando "reportes/"

// Ruta para eliminar un reporte
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReporte = await Reporte.findByIdAndDelete(id);
        if (!deletedReporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.json({ message: 'Reporte eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el reporte', error });
    }
});

module.exports = router;
