// Componente de Navegación Unificado para Cuida Tu Mente
// Uso: Incluir este script en cualquier página y llamar createNavigation(currentPage)

function createNavigation(currentPage = '') {
    return `
        <header>
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <i class="fas fa-heart"></i> Cuida Tu Mente
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'inicio' ? 'active' : ''}" href="index.html">
                                    <i class="fas fa-home"></i> Inicio
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="index.html#que-es">¿Qué es?</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="index.html#autocuidado">Autocuidado</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'test' ? 'active' : ''}" href="test.html">
                                    <i class="fas fa-clipboard-check"></i> Test
                                </a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle ${['juegos', 'gratitud', 'respiracion', 'mindfulness', 'afirmaciones', 'altruista', 'conecta', 'identifica', 'memorama'].includes(currentPage) ? 'active' : ''}" 
                                   href="#" id="herramientasDropdown" role="button" data-bs-toggle="dropdown">
                                    <i class="fas fa-tools"></i> Herramientas
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item ${currentPage === 'juegos' ? 'active' : ''}" href="juegos.html">
                                        <i class="fas fa-gamepad"></i> Juegos Terapéuticos
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'gratitud' ? 'active' : ''}" href="gratitud.html">
                                        <i class="fas fa-feather-alt"></i> Diario de Gratitud
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'respiracion' ? 'active' : ''}" href="respiracion.html">
                                        <i class="fas fa-lungs"></i> Respiración Guiada
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'mindfulness' ? 'active' : ''}" href="mindfulness.html">
                                        <i class="fas fa-eye"></i> Mindfulness Visual
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'afirmaciones' ? 'active' : ''}" href="afirmaciones.html">
                                        <i class="fas fa-star"></i> Afirmaciones Positivas
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'altruista' ? 'active' : ''}" href="altruista.html">
                                        <i class="fas fa-hands-helping"></i> Actividades Altruistas
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'conecta' ? 'active' : ''}" href="conecta.html">
                                        <i class="fas fa-heart"></i> Conecta tu Sentir
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'identifica' ? 'active' : ''}" href="identifica.html">
                                        <i class="fas fa-smile"></i> Identifica Emociones
                                    </a></li>
                                    <li><a class="dropdown-item ${currentPage === 'memorama' ? 'active' : ''}" href="memorama.html">
                                        <i class="fas fa-puzzle-piece"></i> Memorama Relajante
                                    </a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item ${currentPage === 'chat' ? 'active' : ''}" href="mental-health-chat-app/public/chat.html">
                                        <i class="fas fa-comments"></i> Chat de Apoyo
                                    </a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="index.html#recursos">
                                    <i class="fas fa-phone-alt"></i> Recursos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    `;
}

