import React, { useState, useEffect } from 'react';
import {
    Terminal,
    Shield,
    Code,
    Cpu,
    Database,
    Server,
    Globe,
    Mail,
    Linkedin,
    FileText,
    ChevronDown,
    MapPin,
    Lock,
    Menu,
    X,
    CheckCircle,
    Music,
    MonitorPlay,
    Activity,
    GraduationCap,
    Youtube,
    Languages
} from 'lucide-react';

// --- Composants UI Reutilisables ---

const SectionTitle = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-8 group">
        <div className="p-2 bg-emerald-500/10 rounded border border-emerald-500/30 group-hover:bg-emerald-500/20 transition-colors">
            <Icon className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
            <span className="text-emerald-500 mr-2">./</span>{title}
        </h2>
        <div className="h-px bg-slate-700 flex-grow ml-4 opacity-50"></div>
    </div>
);

const SkillBadge = ({ skill }) => (
    <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default font-mono">
        {skill}
    </span>
);

const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-900/50 border border-slate-700/50 p-6 rounded-lg hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300 ${className}`}>
        {children}
    </div>
);

// --- Données ---

const SKILLS = {
    security: [
        "Blue Team", "Active Directory Hardening", "SOC & SIEM", "GPO",
        "PingCastle", "PurpleKnight", "BloodHound", "MISP", "Stormshield", "PfSense", "Wireshark",
        "Sysmon", "Snort", "Suricata", "IAM", "NMAP", "OSINT", "Forensic", "Incident Response",
        "ISO 27001", "Analyses de Risques"
    ],
    dev: [
        "Python", "Java", "Bash", "PowerShell", "Ansible", "Selenium", "C/C++", "C#",
        "HTML/CSS", "JavaScript", "React", "PostgreSQL", "Git", "YAML", "JSON",
    ],
    ops: [
        "Windows", "Linux", "Windows Server", "Proxmox", "VMware", "VirtualBox",
        "ELK Stack", "Graylog", "Prometheus", "Grafana", "Docker", "Kubernetes"
    ],
    creative: [
        "Unity", "Blender", "FL Studio", "Audacity"
    ]
};

const EXPERIENCES = [
    {
        id: 1,
        role: "Stagiaire Développeur Fullstack",
        company: "Crédit Agricole CIB",
        logo: "/logos/CACIB.png",
        location: "Guyancourt, France",
        period: "Sept. 2024 - Févr. 2025",
        description: "Participation au développement et à la maintenance d'une application web interne en environnement Agile.",
        tags: ["Java", "React", "ELK", "Selenium", "PostgreSQL"],
        details: [
            "Fiabilisation produit : Automatisation des tests (Selenium, Cucumber, Gherkin) réduisant les régressions.",
            "UX/UI : Optimisation des performances frontend et de l'ergonomie (React).",
            "Supervision : Conception de tableaux de bord Kibana pour le suivi des performances et erreurs.",
            "Reporting : Génération de rapports mensuels statistiques (usage, fonctionnalités, nouveaux utilisateurs)."
        ]
    },
    {
        id: 2,
        role: "Agent de Production",
        company: "Blanchisserie Toulousaine de Santé",
        logo: "/logos/Blanchisserie.png",
        location: "Toulouse, France",
        period: "Juil. 2022 - Août 2022",
        description: "Immersion au cœur de la chaîne de traitement du linge industriel (Milieu Hospitalier).",
        tags: ["Rigueur", "Qualité", "Normes d'hygiène"],
        details: [
            "Respect strict des normes d'hygiène et de sécurité.",
            "Travail d'équipe et gestion de la cadence en environnement industriel.",
            "Amélioration de la productivité et réduction des erreurs de lot."
        ]
    }
];

const PROJECTS = [
    {
        id: 'fic',
        title: "Challenge Maker - FIC",
        logo: "/logos/SRS.png",
        type: "Cyber Offensive",
        period: "Févr. 2025 - Aujourd'hui",
        description: "Conception et déploiement d'un challenge technique multi-exercices pour experts (SCADA maritime, AIS, Forensic).",
        tech: ["SCADA", "Reverse Engineering", "Linux", "Memory Forensics", ".Net", "C#", "AIS/AIVDM"],
        details: "Création d'un lab isolé et scénarisation d'attaques réalistes pour le Forum International de la Cybersécurité."
    },
    {
        id: 'acda',
        title: "Audit Sécurité Active Directory",
        logo: "/logos/SRS.png",
        type: "Audit & Hardening",
        period: "Mai 2025 - Juin 2025",
        description: "Audit technique et organisationnel d'un domaine AD : identification de vecteurs d'attaque et remédiation.",
        tech: ["Active Directory", "PingCastle", "BloodHound", "PurpleKnight", "GPO", "RBAC", "Audit", "Remédiation", "Windows Server"],
        details: "Simulation de compromissions, durcissement (Tiering, désactivation SMBv1) et rédaction de plan de remédiation."
    },
    {
        id: 'adlin',
        title: "Administration Linux (ADLIN)",
        logo: "/logos/SRS.png",
        type: "Infra & Auto",
        period: "Avr. 2025 - Mai 2025",
        description: "Automatisation du déploiement de sites web avec résolution DNS centralisée et supervision complète.",
        tech: ["Ansible", "Bind9", "Prometheus", "Grafana", "Stormshield"],
        details: "Déploiement idempotent via Ansible, supervision de la santé serveurs et filtrage réseau."
    },
    {
        id: 'ars',
        title: "Architecture Réseaux & Systèmes",
        logo: "/logos/SRS.png",
        type: "Infrastructures",
        period: "Févr. 2025 - Aujourd'hui",
        description: "Conception, déploiement et durcissement d'infrastructures complètes (Labs isolés).",
        tech: ["Active Directory", "Graylog", "PKI", "MISP", "Kali"],
        details: "Mise en place de labs d'attaque/défense, collecte de logs centralisée et gestion de certificats (PKI/LDAPS)."
    },
    {
        id: 'pms',
        title: "Projet Mise en Situation (PMS)",
        logo: "/logos/SRS.png",
        type: "Consulting",
        period: "Févr. 2025 - Oct. 2025",
        description: "Simulation de consulting en transformation digitale pour la modernisation des hôpitaux (Région ARA).",
        tech: ["ISO 27001", "Analyse de Risques", "Gestion de Projet", "Conduite du Changement", "Architecture Sécurisée"],
        details: "Analyse métier, définition d'architecture cible sécurisée et stratégie de conduite du changement."
    },
    {
        id: 'ocr',
        title: "OCR Sudoku Solver",
        logo: "/logos/EPITA.png",
        type: "IA & Computer Vision",
        period: "Sept. 2022 - Déc. 2022",
        description: "Création d'un algorithme de reconnaissance optique de caractères (OCR) capable de résoudre une grille de Sudoku à partir d'une image.",
        tech: ["C", "Neural Networks", "GTK", "SDL", "Image Processing"],
        details: "Réseau de neurones 'from scratch', traitement d'image (niveaux de gris) et interface utilisateur."
    },
    {
        id: 'tesoros',
        title: "Tesoros Enterrados",
        logo: "/logos/EPITA.png",
        type: "Développement de Jeu",
        period: "Janv. 2021 - Janv. 2022",
        description: "Jeu vidéo d'aventure et de résolution d'énigmes en coopération sur le moteur Unity.",
        tech: ["Unity", "C#", "Photon Engine", "Blender", "AI"],
        details: "Responsable graphisme et modélisation 3D, mise en place serveur multijoueur (Photon) et création d'une IA."
    }
];

const FORMATIONS = [
    {
        id: 1,
        school: "EPITA",
        logo: "/logos/EPITA.png",
        degree: "Diplôme d'ingénieur en informatique",
        specialization: "Majeure Systèmes, Réseaux et Sécurité (SRS)",
        period: "Sept. 2021 - Juin 2026",
        location: "Le Kremlin-Bicêtre, France"
    },
    {
        id: 2,
        school: "Chulalongkorn University",
        logo: "/logos/Chulalongkorn.png",
        degree: "Semestre d'échange international",
        specialization: "Immersion culturelle & Boxe Thaïlandaise",
        period: "Janv. 2023 - Juin 2023",
        location: "Bangkok, Thaïlande"
    },
    {
        id: 3,
        school: "Lycée Saint-Louis Saint-Clément",
        logo: "/logos/Lycee.png",
        degree: "Baccalauréat Général",
        specialization: "Spécialités Mathématiques & Physique-Chimie",
        details: "Option Mathématiques Expertes, Mention Bien",
        period: "2018 - 2021",
        location: "France"
    }
];

// --- Application Principale ---

export default function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [typedText, setTypedText] = useState('');
    const fullText = "Ingénieur Cybersécurité & Réseaux";
    const [showCopyNotification, setShowCopyNotification] = useState(false);

    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [typedText]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setMobileMenuOpen(false);
        }
    };

    const copyToClipboard = () => {
        const email = "smelvoon@gmail.com";
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            setShowCopyNotification(true);
            setTimeout(() => setShowCopyNotification(false), 3000);
        } catch (err) {
            console.error('Erreur de copie', err);
        }

        document.body.removeChild(textArea);
    };

    const navItems = [
        { id: 'home', label: 'Accueil' },
        { id: 'about', label: 'À propos' },
        { id: 'skills', label: 'Compétences' },
        { id: 'projects', label: 'Projets' },
        { id: 'experience', label: 'Expérience' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">

            <div className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.05) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2 font-mono font-bold text-emerald-500 text-lg cursor-pointer" onClick={() => scrollToSection('home')}>
                            <Terminal size={20} />
                            <span>MELVIN_SHG</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeSection === item.id
                                            ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-slate-400 hover:text-white p-2"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-slate-800">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left px-3 py-4 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 border-l-2 border-transparent hover:border-emerald-500"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">

                <section id="home" className="min-h-[85vh] flex flex-col-reverse md:flex-row items-center justify-center py-20 gap-10 md:gap-16">
                    <div className="space-y-4 max-w-2xl flex-1">
                        <p className="text-emerald-500 font-mono text-sm sm:text-base mb-2">
                            👋 Bonjour, je suis
                        </p>
                        <h1 className="text-5xl sm:text-7xl font-bold text-slate-100 tracking-tight leading-tight">
                            Melvin Shong Geu.
                        </h1>
                        <h2 className="text-3xl sm:text-5xl font-bold text-slate-400">
                            {typedText}<span className="animate-pulse text-emerald-500">_</span>
                        </h2>
                        <p className="max-w-xl text-slate-400 text-lg leading-relaxed mt-6">
                            Étudiant en 5e année à l'<strong>EPITA</strong>, spécialisé en Systèmes, Réseaux et Sécurité (SRS).
                            Orienté <strong>Blue Team</strong>, je me passionne pour la détection, la réponse aux incidents et le durcissement d'infrastructures critiques.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-8">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-6 py-3 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                            >
                                Me contacter <Mail size={18} />
                            </button>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="px-6 py-3 border border-slate-600 text-slate-300 rounded font-medium hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2"
                            >
                                Voir mes travaux <Activity size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="relative group shrink-0">
                        {/* Decorative background blur */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        {/* Image container */}
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full p-1 bg-slate-900 border border-slate-800 overflow-hidden">
                            <img
                                src="/logos/profile.jpg"
                                alt="Melvin Shong Geu"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                </section>

                <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
                    <ChevronDown size={32} />
                </div>

                <section id="about" className="py-20">
                    <SectionTitle title="À propos" icon={Shield} />
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-4 text-slate-400 text-lg flex flex-col">
                            <p>
                                Je suis spécialisé en <strong className="text-emerald-400">cybersécurité défensive</strong> et sécurité opérationnelle.
                            </p>
                            <p>
                                Orienté <strong className="text-slate-200">Blue Team</strong>, j'ai mis en place des dispositifs complets de surveillance et de réponse aux incidents. Je maîtrise le durcissement d'Active Directory (GPO, Tiering), la sécurisation d'environnements Linux/Windows et le déploiement de pare-feux (pfSense, Stormshield).
                            </p>
                            <p>
                                Côté infrastructure, je conçois et opère mes propres laboratoires virtualisés sur <strong className="text-slate-200">Proxmox et VMware</strong> pour simuler des topologies complexes et valider des configurations de sécurité avant déploiement.
                            </p>

                            <div className="mt-auto pt-6 border-t border-slate-800">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <MapPin size={16} className="text-emerald-500" /> Grigny / Paris
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Music size={16} className="text-emerald-500" /> Musicien & Créatif
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                        <Languages size={16} className="text-emerald-500" /> Langues
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400">Français (Natif)</span>
                                        <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300">Anglais (Pro)</span>
                                        <span className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-xs text-slate-400">Espagnol (Notions)</span>
                                        <span className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-xs text-slate-400">Hmong (Notions)</span>
                                        <span className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-xs text-slate-400">Thaïlandais (Notions)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg relative overflow-hidden group h-fit">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Lock size={100} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Certifications</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 text-emerald-500"><CheckCircle size={18} /></div>
                                    <div>
                                        <p className="font-semibold text-slate-200">CSNA (Stormshield)</p>
                                        <p className="text-sm text-slate-500">Certified Network Administrator</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 text-emerald-500"><CheckCircle size={18} /></div>
                                    <div>
                                        <p className="font-semibold text-slate-200">Certificat Voltaire</p>
                                        <p className="text-sm text-slate-500">Score: 725</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 text-emerald-500"><CheckCircle size={18} /></div>
                                    <div>
                                        <p className="font-semibold text-slate-200">TOEIC</p>
                                        <p className="text-sm text-slate-500">Score: 825 (B2+)</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="skills" className="py-20 bg-slate-900/20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <SectionTitle title="Compétences" icon={Cpu} />
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="text-emerald-500" />
                                    <h3 className="text-lg font-bold text-slate-200">Sécurité & Blue Team</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.security.map(skill => <SkillBadge key={skill} skill={skill} />)}
                                </div>
                            </Card>
                            <Card>
                                <div className="flex items-center gap-3 mb-4">
                                    <Server className="text-blue-500" />
                                    <h3 className="text-lg font-bold text-slate-200">Infrastructures</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.ops.map(skill => <SkillBadge key={skill} skill={skill} />)}
                                </div>
                            </Card>
                            <Card>
                                <div className="flex items-center gap-3 mb-4">
                                    <Code className="text-purple-500" />
                                    <h3 className="text-lg font-bold text-slate-200">Dev & Automation</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.dev.map(skill => <SkillBadge key={skill} skill={skill} />)}
                                </div>
                            </Card>
                            <Card>
                                <div className="flex items-center gap-3 mb-4">
                                    <MonitorPlay className="text-pink-500" />
                                    <h3 className="text-lg font-bold text-slate-200">Creative Tech</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {SKILLS.creative.map(skill => <SkillBadge key={skill} skill={skill} />)}
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                <section id="projects" className="py-20">
                    <SectionTitle title="Projets" icon={Database} />
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {PROJECTS.map((project) => (
                            <div key={project.id} className="group relative bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                                <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${project.type === 'Cyber Offensive' ? 'from-amber-500 to-red-500' : 'from-emerald-500 to-blue-500'}`}></div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`text-xs font-mono uppercase tracking-wider ${project.type === 'Cyber Offensive' ? 'text-amber-500' : 'text-emerald-500'}`}>{project.type}</span>
                                            <span className="text-xs text-slate-500 font-mono block mt-1">{project.period}</span>
                                        </div>
                                        {project.logo && (
                                            <img src={project.logo} alt="Logo" className="w-16 h-16 object-contain" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                                    <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="mb-4 text-sm text-slate-500 border-l-2 border-slate-800 pl-3 italic">
                                        {project.details}
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-xs px-2 py-1 bg-slate-950 text-slate-400 rounded border border-slate-800">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="experience" className="py-20">
                    <SectionTitle title="Expériences" icon={BriefcaseIcon} />
                    <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">
                        {EXPERIENCES.map((exp) => (
                            <div key={exp.id} className="relative pl-8 md:pl-12 group">
                                <div className="absolute -left-[5px] top-2 w-3 h-3 bg-slate-600 rounded-full border-2 border-slate-950 group-hover:bg-emerald-500 transition-colors"></div>
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-3">
                                            {exp.role}
                                        </h3>
                                        <div className="text-lg text-emerald-500/80 mb-1 font-medium flex items-center gap-2">
                                            @ {exp.company}
                                            <span className="text-slate-600 text-sm font-normal">| {exp.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0">
                                        <span className="text-sm font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800 whitespace-nowrap">
                                            {exp.period}
                                        </span>
                                        {exp.logo && (
                                            <img src={exp.logo} alt={`Logo ${exp.company}`} className="w-20 h-20 object-contain hidden sm:block" />
                                        )}
                                    </div>
                                </div>
                                <p className="text-slate-400 mb-4 max-w-2xl">
                                    {exp.description}
                                </p>
                                <ul className="mb-4 space-y-2">
                                    {exp.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                                            <span className="text-emerald-500 mt-1.5 min-w-[10px]">▹</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map(tag => (
                                        <span key={tag} className="text-xs text-slate-500 font-mono bg-slate-900/50 px-2 py-1 rounded">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 pt-10 border-t border-slate-800">
                        <h3 className="text-2xl font-bold text-slate-200 mb-8 flex items-center gap-2">
                            <span className="text-emerald-500">./</span> Formation
                        </h3>
                        <div className="grid md:grid-cols-1 gap-6">
                            {FORMATIONS.map((formation) => (
                                <div key={formation.id} className="bg-slate-900/50 p-6 rounded border border-slate-800 hover:border-emerald-500/30 transition-colors flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-24 h-24 shrink-0 flex items-center justify-center">
                                        <img src={formation.logo} alt={formation.school} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow w-full">
                                        <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-lg font-bold text-white">{formation.school}</h4>
                                                <p className="text-emerald-400 text-sm">{formation.degree}</p>
                                            </div>
                                            <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800 mt-2 md:mt-0">
                                                {formation.period}
                                            </span>
                                        </div>
                                        {formation.specialization && (
                                            <p className="text-slate-400 text-sm mb-1">{formation.specialization}</p>
                                        )}
                                        {formation.details && (
                                            <p className="text-slate-500 text-sm italic border-l-2 border-slate-800 pl-3 mt-2">{formation.details}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-20 mb-20 text-center max-w-2xl mx-auto">
                    <p className="text-emerald-500 font-mono mb-4">./Contact</p>
                    <h2 className="text-4xl font-bold text-slate-100 mb-6">Faisons connaissance</h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Mon profil vous intéresse ou vous souhaitez échanger sur des problématiques de sécurité défensive ? Ma boîte de réception est toujours ouverte.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button
                            onClick={copyToClipboard}
                            className="group relative px-6 py-3 border border-emerald-500 text-emerald-500 rounded hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
                        >
                            <Mail size={20} />
                            <span>smelvoon@gmail.com</span>
                            {showCopyNotification && (
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded border border-slate-700">
                                    Copié !
                                </span>
                            )}
                        </button>
                        <a
                            href="https://www.linkedin.com/in/melvin-shg/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 border border-slate-700 text-slate-300 rounded hover:border-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2"
                        >
                            <Linkedin size={20} />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://www.youtube.com/@msg4120"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 border border-slate-700 text-slate-300 rounded hover:border-red-500 hover:text-red-400 transition-colors flex items-center gap-2"
                        >
                            <Youtube size={20} />
                            <span>YouTube</span>
                        </a>
                    </div>
                </section>

            </main>

            <footer className="bg-slate-950 py-8 border-t border-slate-900 text-center text-slate-600 text-sm font-mono">
                <p>Design & Développement par MSG</p>
                <p className="mt-2 text-xs opacity-50">Built with React & Tailwind CSS</p>
            </footer>
        </div>
    );
}

// Icon Wrapper for specific use
const BriefcaseIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);