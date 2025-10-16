// Configuration Formspree
window.FORMSPREE_ID = 'xpwyzeqw';

// Configuration et initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Vérification que toutes les sections existent
    const sections = ['accueil', 'about', 'skills', 'experience', 'projects', 'cv', 'certifications', 'contact'];
    sections.forEach(function(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) {
            console.warn('Section manquante:', sectionId);
        } else {
            console.log('Section trouvée:', sectionId);
        }
    });

    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeNavigation();
    initializeScrollIndicator();
    initializeBackToTop();
    initializeContactForm();
    initializeProjectModals();
    initializeThemeToggle();
    initializeCVDownload();
});

// Animation de typing pour le hero
function initializeTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const phrases = [
        'Spécialiste Administration Réseau 🔧',
        'Futur Expert Cybersécurité 🛡️',
        '3 ans d\'expérience en alternance 💼',
        'En recherche d\'alternance Master 🎯'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeAnimation() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(function() { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeAnimation, speed);
    }
    
    typeAnimation();
}

// Smooth scrolling pour les liens
function initializeNavigation() {
    // Smooth scrolling pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Fermer le menu mobile si ouvert
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('mobile-active')) {
                    navLinks.classList.remove('mobile-active');
                }
            }
        });
    });
    
    // Navigation active selon la section
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        // Mise à jour du menu actif
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Changement de style de la nav selon le scroll
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        }
    });
}

// Animations de scroll (fade-in)
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(function(el) {
        observer.observe(el);
    });
}

// Animation des barres de compétences
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                setTimeout(function() {
                    skillBar.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(function(bar) {
        skillObserver.observe(bar);
    });
}

// Indicateur de progression du scroll
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });
}

