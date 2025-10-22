import { useState, useMemo, useRef, useEffect } from 'react';
import type { CSSProperties, FormEvent, ChangeEvent } from 'react';
import { FiChevronLeft, FiChevronRight, FiLogOut, FiVolume2, FiSettings, FiX, FiImage } from 'react-icons/fi';

import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';

import "./firebaseConfig.ts";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import './App.css';

// Importar imágenes y video
import logoAuriLekto from "./assets/images/AuriLektoImage.png";
import auriLektoVideo from './assets/images/Video.mp4';
import imgHellenn from './assets/images/hellenn.jpg';
import imgIsaac from './assets/images/isaaccccccc.jpg';
import imgJennifer from './assets/images/jenniferrr.jpg';
import imgJoan from './assets/images/joannnn.jpg';
import imgKaory from './assets/images/kaoryyyy.jpg';
import imgNicole from './assets/images/nicoleee.jpg';
import imgValeria from './assets/images/valeriaaaaa.jpg';

type SectionFilter = 'welcome' | 'designer' | 'about' | 'contact';

// Datos del equipo
const teamData = [
    { id: 1, name: 'Hellen Sanchez', role: 'Se destaca por ser Responsable, esencial para el manejo correcto de los recursos económicos y presupuestos, garantizando la salud financiera y la sostenibilidad de Auri Lekto.', image: imgHellenn },
    { id: 2, name: 'Isaac Galeano', role: 'Se destaca por su Precisión, indispensable para escribir y revisar el código sin errores, garantizando que el software de Auri Lekto sea estable, funcional y seguro', image: imgIsaac },
    { id: 3, name: 'Jennifer Perafan', role: ' Se destaca por ser Creativa, esencial para diseñar estrategias innovadoras que atraigan al público y posicionen la marca Auri Lekto de manera efectiva en el mercado.', image: imgJennifer },
    { id: 4, name: 'Joan Tamayo', role: 'Se destaca por ser Persuasivo, cualidad fundamental para construir confianza, comunicar el valor del producto y cerrar ventas de forma exitosa, logrando los objetivos de ingreso.', image: imgJoan },
    { id: 5, name: 'Kaory Parra', role: 'Se destaca por su Organización, crucial para coordinar los procesos de trabajo de manera eficiente, asegurando el cumplimiento de plazos y el estándar de calidad del producto.', image: imgKaory },
    { id: 6, name: 'Nicole Daza', role: 'Se destaca por su Liderazgo, cualidad clave para establecer la dirección estratégica, motivar a los equipos y tomar las decisiones críticas que guían a la empresa hacia el éxito.', image: imgNicole },
    { id: 7, name: 'Valeria Ossa', role: 'Se destaca por su Empatía, necesaria para comprender y apoyar al personal, mejorando el clima laboral, resolviendo conflictos y asegurando el bienestar del talento humano.', image: imgValeria },
];

// --- Componente de Login ---
const LoginScreen = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Obtener credenciales de localStorage o usar las por defecto
    const getCredentials = () => {
        const storedCreds = localStorage.getItem('auriLektoCreds');
        if (storedCreds) {
            return JSON.parse(storedCreds);
        }
        // Si no hay nada, se usan las de por defecto y se guardan
        const defaultCreds = { username: 'admin', password: 'admin123' };
        localStorage.setItem('auriLektoCreds', JSON.stringify(defaultCreds));
        return defaultCreds;
    };

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const creds = getCredentials();
        if (username === creds.username && password === creds.password) {
            setError('');
            onLoginSuccess();
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    // Efecto para inicializar las credenciales si no existen
    useEffect(() => {
        if (!localStorage.getItem('auriLektoCreds')) {
            const defaultCreds = { username: 'admin', password: 'admin123' };
            localStorage.setItem('auriLektoCreds', JSON.stringify(defaultCreds));
        }
    }, []);

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <div className="header-logo" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                    <img src={logoAuriLekto} alt="AuriLekto Logo" />
                    <h2>AuriLekto Login</h2>
                </div>
                <div className="login-group">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="login-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="login-error">{error}</p>}
                <button type="submit" className="login-button">Ingresar</button>
            </form>
        </div>
    );
};

