// Sistema de Progreso del Usuario - Cuida Tu Mente
// Funciones para guardar y rastrear el progreso del usuario

class UserProgress {
    constructor() {
        this.storageKey = 'cuidaTuMenteProgress';
        this.initializeProgress();
    }

    // Inicializar datos de progreso
    initializeProgress() {
        const existingData = localStorage.getItem(this.storageKey);
        if (!existingData) {
            const initialData = {
                firstVisit: new Date().toISOString(),
                lastVisit: new Date().toISOString(),
                totalVisits: 1,
                pagesVisited: [],
                activitiesCompleted: [],
                gratitudeEntries: 0,
                testTaken: false,
                chatMessages: 0,
                streak: {
                    current: 0,
                    longest: 0,
                    lastActivity: null
                },
                achievements: []
            };
            localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        } else {
            // Actualizar última visita y contador
            const data = JSON.parse(existingData);
            data.lastVisit = new Date().toISOString();
            data.totalVisits = (data.totalVisits || 0) + 1;
            this.updateStreak(data);
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
    }

    // Actualizar racha de días consecutivos
    updateStreak(data) {
        const today = new Date().toDateString();
        const lastActivity = data.streak.lastActivity ? new Date(data.streak.lastActivity).toDateString() : null;
        
        if (lastActivity === today) {
            // Ya se registró actividad hoy
            return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastActivity === yesterdayStr) {
            // Continuó la racha
            data.streak.current += 1;
        } else if (lastActivity !== today) {
            // Se rompió la racha o es la primera vez
            data.streak.current = 1;
        }
        
        // Actualizar racha más larga
        if (data.streak.current > data.streak.longest) {
            data.streak.longest = data.streak.current;
        }
        
        data.streak.lastActivity = new Date().toISOString();
    }

    // Registrar visita a una página
    visitPage(pageName) {
        const data = this.getData();
        if (!data.pagesVisited.includes(pageName)) {
            data.pagesVisited.push(pageName);
        }
        this.saveData(data);
        this.checkAchievements(data);
    }

    // Completar una actividad
    completeActivity(activityName, details = {}) {
        const data = this.getData();
        const activity = {
            name: activityName,
            completedAt: new Date().toISOString(),
            ...details
        };
        data.activitiesCompleted.push(activity);
        
        // Contadores específicos
        if (activityName === 'gratitude_entry') {
            data.gratitudeEntries = (data.gratitudeEntries || 0) + 1;
        } else if (activityName === 'wellness_test') {
            data.testTaken = true;
        } else if (activityName === 'chat_message') {
            data.chatMessages = (data.chatMessages || 0) + 1;
        }
        
        this.saveData(data);
        this.checkAchievements(data);
        return activity;
    }

    // Verificar y otorgar logros
    checkAchievements(data) {
        const achievements = [];
        
        // Logro: Primera vez
        if (data.totalVisits === 1) {
            achievements.push({
                id: 'first_visit',
                title: '¡Bienvenido!',
                description: 'Has dado el primer paso hacia el cuidado de tu mente',
                icon: 'fas fa-star',
                date: new Date().toISOString()
            });
        }

        // Logro: Explorer
        if (data.pagesVisited.length >= 3 && !this.hasAchievement(data, 'explorer')) {
            achievements.push({
                id: 'explorer',
                title: 'Explorador Curioso',
                description: 'Has visitado 3 o más herramientas diferentes',
                icon: 'fas fa-compass',
                date: new Date().toISOString()
            });
        }

        // Logro: Gratitud
        if (data.gratitudeEntries >= 5 && !this.hasAchievement(data, 'grateful_heart')) {
            achievements.push({
                id: 'grateful_heart',
                title: 'Corazón Agradecido',
                description: 'Has registrado 5 momentos de gratitud',
                icon: 'fas fa-heart',
                date: new Date().toISOString()
            });
        }

        // Logro: Constancia
        if (data.streak.current >= 3 && !this.hasAchievement(data, 'consistency')) {
            achievements.push({
                id: 'consistency',
                title: 'Constancia Admirable',
                description: '3 días consecutivos cuidando tu mente',
                icon: 'fas fa-calendar-check',
                date: new Date().toISOString()
            });
        }

        // Logro: Conversador
        if (data.chatMessages >= 10 && !this.hasAchievement(data, 'chatty')) {
            achievements.push({
                id: 'chatty',
                title: 'Alma Conversadora',
                description: 'Has intercambiado 10 mensajes en el chat',
                icon: 'fas fa-comments',
                date: new Date().toISOString()
            });
        }

        // Guardar nuevos logros
        if (achievements.length > 0) {
            data.achievements = [...(data.achievements || []), ...achievements];
            this.saveData(data);
            this.showAchievementNotification(achievements);
        }
    }

    // Verificar si ya tiene un logro
    hasAchievement(data, achievementId) {
        return data.achievements && data.achievements.some(a => a.id === achievementId);
    }

    // Mostrar notificación de logro
    showAchievementNotification(achievements) {
        achievements.forEach(achievement => {
            this.createAchievementToast(achievement);
        });
    }

    // Crear toast de logro
    createAchievementToast(achievement) {
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <div class="achievement-content">
                <i class="${achievement.icon}" style="color: #FFD700; font-size: 1.5rem;"></i>
                <div class="achievement-text">
                    <strong>¡Logro Desbloqueado!</strong><br>
                    <span style="color: #8b7ab8;">${achievement.title}</span><br>
                    <small>${achievement.description}</small>
                </div>
                <button class="achievement-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Agregar estilos si no existen
        if (!document.getElementById('achievement-styles')) {
            const styles = document.createElement('style');
            styles.id = 'achievement-styles';
            styles.textContent = `
                .achievement-toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #fff 0%, #f8f9ff 100%);
                    border: 2px solid #FFD700;
                    border-radius: 15px;
                    padding: 15px;
                    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
                    z-index: 10000;
                    max-width: 300px;
                    animation: slideInRight 0.5s ease, fadeOut 0.5s ease 4.5s forwards;
                }

                .achievement-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .achievement-text {
                    flex: 1;
                    font-size: 0.9rem;
                }

                .achievement-close {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: #999;
                }

                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes fadeOut {
                    to { opacity: 0; transform: translateX(100%); }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(toast);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    // Obtener datos del localStorage
    getData() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }

    // Guardar datos en localStorage
    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Obtener estadísticas del usuario
    getStats() {
        const data = this.getData();
        return {
            daysUsing: Math.floor((new Date() - new Date(data.firstVisit)) / (1000 * 60 * 60 * 24)) + 1,
            totalVisits: data.totalVisits || 0,
            pagesExplored: data.pagesVisited ? data.pagesVisited.length : 0,
            activitiesCompleted: data.activitiesCompleted ? data.activitiesCompleted.length : 0,
            gratitudeEntries: data.gratitudeEntries || 0,
            currentStreak: data.streak ? data.streak.current : 0,
            longestStreak: data.streak ? data.streak.longest : 0,
            achievements: data.achievements ? data.achievements.length : 0
        };
    }

    // Crear widget de progreso
    createProgressWidget() {
        const stats = this.getStats();
        const data = this.getData();

        return `
            <div class="progress-widget">
                <h4><i class="fas fa-chart-line"></i> Tu Progreso</h4>
                <div class="progress-stats">
                    <div class="stat-item">
                        <span class="stat-number">${stats.daysUsing}</span>
                        <span class="stat-label">días contigo</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${stats.currentStreak}</span>
                        <span class="stat-label">racha actual</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${stats.gratitudeEntries}</span>
                        <span class="stat-label">momentos de gratitud</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${stats.achievements}</span>
                        <span class="stat-label">logros</span>
                    </div>
                </div>
                ${data.achievements && data.achievements.length > 0 ? `
                <div class="recent-achievements">
                    <h5>Logros Recientes:</h5>
                    ${data.achievements.slice(-2).map(a => `
                        <div class="achievement-mini">
                            <i class="${a.icon}"></i> ${a.title}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>

            <style>
            .progress-widget {
                background: rgba(255, 255, 255, 0.9);
                border: 2px solid rgba(199, 184, 234, 0.3);
                border-radius: 20px;
                padding: 20px;
                margin: 20px 0;
                backdrop-filter: blur(10px);
            }

            .progress-widget h4 {
                color: #8b7ab8;
                margin-bottom: 15px;
                text-align: center;
            }

            .progress-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 15px;
                margin-bottom: 15px;
            }

            .stat-item {
                text-align: center;
                padding: 10px;
                background: rgba(199, 184, 234, 0.1);
                border-radius: 15px;
            }

            .stat-number {
                display: block;
                font-size: 1.5rem;
                font-weight: bold;
                color: #8b7ab8;
            }

            .stat-label {
                font-size: 0.8rem;
                color: #6b5b95;
            }

            .recent-achievements h5 {
                color: #8b7ab8;
                margin-bottom: 10px;
                font-size: 0.9rem;
            }

            .achievement-mini {
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                color: white;
                padding: 5px 10px;
                border-radius: 10px;
                margin: 5px 0;
                font-size: 0.8rem;
                text-align: center;
            }
            </style>
        `;
    }

    // Limpiar datos (para pruebas)
    clearProgress() {
        localStorage.removeItem(this.storageKey);
        console.log('Progreso limpiado');
    }
}

// Instancia global
const userProgress = new UserProgress();

// Funciones de conveniencia
function trackPageVisit(pageName) {
    userProgress.visitPage(pageName);
}

function trackActivity(activityName, details = {}) {
    return userProgress.completeActivity(activityName, details);
}

function showProgressWidget(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = userProgress.createProgressWidget();
    }
}

function getUserStats() {
    return userProgress.getStats();
}
