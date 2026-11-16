/* =========================================================
   TUS DATOS — edita SOLO este archivo para personalizar la web
   ========================================================= */
const PERFIL = {
  nombre: "José Ramírez",
  rol: "Estudiante de Ingeniería de Software",
  ubicacion: "",            // ej: "Bogotá, Colombia"
  email: "jr5716413@gmail.com",
  github: "https://github.com/jbican464-oss",
  linkedin: "",             // ej: "https://linkedin.com/in/tu-usuario"
  foto: "foto.jpg",         // foto de la portada
  universidad: "Universidad de Cartagena",
  disponible: true,

  frases: [
    "construye apps que ayudan a personas.",
    "lleva ideas del prototipo al teléfono.",
    "programa en JavaScript, React y React Native.",
  ],

  resumen:
    "Me gusta llevar una idea de principio a fin: entender el problema, diseñarla, programarla, " +
    "probarla y dejarla documentada. Lo que más disfruto es construir cosas que le sirvan a alguien de verdad.",

  lenguajePrincipal: "JavaScript",

  lenguajes: [
    { nombre: "JavaScript", nivel: 85, color: "#f7df1e" },
    { nombre: "React / JSX", nivel: 80, color: "#61dafb" },
    { nombre: "React Native", nivel: 70, color: "#61dafb" },
    { nombre: "HTML / CSS", nivel: 80, color: "#e34f26" },
    { nombre: "Java (Android / Gradle)", nivel: 45, color: "#e76f00" },
  ],

  herramientas: ["React 19", "Vite", "Expo", "Node.js", "Capacitor", "Bluetooth BLE", "PWA", "Vitest", "Git", "GitHub Actions", "Vercel", "Android SDK"],

  // Cinta animada de tecnologías (Marquee). [nombre, logo de simpleicons.org]
  cintaStack: [
    [["JavaScript", "javascript"], ["React", "react"], ["React Native", "react"], ["HTML5", "html5"],
     ["CSS3", "css3"], ["Java", "openjdk"], ["Node.js", "nodedotjs"], ["Vite", "vite"], ["Expo", "expo"]],
    [["Capacitor", "capacitor"], ["Bluetooth BLE", "bluetooth"], ["PWA", "pwa"], ["Vitest", "vitest"],
     ["Git", "git"], ["GitHub Actions", "githubactions"], ["Vercel", "vercel"], ["Android", "android"],
     ["Gradle", "gradle"], ["pnpm", "pnpm"]],
  ],

  estudios: [
    {
      titulo: "Ingeniería de Software",
      institucion: "Universidad de Cartagena",
      periodo: "En curso",
      descripcion: "Programación, estructuras de datos, bases de datos y desarrollo de software.",
    },
  ],

  certificaciones: [],
  experiencia: [],

  // Proyecto principal: aparece con sección propia y la app funcionando dentro de la página
  destacado: {
    nombre: "NeuroFisk",
    eslogan: "Detección temprana de crisis epilépticas con un reloj inteligente",
    descripcion:
      "App que estima el riesgo de una posible crisis epiléptica a partir de señales en vivo " +
      "(frecuencia cardíaca, movimiento, fatiga y aura) y avisa al contacto de emergencia con un solo toque. " +
      "Tiene versión web instalable (PWA) y app Android que lee el pulso real de un reloj por Bluetooth.",
    demo: "neurofisk/",
    codigo: "https://github.com/jbican464-oss/NeuroFisk",
    stack: ["React 19", "Vite", "React Native + Expo", "Bluetooth BLE", "Capacitor", "PWA", "Vitest", "Vercel"],
    cifras: [
      ["2", "apps (web + Android)"],
      ["96", "tests automáticos"],
      ["4", "señales en vivo"],
      ["11", "pantallas"],
    ],
    funciones: [
      ["💓", "Pulso real por Bluetooth", "Lee la frecuencia cardíaca de un reloj (servicio BLE 0x180D). Probado en un TECNO Watch 3."],
      ["🧠", "Modelo de riesgo explicable", "Pondera pulso, movimiento, fatiga y aura con una basal personal: cada decisión es trazable."],
      ["🚨", "Alertas y SOS", "Alarma sonora, notificación y aviso al contacto por WhatsApp, llamada y SMS con la ubicación."],
      ["💊", "Medicación y diario", "Recordatorios que suenan con la app cerrada, diario de crisis, ficha médica e informe."],
      ["🫁", "Modo calma", "Ejercicios de respiración y un modo acompañante para quien cuida al paciente."],
      ["📱", "Multiplataforma", "La misma lógica compartida para la PWA, el APK web (Capacitor) y la app nativa (Expo)."],
    ],
    formula:
      "riesgo = 0.30 · pulso + 0.20 · movimiento\n       + 0.20 · fatiga + 0.30 · aura\n\n0–34   Bajo\n35–64  Moderado\n≥65    Alto",
    estado: [
      ["Pulso real por Bluetooth", true],
      ["Cálculo de riesgo en vivo", true],
      ["Alarma y notificación de riesgo alto", true],
      ["Aviso automático al contacto", true],
      ["Validación con usuarios", false],
    ],
    aviso: "Proyecto académico: es un prototipo, no un dispositivo médico certificado.",
  },

  proyectos: [
    {
      titulo: "NeuroFisk — App web (PWA)",
      descripcion: "Monitoreo simulado, modelo de riesgo, guías, medicación, diario y SOS. Instalable desde el navegador.",
      tecnologias: ["React", "Vite", "PWA"],
      demo: "neurofisk/",
      codigo: "https://github.com/jbican464-oss/NeuroFisk",
      destacado: true,
    },
    {
      titulo: "NeuroFisk — App Android",
      descripcion: "Lee el pulso real de un reloj por Bluetooth y el movimiento del acelerómetro del teléfono.",
      tecnologias: ["React Native", "Expo", "Bluetooth"],
      demo: "",
      codigo: "https://github.com/jbican464-oss/NeuroFisk/tree/main/mobile",
    },
    {
      titulo: "NeuroFisk — Servidor de alertas",
      descripcion: "Función serverless que avisa al contacto por WhatsApp, llamada y SMS sin que nadie pulse enviar.",
      tecnologias: ["Node.js", "Vercel"],
      demo: "",
      codigo: "https://github.com/jbican464-oss/NeuroFisk/tree/main/api",
    },
  ],

  idiomas: [
    { nombre: "Español", nivel: "Nativo" },
  ],
};