// --- Componente de Modal de Configuración ---
const SettingsModal = ({ onClose }: { onClose: () => void }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const storedCreds = localStorage.getItem('auriLektoCreds');
        if (!storedCreds) {
            setError("Error: No se encontraron credenciales.");
            return;
        }

        const creds = JSON.parse(storedCreds);

        if (currentPassword !== creds.password) {
            setError("La contraseña actual es incorrecta.");
            return;
        }

        if (newPassword.length < 6) {
            setError("La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Las nuevas contraseñas no coinciden.");
            return;
        }

        const newCreds = { ...creds, password: newPassword };
        localStorage.setItem('auriLektoCreds', JSON.stringify(newCreds));
        setSuccess("¡Contraseña actualizada con éxito!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button"><FiX /></button>
                <h2>Cambiar Contraseña</h2>
                <form onSubmit={handleChangePassword}>
                    <div className="login-group">
                        <label htmlFor="currentPassword">Contraseña Actual</label>
                        <input type="password" id="currentPassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                    </div>
                    <div className="login-group">
                        <label htmlFor="newPassword">Nueva Contraseña</label>
                        <input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="login-group">
                        <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    {error && <p className="login-error">{error}</p>}
                    {success && <p className="login-success">{success}</p>}
                    <button type="submit" className="login-button">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};


// --- Componente Principal ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeFilter, setActiveFilter] = useState<SectionFilter>('welcome');
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // ... (resto de los estados)
  const [message, setMessage] = useState('Tu Mensaje Creativo');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(5);
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [textShadow, setTextShadow] = useState(true);
  const [shadowColor, setShadowColor] = useState('#3170cfff');
  const [shadowBlur, setShadowBlur] = useState(10);
  const [bgColor, setBgColor] = useState('#1B263B');
  const [gradient, setGradient] = useState(true);
  const [gradientColor2, setGradientColor2] = useState('#0D1B2A');
  const [gradientAngle, setGradientAngle] = useState(145);
  const [bgType, setBgType] = useState<'gradient' | 'image'>('gradient'); // 'gradient' o 'image'
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [marquee, setMarquee] = useState(true);
  const [marqueeSpeed, setMarqueeSpeed] = useState(20);
  const [marqueeDirection, setMarqueeDirection] = useState('normal');
  const previewRef = useRef<HTMLDivElement>(null);

  // State for Presentation Mode
  const [duration, setDuration] = useState(300); // Default to 5 minutes (300 seconds)
  const [isPresentationActive, setIsPresentationActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const presentationIntervalRef = useRef<number | null>(null);
  const [applyButtonText, setApplyButtonText] = useState('Aplicar Cambios');
  const speechIntervalRef = useRef<number | null>(null);


  const handleEmailClick = () => {
    const email = 'aurilekto@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setShowEmail(true);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowEmail(false);
      }, 2000);
    });
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && message) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(message);
        const voices = window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
        if (spanishVoice) {
            utterance.voice = spanishVoice;
        }
        utterance.pitch = 1;
        utterance.rate = 0.9;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('La síntesis de voz no es soportada o no hay mensaje.');
    }
  };

  const cleanupIntervals = () => {
    if (presentationIntervalRef.current) {
        clearInterval(presentationIntervalRef.current);
        presentationIntervalRef.current = null;
    }
    if (speechIntervalRef.current) {
        clearInterval(speechIntervalRef.current);
        speechIntervalRef.current = null;
    }
    window.speechSynthesis.cancel();
  };

  const startPresentation = () => {
    cleanupIntervals();
    setIsPresentationActive(true);
    setRemainingTime(duration);
    handleSpeak();

    if (duration !== Infinity) {
        presentationIntervalRef.current = window.setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 1) {
                    cleanupIntervals();
                    setIsPresentationActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    speechIntervalRef.current = window.setInterval(() => {
        handleSpeak();
    }, 20000);
  };

  const stopPresentation = () => {
      cleanupIntervals();
      setIsPresentationActive(false);
  };

  const togglePresentation = () => {
    if (isPresentationActive) {
        stopPresentation();
    } else {
        startPresentation();
    }
  };

  useEffect(() => {
    return cleanupIntervals;
  }, []);

  // --- Sincronización con Firestore ---
  const db = getFirestore();
  const styleDocRef = doc(db, "settings", "messageStyle");

  // Efecto para LEER desde Firestore en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(styleDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMessage(data.text || 'Tu Mensaje Creativo');
        setTextColor(data.textColor || '#FFFFFF');
        setFontSize(data.fontSize || 5);
        setFontFamily(data.fontFamily || 'Outfit');
        setTextShadow(data.textShadowEnabled ?? true);
        setShadowColor(data.shadowColor || '#3170cfff');
        setShadowBlur(data.shadowBlur || 10);
        setBgColor(data.bgColor1 || '#1B263B');
        setGradient(data.gradientEnabled ?? true);
        setGradientColor2(data.bgColor2 || '#0D1B2A');
        setGradientAngle(data.gradientAngle || 145);
        setBgType(data.bgType || 'gradient');
        setBgImage(data.bgImage || null);
        setMarquee(data.animationEnabled ?? true);
        setMarqueeSpeed(data.animationSpeed || 20);
        setMarqueeDirection(data.animationDirection || 'normal');
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Efecto para ESCRIBIR en Firestore cuando el estado local cambia
  const handleApplyChanges = async () => {
    setApplyButtonText('Aplicando...');
    const styleData = {
        text: message, 
        textColor, 
        fontSize, 
        fontFamily, 
        textShadowEnabled: textShadow, 
        shadowColor, shadowBlur, 
        bgColor1: bgColor, 
        gradientEnabled: gradient, 
        bgColor2: gradientColor2, 
        gradientAngle, 
        bgType, bgImage,
        animationEnabled: marquee, 
        animationSpeed: marqueeSpeed, 
        animationDirection: marqueeDirection };
    
    try {
      await setDoc(styleDocRef, styleData);
      setApplyButtonText('¡Aplicado!');
      setTimeout(() => {
        setApplyButtonText('Aplicar Cambios');
      }, 2000);
    } catch (error) {
      console.error("Error al aplicar cambios: ", error);
      setApplyButtonText('Error al aplicar');
      setTimeout(() => {
        setApplyButtonText('Aplicar Cambios');
      }, 3000);
    }
  };

  const navItems = [
    { id: 'welcome', title: 'Bienvenida' },
    { id: 'designer', title: 'Diseñar Mensaje' },
    { id: 'about', title: 'Quiénes Somos' },
    { id: 'contact', title: 'Contáctanos' },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const isSectionVisible = (id: SectionFilter) => activeFilter === id;

  const messageStyle: CSSProperties = useMemo(() => ({
    color: textColor,
    fontSize: `${fontSize}rem`,
    fontFamily: `'${fontFamily}', sans-serif`,
    textShadow: textShadow ? `0 0 ${shadowBlur}px ${shadowColor}` : 'none',
    animation: marquee ? `marquee ${marqueeSpeed}s linear infinite ${marqueeDirection}` : 'none',
  }), [textColor, fontSize, fontFamily, textShadow, shadowColor, shadowBlur, marquee, marqueeSpeed, marqueeDirection]);

  const previewStyle: CSSProperties = useMemo(() => ({
    background: bgType === 'gradient'
        ? (gradient ? `linear-gradient(${gradientAngle}deg, ${bgColor}, ${gradientColor2})` : bgColor)
        : 'transparent',
    backgroundImage: bgType === 'image' && bgImage ? `url(${bgImage})` : 'none',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }), [bgType, bgImage, gradient, gradientAngle, bgColor, gradientColor2]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setBgImage(reader.result as string);
            setBgType('image');
        };
        reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleEnterFullscreen = () => {
    previewRef.current?.requestFullscreen();
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-container">
        <header className="app-header">
            <div className="header-left">
                <div className="header-logo">
                    <img src={logoAuriLekto} alt="AuriLekto Logo" />
                </div>
            </div>
            <h1 className="header-title">AuriLekto</h1>
            <div className="header-right">
                <button className="logout-button" onClick={() => setIsSettingsModalOpen(true)} title="Configuración">
                    Configuración
                    <FiSettings style={{ marginLeft: '8px' }}/>
                </button>
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                    <FiLogOut />
                </button>
            </div>
        </header>

      {/* Estilos para el efecto hover luminoso */}
      <style>{`
        .logout-button:hover,
        .nav-item:hover,
        .segmented-control button:hover,
        .presentation-button:hover,
        .apply-changes-button:hover,
        .fullscreen-button:hover,
        .speak-button:hover,
        .social-link:hover,
        .modal-close-button:hover,
        .login-button:hover {
          transition: all 0.3s ease;
          box-shadow: 0 0 12px 3px rgba(0, 221, 255, 0.6);
          transform: translateY(-2px);
        }
      `}</style>

      <nav className="navbar">
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${activeFilter === item.id ? 'active' : ''}`} onClick={() => setActiveFilter(item.id as SectionFilter)}>
            {item.title}
          </button>
        ))}
      </nav>

      {isSettingsModalOpen && <SettingsModal onClose={() => setIsSettingsModalOpen(false)} />}

      <main>
        <section id="welcome" className={`section ${isSectionVisible('welcome') ? 'visible' : ''}`}>
          <h2>Te damos la bienvenida a AuriLekto</h2>
          <p className='welcome-text'>Aquí podrás dar vida a tus mensajes. Utiliza nuestro diseñador para crear un texto visualmente impactante y prepáralo para ser mostrado en cualquier pantalla. Navega a la sección "Diseñar Mensaje" para comenzar tu creación.</p>
          <video src={auriLektoVideo} className="welcome-video" autoPlay muted loop controls />
        </section>

        <section id="designer" className={`section ${isSectionVisible('designer') ? 'visible' : ''}`}>
          <h2>Diseñador de Mensaje</h2>
          <div className="customizer-grid">
            <div className="controls-panel">
                {/* Controles del diseñador... */}
                <div className='control-group'>
                    <label>Texto del Mensaje</label>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className='control-group'>
                    <label>Tipografía</label>
                    <select className='font-select' value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                        <option value="Outfit">Outfit (Sans-Serif)</option>
                        <option value="Lora">Lora (Serif)</option>
                        <option value="Roboto Mono">Roboto Mono (Monospace)</option>
                        <option value="Lobster">Lobster (Decorativa)</option>
                    </select>
                </div>
                <div className="control-group">
                    <label>Tamaño de Fuente ({fontSize}rem)</label>
                    <input type="range" min="1" max="20" step="0.5" value={fontSize} onChange={(e) => setFontSize(parseFloat(e.target.value))} />
                </div>
                <div className="control-group">
                    <label>Color de Texto</label>
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                </div>
                <div className='control-group-divider'></div>
                <div className='control-group toggle-group'><label>Sombra de Texto / Efecto Neón</label><label className="switch"><input type="checkbox" checked={textShadow} onChange={(e) => setTextShadow(e.target.checked)} /><span className="slider round"></span></label></div>
                {textShadow && <div className='animation-controls fadeIn-animation'><div className='control-row'><div className="control-group"><label>Color Sombra</label><input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} /></div><div className="control-group"><label>Desenfoque ({shadowBlur}px)</label><input type="range" min="0" max="50" value={shadowBlur} onChange={(e) => setShadowBlur(parseInt(e.target.value))} /></div></div></div>}
                <div className='control-group-divider'></div>
                <div className="control-group">
                    <label>Tipo de Fondo</label>
                    <div className='segmented-control'>
                        <button className={bgType === 'gradient' ? 'active' : ''} onClick={() => setBgType('gradient')}>Color / Gradiente</button>
                        <button className={bgType === 'image' ? 'active' : ''} onClick={() => fileInputRef.current?.click()}>Imagen</button>
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className='control-group toggle-group'><label>Fondo con Gradiente</label><label className="switch"><input type="checkbox" checked={gradient} onChange={(e) => setGradient(e.target.checked)} /><span className="slider round"></span></label></div>
                <div className='animation-controls'><div className='control-row'><div className="control-group"><label>{gradient ? 'Color 1' : 'Color de Fondo'}</label><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /></div>{gradient && <div className="control-group fadeIn-animation"><label>Color 2</label><input type="color" value={gradientColor2} onChange={(e) => setGradientColor2(e.target.value)} /></div>}</div>{gradient && <div className="control-group fadeIn-animation"><label>Ángulo del Gradiente ({gradientAngle}°)</label><input type="range" min="0" max="360" value={gradientAngle} onChange={(e) => setGradientAngle(parseInt(e.target.value))} /></div>}</div>
                <div className='control-group-divider'></div>
                <div className='control-group toggle-group'><label>Animación Deslizante</label><label className="switch"><input type="checkbox" checked={marquee} onChange={(e) => setMarquee(e.target.checked)} /><span className="slider round"></span></label></div>
                {marquee && <div className='animation-controls fadeIn-animation'><div className="control-group"><label>Velocidad ({marqueeSpeed}s)</label><input type="range" min="5" max="60" value={marqueeSpeed} onChange={(e) => setMarqueeSpeed(parseInt(e.target.value))} /></div><div className="control-group"><label>Dirección</label><div className='segmented-control'><button className={marqueeDirection === 'normal' ? 'active' : ''} onClick={() => setMarqueeDirection('normal')}>Derecha a Izquierda</button><button className={marqueeDirection === 'reverse' ? 'active' : ''} onClick={() => setMarqueeDirection('reverse')}>Izquierda a Derecha</button></div></div></div>}
                <div className='control-group-divider'></div>
                <div className='control-group'>
                    <label>Modo Presentación</label>
                    <div className="control-row">
                        <select 
                            className='font-select' 
                            value={duration} 
                            onChange={e => setDuration(Number(e.target.value))} 
                            disabled={isPresentationActive}
                        >
                            <option value={300}>5 minutos</option>
                            <option value={600}>10 minutos</option>
                            <option value={900}>15 minutos</option>
                            <option value={1200}>20 minutos</option>
                            <option value={Infinity}>Permanente</option>
                        </select>
                        <button onClick={togglePresentation} className={`presentation-button ${isPresentationActive ? 'active' : ''}`}>
                            {isPresentationActive ? `Detener (${remainingTime === Infinity ? '∞' : `${remainingTime}s`})` : 'Iniciar'}
                        </button>
                    </div>
                </div>
                <div className='control-group-divider'></div>
                <div className="control-group">
                    <button onClick={handleApplyChanges} className="apply-changes-button" disabled={applyButtonText !== 'Aplicar Cambios' && applyButtonText !== 'Error al aplicar'}>{applyButtonText}</button>
                </div>
            </div>
            <div className="preview-panel">
              <h3>Previsualización</h3>
              <div ref={previewRef} className="preview-area" style={previewStyle}>
                <div className='marquee-container'><p className="preview-text" style={messageStyle}>{message}</p></div>
              </div>
              <div className="preview-buttons">
                <button className="fullscreen-button" onClick={handleEnterFullscreen}>Ver en Pantalla Completa</button>
                <button className="speak-button" onClick={handleSpeak}>
                    <FiVolume2 /> Leer en voz alta
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className={`section ${isSectionVisible('about') ? 'visible' : ''}`}>
          <h2>Quiénes Somos</h2>
          <p className='welcome-text'>Somos un equipo de jóvenes emprendedores del Colegio Parroquial San Francisco Javier de Cali. Como proyecto final de grado, creamos esta microempresa con el objetivo de aplicar y demostrar los conocimientos adquiridos en nuestra formación académica, transformando una idea de negocio en una realidad sostenible y funcional. Nuestra iniciativa representa la culminación de un esfuerzo dedicado a la innovación y la gestión empresarial.</p>
          <div className='carousel-container'>
            <Swiper
                className='team-swiper'
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            >
                {teamData.map(member => (
                    <SwiperSlide key={member.id}>
                        <div className="team-member-card" style={{ backgroundImage: `url(${member.image})` }}>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-prev"><FiChevronLeft /></div>
            <div className="swiper-button-next"><FiChevronRight /></div>
          </div>
        </section>

        <section id="contact" className={`section ${isSectionVisible('contact') ? 'visible' : ''}`}>
            <h2>Contáctanos</h2>
            <p className='welcome-text'>Puedes encontrarnos en nuestras redes sociales o enviarnos un mensaje.</p>
            <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=61577114746642" target="_blank" rel="noopener noreferrer" className="social-link facebook"><FaFacebook /></a>
                <a href="https://www.instagram.com/auri_lekto/" target="_blank" rel="noopener noreferrer" className="social-link instagram"><FaInstagram /></a>
                <a href="https://wa.me/573154719096" target="_blank" rel="noopener noreferrer" className="social-link whatsapp"><FaWhatsapp /></a>
                <div className="email-container">
                    <button onClick={handleEmailClick} className="social-link email">
                        <FaEnvelope />
                    </button>
                    {showEmail && (
                        <span className="email-address fadeIn-animation">
                            aurilekto@gmail.com {copied && "¡Copiado!"}
                        </span>
                    )}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}

export default App;