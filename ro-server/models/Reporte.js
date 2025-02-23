const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    ubicacion: { type: String, required: true },
    mareaAlta: { horario: String, medida: String },
    mareaBaja: { horario: String, medida: String },
    puntaje: { type: Number, min: 0, max: 5 },
    tempMax: Number,
    tempMin: Number,
    clima: String,
    tempMar: Number,
    dirViento: String,
    velViento: Number,
    dirSwell: String,
    olaPeriodo: { altura: Number, segundos: Number },
    descripcion: String
});

module.exports = mongoose.model('Reporte', ReporteSchema);
