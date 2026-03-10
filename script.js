// ==================== CONFIGURACIÓN INICIAL ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeSmoothScroll();
    initializeAnimations();
    initializeContactForm();
    initializeParticles();
});

// ==================== NAVBAR ====================
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cerrar menú mobile al hacer click en un enlace
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
}

// ==================== SCROLL SUAVE ====================
function initializeSmoothScroll() {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== ANIMACIONES CON INTERSECTION OBSERVER ====================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Observar tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Observar items de timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ==================== FORMULARIO DE CONTACTO ====================
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validación básica
            if (!name || !email || !message) {
                showAlert('Por favor completa todos los campos', 'warning');
                return;
            }
            
            // Validar email
            if (!isValidEmail(email)) {
                showAlert('Por favor ingresa un email válido', 'warning');
                return;
            }
            
            // Aquí iría la lógica de envío del formulario
            try {
                console.log('Datos del formulario:', { name, email, message });
                
                showAlert('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                form.reset();
            } catch (error) {
                showAlert('Error al enviar el mensaje. Intenta de nuevo.', 'danger');
                console.error('Error:', error);
            }
        });
    }
}

// ==================== FUNCIONES AUXILIARES ====================

/**
 * Valida un email básicamente
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Muestra una alerta con Bootstrap
 */
function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
    alertContainer.setAttribute('role', 'alert');
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insertar antes del formulario o al inicio del body
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.insertAdjacentElement('afterbegin', alertContainer);
    } else {
        document.body.insertAdjacentElement('afterbegin', alertContainer);
    }
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        const alert = new bootstrap.Alert(alertContainer);
        alert.close();
    }, 5000);
}

/**
 * Scroll a la parte superior
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== PARTÍCULAS ANIMADAS ====================
function initializeParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(particle);
    }
}

console.log('Portfolio cargado exitosamente');
