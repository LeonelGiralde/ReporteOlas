import express from 'express';
import { connectToDatabase } from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el paquete cors

const app = express();
const PORT = process.env.PORT || 5000;
let db;

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para todas las rutas

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conectar a la base de datos
connectToDatabase()
    .then(client => {
        db = client.db('ReporteOlas');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error al iniciar el servidor:", err);
    });

// Rutas
app.get('/api/reportes', async (req, res) => {
    try {
        const reportes = await db.collection('reportes').find().toArray();
        res.json(reportes);
    } catch (error) {
        res.status(500).send("Error al obtener los reportes.");
    }
});

app.post('/api/reportes', async (req, res) => {
    const { fecha, reportes } = req.body;

    try {
        await db.collection('reportes').insertOne({ fecha, reportes });
        res.status(201).json({ message: 'Reporte guardado exitosamente.' });
    } catch (error) {
        res.status(500).send("Error al guardar el reporte.");
    }
});
