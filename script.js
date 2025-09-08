// Funcionalidades interativas para o portfólio da Katiane Pereira

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.menu-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para a navegação fixa
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de scroll na navegação
    const nav = document.querySelector('.navegacao');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Animação de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards
    const animatedElements = document.querySelectorAll('.especialidade-card, .planos-card, .depoimento-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Validação do formulário de contato
    const form = document.querySelector('.formulario-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const plano = document.getElementById('plano').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !email || !telefone || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Validação de telefone
            const telefoneRegex = /^[0-9]{10,15}$/;
            if (!telefoneRegex.test(telefone.replace(/\D/g, ''))) {
                alert('Por favor, insira um telefone válido.');
                return;
            }
            
            // Preparar dados para envio por e-mail
            const assunto = `Nova mensagem do site - ${nome}`;
            const corpoEmail = `
Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}
Plano de interesse: ${plano || 'Não especificado'}
Mensagem: ${mensagem}

---
Enviado através do site portfólio da Katiane Pereira
            `.trim();
            
            // Criar link mailto
            const mailtoLink = `mailto:katynutricionista@hotmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;
            
            // Abrir cliente de e-mail
            window.location.href = mailtoLink;
            
            // Mostrar confirmação
            const submitBtn = form.querySelector('.botao-form');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Redirecionando...</span><span class="botao-icon">📧</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Cliente de e-mail aberto! Por favor, envie a mensagem para completar o contato.');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // Contador animado para credenciais
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Animar contadores quando visíveis
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const credenciais = entry.target.querySelectorAll('.credencial-item span');
                credenciais.forEach(credencial => {
                    if (credencial.textContent.includes('+500')) {
                        credencial.textContent = '+0 pacientes atendidos';
                        setTimeout(() => {
                            animateCounter(credencial, 500);
                            credencial.textContent = '+500 pacientes atendidos';
                        }, 500);
                    }
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.cabecalho');
    if (heroSection) {
        counterObserver.observe(heroSection);
    }

    // Efeito parallax sutil na seção hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Menu mobile (para futuras implementações)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            // Implementar menu mobile se necessário
            console.log('Menu mobile clicado');
        });
    }

    // Adicionar efeito de hover nos cards dos planos
    const planosCards = document.querySelectorAll('.planos-card');
    planosCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('planos-card-destaque')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });

    // Adicionar loading state aos botões
    const buttons = document.querySelectorAll('.cta-button, .planos-botao');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Função para adicionar efeito de typing no nome
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de typing quando a página carregar
window.addEventListener('load', function() {
    const nomeElement = document.querySelector('.nome-responsivo');
    if (nomeElement) {
        const originalText = nomeElement.textContent;
        typeWriter(nomeElement, originalText, 150);
    }
});