// CSS común para la navegación - EXACTAMENTE COMO test.html
function getNavigationCSS() {
    return `
        <style>
        /* Navegación unificada - Estilo exacto de test.html */
        header {
            padding: 15px 0;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(199, 184, 234, 0.3);
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .navbar-brand {
            font-size: 2rem;
            font-weight: bold;
            color: #8b7ab8 !important;
            text-shadow: 2px 2px 4px rgba(139, 122, 184, 0.2);
        }

        .navbar-nav .nav-link {
            color: #6b5b95 !important;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 10px 15px !important;
            border-radius: 20px;
            margin: 0 5px;
        }

        .navbar-nav .nav-link:hover {
            background: rgba(199, 184, 234, 0.2);
            transform: translateY(-2px);
        }

        .navbar-nav .nav-link.active {
            background: linear-gradient(135deg, #c7b8ea 0%, #8b7ab8 100%);
            color: white !important;
            font-weight: 600;
        }

        .dropdown-menu {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(199, 184, 234, 0.3);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(139, 122, 184, 0.2);
        }

        .dropdown-item {
            color: #6b5b95;
            transition: all 0.3s ease;
            border-radius: 10px;
            margin: 2px 5px;
        }

        .dropdown-item:hover {
            background: rgba(199, 184, 234, 0.2);
            color: #8b7ab8;
            transform: translateX(5px);
        }

        .dropdown-item i {
            width: 20px;
            text-align: center;
            margin-right: 8px;
        }

        .navbar-toggler {
            border: none;
            padding: 6px 12px;
        }

        .navbar-toggler:focus {
            box-shadow: none;
        }
        </style>
    `;

        .navbar-brand {
            font-size: 1.8rem;
            font-weight: bold;
            color: #8b7ab8 !important;
            text-shadow: 2px 2px 4px rgba(139, 122, 184, 0.2);
            transition: all 0.3s ease;
        }

        .navbar-brand:hover {
            transform: translateY(-2px);
            color: #6b5b95 !important;
        }

        .navbar-nav .nav-link {
            color: #6b5b95 !important;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 10px 15px !important;
            border-radius: 20px;
            margin: 0 5px;
            position: relative;
            overflow: hidden;
        }

        .navbar-nav .nav-link:hover {
            background: rgba(199, 184, 234, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(199, 184, 234, 0.3);
        }

        .navbar-nav .nav-link.active {
            background: linear-gradient(135deg, #c7b8ea 0%, #8b7ab8 100%);
            color: white !important;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(139, 122, 184, 0.4);
        }

        .dropdown-menu {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(199, 184, 234, 0.3);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(139, 122, 184, 0.2);
            padding: 10px 5px;
        }

        .dropdown-item {
            color: #6b5b95;
            transition: all 0.3s ease;
            border-radius: 10px;
            margin: 2px 5px;
            padding: 8px 15px;
        }

        .dropdown-item:hover {
            background: rgba(199, 184, 234, 0.2);
            color: #8b7ab8;
            transform: translateX(5px);
        }

        .dropdown-item.active {
            background: linear-gradient(135deg, #c7b8ea 0%, #8b7ab8 100%);
            color: white;
        }

        .dropdown-item i {
            width: 20px;
            text-align: center;
            margin-right: 8px;
        }

        .navbar-toggler {
            border: none;
            color: #8b7ab8;
        }

        .navbar-toggler:focus {
            box-shadow: none;
        }

        @media (max-width: 768px) {
            .navbar-nav .nav-link {
                margin: 2px 0;
                text-align: center;
            }
            
            .dropdown-menu {
                margin-top: 10px;
            }
        }
        </style>
    `;
}

// Función para agregar botón de "volver al inicio" al final de páginas
function addBackToHomeButton() {
    return `
        <div class="text-center mt-5 mb-4">
            <a href="index.html" class="btn-back-home">
                <i class="fas fa-arrow-left"></i> Volver al Inicio
            </a>
        </div>
        
        <style>
        .btn-back-home {
            display: inline-block;
            background: linear-gradient(135deg, #6b5b95 0%, #8b7ab8 100%);
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(107, 91, 149, 0.3);
        }

        .btn-back-home:hover {
            color: white;
            text-decoration: none;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(107, 91, 149, 0.4);
        }

        .btn-back-home i {
            margin-right: 8px;
        }
        </style>
    `;
}

// Función para agregar enlaces cruzados entre herramientas relacionadas
function addCrossLinks(currentPage) {
    const relatedTools = {
        'test': ['gratitud', 'juegos', 'chat'],
        'gratitud': ['test', 'altruista', 'conecta'],
        'juegos': ['test', 'memorama', 'identifica'],
        'altruista': ['gratitud', 'conecta'],
        'conecta': ['gratitud', 'identifica', 'altruista'],
        'identifica': ['conecta', 'juegos'],
        'memorama': ['juegos', 'identifica']
    };

    const toolNames = {
        'test': 'Test de Bienestar',
        'gratitud': 'Diario de Gratitud',
        'juegos': 'Juegos Terapéuticos',
        'altruista': 'Actividades Altruistas',
        'conecta': 'Conecta tu Sentir',
        'identifica': 'Identifica Emociones',
        'memorama': 'Memorama Relajante',
        'chat': 'Chat de Apoyo'
    };

    const toolIcons = {
        'test': 'fas fa-clipboard-check',
        'gratitud': 'fas fa-feather-alt',
        'juegos': 'fas fa-gamepad',
        'altruista': 'fas fa-hands-helping',
        'conecta': 'fas fa-heart',
        'identifica': 'fas fa-smile',
        'memorama': 'fas fa-puzzle-piece',
        'chat': 'fas fa-comments'
    };

    if (!relatedTools[currentPage]) return '';

    const links = relatedTools[currentPage].map(tool => {
        const href = tool === 'chat' ? 'mental-health-chat-app/public/chat.html' : `${tool}.html`;
        return `
            <div class="col-md-4 mb-3">
                <a href="${href}" class="related-tool-link">
                    <div class="related-tool-card">
                        <i class="${toolIcons[tool]}"></i>
                        <span>${toolNames[tool]}</span>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </a>
            </div>
        `;
    }).join('');

    return `
        <section class="related-tools-section">
            <div class="container">
                <h3 class="text-center mb-4" style="color: #8b7ab8;">
                    <i class="fas fa-link"></i> Herramientas Relacionadas
                </h3>
                <div class="row justify-content-center">
                    ${links}
                </div>
            </div>
        </section>

        <style>
        .related-tools-section {
            background: rgba(255, 255, 255, 0.6);
            padding: 40px 0;
            margin: 40px 0;
            border-radius: 25px;
            backdrop-filter: blur(10px);
        }

        .related-tool-link {
            text-decoration: none;
            color: inherit;
        }

        .related-tool-card {
            background: rgba(255, 255, 255, 0.8);
            border: 2px solid rgba(199, 184, 234, 0.3);
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .related-tool-card:hover {
            transform: translateY(-5px);
            border-color: #8b7ab8;
            box-shadow: 0 10px 25px rgba(139, 122, 184, 0.2);
            background: rgba(255, 255, 255, 0.95);
        }

        .related-tool-card i:first-child {
            font-size: 2rem;
            color: #8b7ab8;
            margin-bottom: 5px;
        }

        .related-tool-card span {
            color: #6b5b95;
            font-weight: 500;
            font-size: 1rem;
        }

        .related-tool-card i:last-child {
            color: #c7b8ea;
            font-size: 0.9rem;
            margin-top: 5px;
        }

        .related-tool-card:hover i:last-child {
            transform: translateX(5px);
            color: #8b7ab8;
        }
        </style>
    `;
}
