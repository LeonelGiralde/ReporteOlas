// controllers/reporteController.js
import { db } from '../config/db.js'; // Asegúrate de que la ruta sea correcta

export const crearReporte = async (req, res) => {
    const { fecha, reportes } = req.body; // Desestructura los datos del cuerpo de la solicitud

    try {
        // Inserta el nuevo reporte en la colección
        await db.collection('reportes').insertOne({ fecha, reportes });
        res.status(201).json({ message: 'Reporte guardado exitosamente.' });
    } catch (error) {
        res.status(500).send("Error al guardar el reporte.");
    }
};