// Bouton retour en haut
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction de téléchargement du CV existant
function initializeCVDownload() {
    window.downloadCV = function(event) {
        event.preventDefault();
        
        const btn = event.target.closest('button') || event.target.closest('a');
        const originalText = btn.innerHTML;
        
        // Animation de téléchargement
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
        btn.disabled = true;
        
        // Créer un lien de téléchargement
        const link = document.createElement('a');
        link.href = './assets/CV_Esteban_Vial-Montpellier.pdf'; // Chemin vers votre CV
        link.download = 'CV_Esteban_Vial-Montpellier.pdf';
        link.style.display = 'none';
        
        // Ajouter au DOM, cliquer, puis supprimer
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Feedback utilisateur
        btn.innerHTML = '<i class="fas fa-check"></i> CV téléchargé !';
        showNotification('CV téléchargé avec succès !', 'success');
        
        // Retour à l'état initial
        setTimeout(function() {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    };

    // Fonction d'impression du CV depuis la page
    window.printCV = function() {
        const cvContainer = document.getElementById('cvContainer');
        if (!cvContainer) return;
        
        // Créer une nouvelle fenêtre pour l'impression
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>CV - Esteban Vial-Montpellier</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 0; 
                        padding: 20px;
                        color: #333;
                        background: white;
                    }
                    .cv-container {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .cv-section {
                        margin-bottom: 20px;
                        padding: 15px;
                        page-break-inside: avoid;
                    }
                    .cv-header-section {
                        border-bottom: 2px solid #0066ff;
                        padding-bottom: 15px;
                    }
                    h1 { color: #0066ff; font-size: 24px; margin-bottom: 5px; }
                    h2 { color: #00d4ff; font-size: 18px; margin-bottom: 10px; }
                    h3 { color: #0066ff; font-size: 16px; border-bottom: 1px solid #0066ff; padding-bottom: 5px; }
                    h4 { color: #333; font-size: 14px; margin-bottom: 8px; }
                    .cv-tag {
                        background: #0066ff;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        margin-right: 5px;
                        display: inline-block;
                        margin-bottom: 3px;
                    }
                    .cv-contact-item {
                        margin: 5px 0;
                        font-size: 14px;
                    }
                    ul { padding-left: 20px; }
                    li { margin: 5px 0; font-size: 14px; }
                    .cv-company { color: #00d4ff; font-weight: bold; }
                    .cv-date { color: #666; font-size: 12px; }
                    .alternance-details {
                        background: #f0f8ff;
                        padding: 15px;
                        border-left: 4px solid #00d4ff;
                        margin: 10px 0;
                    }
                    @media print {
                        body { margin: 0; }
                        .cv-section { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                <div class="cv-container">
                    ${cvContainer.innerHTML}
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Attendre que le contenu soit chargé puis imprimer
        printWindow.onload = function() {
            printWindow.print();
        };
    };
}

// Formulaire de contact avec Formspree
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validation simple
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Animation d'envoi
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        btn.disabled = true;
        
        // Envoi avec Formspree
        fetch(`https://formspree.io/f/${window.FORMSPREE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: `[Portfolio] ${formData.subject}`,
                message: `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nEnvoyé depuis le portfolio estebanvial.github.io`
            })
        })
        .then(response => {
            if (response.ok) {
                // Succès
                btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
                
                // Reset du formulaire et bouton
                setTimeout(function() {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    contactForm.reset();
                }, 3000);
                
            } else {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Erreur envoi formulaire:', error);
            
            // Erreur - proposer solution de secours
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur d\'envoi';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            
            showNotification('Erreur lors de l\'envoi. Cliquez ci-dessous pour utiliser votre client email.', 'error');
            
            // Créer un bouton de secours avec mailto
            setTimeout(function() {
                btn.innerHTML = '<i class="fas fa-envelope"></i> Ouvrir client email';
                btn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
                
                btn.onclick = function(e) {
                    e.preventDefault();
                    const subject = encodeURIComponent(`[Portfolio] ${formData.subject}`);
                    const body = encodeURIComponent(
                        `Nom: ${formData.name}\n` +
                        `Email: ${formData.email}\n\n` +
                        `Message:\n${formData.message}\n\n` +
                        `---\nEnvoyé depuis le portfolio estebanvial.github.io`
                    );
                    
                    window.location.href = `mailto:esteban.vialmontpellier@gmail.com?subject=${subject}&body=${body}`;
                    
                    setTimeout(function() {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        btn.style.background = '';
                        btn.onclick = null;
                        // Rétablir l'événement de soumission original
                        initializeContactForm();
                    }, 3000);
                };
            }, 2000);
        });
    });
}

// Fonction utilitaire pour les notifications (améliorée)
function showNotification(message, type = 'info') {
    // Supprimer les anciennes notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border-left: 4px solid rgba(255, 255, 255, 0.3);
        font-size: 14px;
        line-height: 1.4;
    `;
    
    // Couleurs et icônes selon le type
    let icon = '';
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            icon = '<i class="fas fa-check-circle" style="margin-right: 8px;"></i>';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            icon = '<i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            icon = '<i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
            icon = '<i class="fas fa-info-circle" style="margin-right: 8px;"></i>';
    }
    
    notification.innerHTML = icon + message;
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    // Suppression automatique
    const duration = type === 'error' ? 6000 : 4000; // Plus long pour les erreurs
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Gestion des modals de projets
function initializeProjectModals() {
    // Données détaillées des projets
    const projectData = {
        project1: {
            title: "Modernisation Infrastructure NevaOne",
            category: "Infrastructure Réseau",
            description: "Refonte complète de l'infrastructure réseau de l'entreprise NevaOne avec mise en place d'une architecture moderne et sécurisée.",
            context: "L'infrastructure existante de NevaOne était vieillissante et présentait des failles de sécurité. Le projet consistait à moderniser l'ensemble tout en maintenant la continuité de service.",
            technologies: ["Fortinet FortiGate 600E", "Aruba 2930F Switches", "VMware vSphere 7.0", "VLAN Segmentation", "QoS Implementation"],
            missions: [
                "Audit de l'infrastructure existante et identification des points faibles",
                "Conception de la nouvelle architecture réseau avec segmentation VLAN",
                "Configuration des équipements Fortinet et Aruba",
                "Migration progressive des services sans interruption",
                "Tests de performance et de sécurité",
                "Formation des équipes sur les nouveaux équipements",
                "Documentation complète de l'infrastructure"
            ],
            results: [
                "Augmentation de 300% de la bande passante disponible",
                "Réduction de 95% des incidents réseau",
                "Amélioration de la sécurité avec segmentation des réseaux",
                "Temps de réponse divisé par 3",
                "Infrastructure prête pour la croissance future"
            ],
            duration: "6 mois",
            team: "3 personnes"
        },
        project2: {
            title: "Audit de Sécurité & Durcissement",
            category: "Cybersécurité",
            description: "Analyse complète des vulnérabilités de l'infrastructure et mise en place de mesures de sécurisation avancées selon les standards ANSSI.",
            context: "Face aux menaces cybersécurité croissantes, NevaOne souhaitait renforcer sa posture de sécurité et se conformer aux bonnes pratiques.",
            technologies: ["Nessus Professional", "PfSense", "Fail2Ban", "Let's Encrypt SSL", "Suricata IDS", "ClamAV"],
            missions: [
                "Scan de vulnérabilités avec Nessus sur l'ensemble du parc",
                "Analyse des logs et identification des tentatives d'intrusion",
                "Durcissement des serveurs Linux selon les guides ANSSI",
                "Configuration avancée du firewall PfSense",
                "Mise en place d'un système de détection d'intrusion",
                "Chiffrement SSL/TLS sur tous les services web",
                "Formation des utilisateurs aux bonnes pratiques"
            ],
            results: [
                "85% des vulnérabilités critiques corrigées",
                "Mise en place du chiffrement end-to-end",
                "Détection proactive des tentatives d'intrusion",
                "Conformité aux recommandations ANSSI",
                "Réduction de 90% des alertes de sécurité"
            ],
            duration: "4 mois",
            team: "2 personnes"
        },
        project3: {
            title: "Plateforme de Monitoring Centralisée",
            category: "Supervision",
            description: "Déploiement d'une solution de supervision complète permettant le monitoring temps réel de l'infrastructure avec alerting automatisé.",
            context: "L'absence de monitoring centralisé rendait difficile la détection proactive des problèmes. Il fallait une solution scalable et intuitive.",
            technologies: ["Grafana", "Prometheus", "InfluxDB", "Telegraf", "AlertManager", "Node Exporter"],
            missions: [
                "Installation et configuration de la stack de monitoring",
                "Création de dashboards personnalisés par service",
                "Configuration d'alertes intelligentes avec escalade",
                "Intégration avec les équipements réseau (SNMP)",
                "Monitoring des performances applicatives",
                "Formation des équipes à l'utilisation des dashboards",
                "Documentation des procédures de supervision"
            ],
            results: [
                "Visibilité temps réel sur 100% de l'infrastructure",
                "Réduction de 70% du temps de résolution des incidents",
                "10 dashboards métier créés",
                "Alertes proactives 24/7",
                "Amélioration de la satisfaction utilisateur"
            ],
            duration: "3 mois",
            team: "2 personnes"
        },
        project4: {
            title: "Migration vers Infrastructure Virtualisée",
            category: "Virtualisation",
            description: "Migration complète des serveurs physiques vers un environnement virtualisé VMware avec haute disponibilité et sauvegarde automatisée.",
            context: "Les serveurs physiques vieillissants généraient des coûts élevés et des risques de panne. La virtualisation permettait d'optimiser les ressources.",
            technologies: ["VMware vSphere 7.0", "vCenter Server", "VMotion", "Docker", "SAN iSCSI", "Veeam Backup"],
            missions: [
                "Audit des serveurs physiques et planification de la migration",
                "Installation et configuration de l'infrastructure VMware",
                "Migration P2V (Physical to Virtual) des serveurs critiques",
                "Configuration de la haute disponibilité et du load balancing",
                "Mise en place de la sauvegarde automatisée",
                "Tests de disaster recovery",
                "Formation des équipes à la gestion virtualisée"
            ],
            results: [
                "12 serveurs physiques migrés vers 8 VMs optimisées",
                "Amélioration des performances de 150%",
                "Réduction des coûts énergétiques de 40%",
                "Haute disponibilité avec 99.9% d'uptime",
                "Sauvegarde automatisée quotidienne"
            ],
            duration: "5 mois",
            team: "3 personnes"
        },
        project5: {
            title: "Scripts d'Automatisation Système",
            category: "Automatisation",
            description: "Développement d'une suite de scripts pour automatiser les tâches d'administration quotidiennes et la maintenance préventive.",
            context: "Les tâches manuelles répétitives consommaient beaucoup de temps et étaient sources d'erreurs. L'automatisation était nécessaire pour l'efficacité.",
            technologies: ["Bash Scripts", "PowerShell", "Python", "Cron Jobs", "Ansible", "Git"],
            missions: [
                "Identification des tâches répétitives à automatiser",
                "Développement de scripts de sauvegarde automatisée",
                "Création de scripts de monitoring et d'alerting",
                "Automatisation du déploiement d'applications",
                "Scripts de maintenance préventive",
                "Mise en place d'un système de versioning",
                "Documentation et formation des équipes"
            ],
            results: [
                "25+ scripts développés et déployés",
                "Réduction de 80% du temps consacré aux tâches répétitives",
                "Élimination complète des erreurs manuelles",
                "Maintenance automatisée 24/7",
                "Amélioration de la productivité de l'équipe"
            ],
            duration: "Projet continu",
            team: "1 personne"
        },
        project6: {
            title: "HomeLab Cybersécurité",
            category: "Lab Personnel",
            description: "Création d'un laboratoire personnel dédié à l'apprentissage et aux tests de cybersécurité, pentesting et analyse forensique.",
            context: "Pour approfondir mes compétences en cybersécurité, j'ai créé un environnement de test sécurisé permettant l'expérimentation et la formation continue.",
            technologies: ["Proxmox VE", "Kali Linux", "Metasploit", "Wireshark", "DVWA", "VulnHub VMs", "pfSense", "Splunk"],
            missions: [
                "Installation et configuration de Proxmox comme hyperviseur",
                "Déploiement de machines virtuelles vulnérables pour les tests",
                "Configuration d'un réseau isolé pour les tests de pénétration",
                "Installation d'outils de cybersécurité (Kali, Metasploit, etc.)",
                "Création de scénarios d'attaque et de défense",
                "Analyse forensique sur des échantillons de malware",
                "Veille technologique et test des dernières vulnérabilités"
            ],
            results: [
                "15 VMs de test opérationnelles",
                "Amélioration continue des compétences en cybersécurité",
                "Maîtrise des outils de pentesting",
                "Expérience pratique en analyse forensique",
                "Préparation aux certifications cybersécurité"
            ],
            duration: "Projet personnel continu",
            team: "Personnel"
        }
    };

    // Fonction pour ouvrir un modal de projet
    window.openProjectModal = function(projectId) {
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        const project = projectData[projectId];
        
        if (!project) return;
        
        modalContent.innerHTML = '<div class="modal-header">' +
            '<h2 class="modal-title">' + project.title + '</h2>' +
            '<p class="modal-subtitle">' + project.category + '</p>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="project-details">' +
            '<h4>📋 Description du projet</h4>' +
            '<p style="color: var(--text-secondary); margin-bottom: 1.5rem;">' + project.description + '</p>' +
            '<h4>🎯 Contexte</h4>' +
            '<p style="color: var(--text-secondary); margin-bottom: 1.5rem;">' + project.context + '</p>' +
            '<h4>🛠️ Technologies utilisées</h4>' +
            '<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">' +
            project.technologies.map(function(tech) { return '<span class="tech-tag">' + tech + '</span>'; }).join('') +
            '</div>' +
            '<h4>⚡ Missions réalisées</h4>' +
            '<ul style="margin-bottom: 1.5rem;">' +
            project.missions.map(function(mission) { return '<li>' + mission + '</li>'; }).join('') +
            '</ul>' +
            '<div class="project-results">' +
            '<h4>🎉 Résultats obtenus</h4>' +
            '<ul>' +
            project.results.map(function(result) { return '<li>' + result + '</li>'; }).join('') +
            '</ul>' +
            '</div>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(59, 130, 246, 0.2);">' +
            '<div>' +
            '<strong style="color: var(--accent);">⏱️ Durée:</strong>' +
            '<span style="color: var(--text-secondary);"> ' + project.duration + '</span>' +
            '</div>' +
            '<div>' +
            '<strong style="color: var(--accent);">👥 Équipe:</strong>' +
            '<span style="color: var(--text-secondary);"> ' + project.team + '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Fonction pour fermer le modal
    window.closeProjectModal = function() {
        const modal = document.getElementById('projectModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('projectModal');
        if (event.target === modal) {
            window.closeProjectModal();
        }
    });

    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            window.closeProjectModal();
        }
    });
}

// Theme Toggle (Dark/Light Mode)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    let currentTheme = 'dark'; // Par défaut sombre
    
    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Passer en mode clair';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Passer en mode sombre';
        }
    }
    
    // Initialiser le thème
    setTheme(currentTheme);
    
    // Event listener pour le toggle
    themeToggle.addEventListener('click', function() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Menu mobile toggle
window.toggleMobileMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('mobile-active');
    }
};

// Fonctions utilitaires
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const args = Array.prototype.slice.call(arguments);
        const later = function() {
            clearTimeout(timeout);
            func.apply(null, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance: debounce du scroll
const debouncedScroll = debounce(function() {
    // Actions de scroll moins critiques peuvent être placées ici
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Animations au scroll améliorées
function initializeAdvancedScrollAnimations() {
    // Animation des compteurs
    const animateCounters = function() {
        const counters = document.querySelectorAll('.stat span');
        
        counters.forEach(function(counter) {
            const target = counter.textContent;
            const number = parseInt(target.replace(/\D/g, ''));
            
            if (number && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                let current = 0;
                const increment = number / 50;
                
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= number) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + target.replace(/\d/g, '');
                    }
                }, 50);
            }
        });
    };
    
    // Observer pour les compteurs
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.project-stats').forEach(function(stats) {
        counterObserver.observe(stats);
    });
}

// Gestion des performances et lazy loading
function initializePerformanceOptimizations() {
    // Lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Initialisation des fonctionnalités avancées
function initializeAdvancedFeatures() {
    initializeAdvancedScrollAnimations();
    initializePerformanceOptimizations();
    
    // Message de bienvenue
    setTimeout(function() {
        showNotification('Bienvenue sur mon portfolio !', 'info');
    }, 2000);
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Fonction de nettoyage pour éviter les fuites mémoire
function cleanup() {
    // Nettoyer les timers
    if (window.typingTimer) {
        clearTimeout(window.typingTimer);
    }
    if (window.notificationTimer) {
        clearTimeout(window.notificationTimer);
    }
}

// Nettoyage avant déchargement de la page
window.addEventListener('beforeunload', cleanup);

// Fonction pour redimensionnement de fenêtre
function handleResize() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Ajustements responsive si nécessaire
    }
}

// Debounce du redimensionnement
const debouncedResize = debounce(handleResize, 250);
window.addEventListener('resize', debouncedResize);

// Gestion du focus pour l'accessibilité
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// Fonction pour améliorer les performances d'animation
function optimizeAnimations() {
    // Réduire les animations si l'utilisateur préfère
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialiser les optimisations
optimizeAnimations();

// Lancer l'initialisation avancée après le chargement complet
window.addEventListener('load', function() {
    try {
        initializeAdvancedFeatures();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation avancée:', error);
    }
});

// Message final pour confirmer le chargement
console.log('🚀 Portfolio Esteban Vial-Montpellier - JavaScript entièrement chargé et fonctionnel!');

/* =================================================================
   CORRECTION JAVASCRIPT POUR LE MENU MOBILE
   ================================================================= */

/* 
Ajoutez cette fonction dans votre script.js si elle n'existe pas déjà :*/

window.toggleMobileMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (navLinks) {
        const isOpen = navLinks.classList.contains('mobile-active');
        
        if (isOpen) {
            navLinks.classList.remove('mobile-active');
            body.style.overflow = 'auto';
        } else {
            navLinks.classList.add('mobile-active');
            body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
        }
    }
};

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            document.body.style.overflow = 'auto';
        }
    });
});

