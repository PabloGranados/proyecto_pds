const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Servir archivos estáticos
app.use(express.static('public'));

// Rutas API
const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);

// Ruta de salud del servicio
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Cuida Tu Mente - Chat API',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Ruta por defecto para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/chat.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('🚀 ==========================================');
    console.log('🧠 CUIDA TU MENTE - Chat de Apoyo Emocional');
    console.log('🚀 ==========================================');
    console.log(`📡 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`🌐 Accede a: http://localhost:${PORT}`);
    console.log(`💚 Estado: http://localhost:${PORT}/health`);
    console.log(`🔑 API Key configurada: ${process.env.OPENROUTER_API_KEY ? '✅ Sí' : '❌ No'}`);
    console.log('==========================================');
});