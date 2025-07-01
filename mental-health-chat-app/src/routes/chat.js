const express = require('express');
const router = express.Router();
const { sendToOpenRouter } = require('../services/openrouterApi');

// Middleware para validar mensajes
const validateMessage = (req, res, next) => {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
        return res.status(400).json({ 
            error: 'El mensaje no puede estar vacío',
            status: 'error'
        });
    }
    
    if (message.length > 1000) {
        return res.status(400).json({ 
            error: 'El mensaje es demasiado largo (máximo 1000 caracteres)',
            status: 'error'
        });
    }
    
    next();
};

// Ruta principal del chat
router.post('/', validateMessage, async (req, res) => {
    try {
        const { message } = req.body;
        console.log(`Mensaje recibido: ${message}`);
        
        const response = await sendToOpenRouter(message);
        
        console.log(`Respuesta enviada (${response.status}): ${response.reply.substring(0, 50)}...`);
        
        res.json({
            ...response,
            userMessage: message
        });
        
    } catch (err) {
        console.error('Error en chat route:', err);
        
        res.status(500).json({ 
            error: 'Lo siento, no puedo responder en este momento. Si necesitas ayuda inmediata, contacta SAPTEL al (55) 5259 8121.',
            status: 'error',
            timestamp: new Date().toISOString()
        });
    }
});

// Ruta para obtener información del estado del servicio
router.get('/status', (req, res) => {
    res.json({
        status: 'active',
        service: 'Cuida Tu Mente - Chat de Apoyo Emocional',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

module.exports = router;