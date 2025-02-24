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

export const updateReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReporte = await Reporte.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedReporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el reporte' });
  }
};

app.delete("/api/reportes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Reporte.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).json({ mensaje: "Reporte no encontrado" });
    }

    res.json({ mensaje: "Reporte eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el reporte" });
  }
});
