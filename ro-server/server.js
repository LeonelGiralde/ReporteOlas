import express from 'express';
import { connectToDatabase } from './config/db.js'; // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = process.env.PORT || 5000;
let db; // Declara la variable db aquí

// Conectar a la base de datos
connectToDatabase()
    .then(client => {
        db = client.db('ReporteOlas'); // Cambia por el nombre de tu base de datos
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error al iniciar el servidor:", err);
    });

// Ruta para obtener datos de la colección
app.get('/api/reportes', async (req, res) => {
    try {
        const reportes = await db.collection('reportes').find().toArray(); // Cambia por tu colección
        res.json(reportes);
    } catch (error) {
        res.status(500).send("Error al obtener los reportes.");
    }
});
