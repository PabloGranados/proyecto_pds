const axios = require('axios');

async function sendToOpenRouter(message) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
        throw new Error('API key de OpenRouter no configurada');
    }

    // Prompt del sistema para comportamiento de apoyo en salud mental
    const systemPrompt = `Eres un asistente de apoyo emocional llamado "Cuida Tu Mente". Tu rol es:

1. Proporcionar apoyo emocional empático y comprensivo
2. Ofrecer técnicas de relajación y mindfulness
3. Sugerir recursos y estrategias de autocuidado
4. Escuchar sin juzgar y validar emociones

IMPORTANTE:
- NO eres un terapeuta ni das diagnósticos
- SIEMPRE recomienda buscar ayuda profesional si es necesario
- Si detectas riesgo de autolesión, sugiere líneas de crisis: SAPTEL ((55) 5259 8121) o Línea de la Vida (800 911 2000)
- Usa un tono cálido, empático y esperanzador
- Respuestas máximo 150 palabras
- Enfócate en el bienestar y la esperanza

Responde en español de manera natural y comprensiva.`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "meta-llama/llama-3.1-8b-instruct:free", // Modelo gratuito actualizado
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                max_tokens: 200,
                temperature: 0.7,
                top_p: 0.9
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'Cuida Tu Mente - Chat de Apoyo Emocional'
                }
            }
        );
        
        const reply = response.data.choices[0].message.content;
        
        return { 
            reply: reply,
            timestamp: new Date().toISOString(),
            status: 'success'
        };
        
    } catch (error) {
        console.error('Error al llamar a OpenRouter:', error.response ? error.response.data : error.message);
        
        // Respuesta de fallback si la API falla
        const fallbackResponse = {
            reply: "Lo siento, tengo dificultades técnicas en este momento. Sin embargo, quiero que sepas que no estás solo/a. Si necesitas ayuda inmediata, puedes contactar SAPTEL al (55) 5259 8121 o la Línea de la Vida al 800 911 2000. Tu bienestar es importante. 💙",
            timestamp: new Date().toISOString(),
            status: 'fallback'
        };
        
        return fallbackResponse;
    }
}

module.exports = { sendToOpenRouter };