import React, { useState, useMemo, useRef, CSSProperties, FormEvent, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiLogOut, FiVolume2 } from 'react-icons/fi';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';

import { app } from "./firebaseConfig.ts";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            setError('');
            onLoginSuccess();
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <div className="header-logo" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                    <img src={logoAuriLekto} alt="AuriLekto Logo" />
                    <h2>AuriLekto Login</h2>
                </div>
                <div className="login-group">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="login-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="login-error">{error}</p>}
                <button type="submit" className="login-button">Ingresar</button>
            </form>
        </div>
    );
};


// --- Componente Principal ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeFilter, setActiveFilter] = useState<SectionFilter>('welcome');
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

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
  const [marquee, setMarquee] = useState(true);
  const [marqueeSpeed, setMarqueeSpeed] = useState(20);
  const [marqueeDirection, setMarqueeDirection] = useState('normal');
  const previewRef = useRef<HTMLDivElement>(null);

  // State for Presentation Mode
  const [duration, setDuration] = useState(300); // Default to 5 minutes (300 seconds)
  const [isPresentationActive, setIsPresentationActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const presentationIntervalRef = useRef<number | null>(null);
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
    background: gradient
      ? `linear-gradient(${gradientAngle}deg, ${bgColor}, ${gradientColor2})`
      : bgColor,
  }), [gradient, gradientAngle, bgColor, gradientColor2]);

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
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                    <FiLogOut />
                </button>
            </div>
        </header>

      <nav className="navbar">
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${activeFilter === item.id ? 'active' : ''}`} onClick={() => setActiveFilter(item.id as SectionFilter)}>
            {item.title}
          </button>
        ))}
      </nav>

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