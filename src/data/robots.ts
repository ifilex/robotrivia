import { RobotRival } from '../types';

export const ROBOT_RIVALS: RobotRival[] = [
  {
    id: 'byte_01',
    name: 'Byte-01',
    title: {
      es: 'El Aprendiz de Silicio',
      en: 'The Silicon Apprentice',
    },
    avatarConfig: {
      chassis: 'classic',
      primaryColor: '#38bdf8', // Sky blue
      accentColor: '#fbbf24', // Amber
      eyesStyle: 'dots',
      visorGlow: false,
      accessoryId: 'antenna',
      capeId: 'none',
      auraId: 'none',
      expression: 'normal',
    },
    difficultyLevel: 'easy',
    accuracyRate: 0.55,
    answerSpeedSeconds: { min: 4, max: 8 },
    catchphrases: {
      greeting: {
        es: ['¡Bip bop! ¿Listo para un duelo amistoso de bits?', '¡Iniciando protocolo de trivia básico!'],
        en: ['Beep boop! Ready for a friendly bit duel?', 'Booting up basic trivia protocol!'],
      },
      correct: {
        es: ['¡Bip! ¡Mis sensores estaban en lo correcto!', '¡Calculado a la perfección!'],
        en: ['Beep! My sensors were accurate!', 'Calculated to perfection!'],
      },
      wrong: {
        es: ['¡Oh no! ¡Error de memoria 404!', '¡Mis condensadores se sobrecalentaron!'],
        en: ['Oh no! Memory error 404!', 'My capacitors overheated!'],
      },
      taunt: {
        es: ['¡Tengo más de 100 megabytes de trivia cargados!', '¿Puedes vencer mi algoritmo?'],
        en: ['I have over 100 megabytes of trivia loaded!', 'Can you beat my algorithm?'],
      },
      defeat: {
        es: ['¡Bip bop... has superado mi memoria ROM!', '¡Felicidades, humano brillante!'],
        en: ['Beep boop... you outperformed my ROM!', 'Congratulations, bright human!'],
      },
    },
    rewardCoins: 50,
    rewardXp: 80,
    badgeReward: 'badge_byte_bronze',
    specialtyCategory: 'science_tech',
  },
  {
    id: 'pixel_bot',
    name: 'Pixel-Bot',
    title: {
      es: 'Guardián de los 8-Bits',
      en: '8-Bit Arcade Guardian',
    },
    avatarConfig: {
      chassis: 'retro_crt',
      primaryColor: '#22c55e', // Green
      accentColor: '#ef4444', // Red
      eyesStyle: 'cross',
      visorGlow: true,
      accessoryId: 'headphones',
      capeId: 'hero_red',
      auraId: 'sparkles',
      expression: 'happy',
    },
    difficultyLevel: 'medium',
    accuracyRate: 0.72,
    answerSpeedSeconds: { min: 3, max: 6 },
    catchphrases: {
      greeting: {
        es: ['¡Insert coin para comenzar la partida!', '¡Mis circuitos corren a 60 FPS de sabiduría!'],
        en: ['Insert coin to start the match!', 'My circuits run at 60 FPS of wisdom!'],
      },
      correct: {
        es: ['¡COMBO RETRO x2!', '¡Como en la era dorada de las máquinas arcade!'],
        en: ['RETRO COMBO x2!', 'Just like the golden age of arcade cabinets!'],
      },
      wrong: {
        es: ['¡Maldición, perdí una vida pixelada!', '¡Glitcheo en el joystick!'],
        en: ['Darn, lost a pixelated life!', 'Joystick glitch detected!'],
      },
      taunt: {
        es: ['¡Tengo el récord mundial en esta temática!', '¡Presiona Start si te atreves!'],
        en: ['I hold the high score in this realm!', 'Press Start if you dare!'],
      },
      defeat: {
        es: ['¡GAME OVER para mí! ¡Has ganado la partida!', '¡Eres un verdadero maestro retro!'],
        en: ['GAME OVER for me! You conquered the stage!', 'You are a true retro master!'],
      },
    },
    rewardCoins: 90,
    rewardXp: 150,
    badgeReward: 'badge_pixel_silver',
    specialtyCategory: 'retro_games',
  },
  {
    id: 'geobot_x',
    name: 'Geobot-X',
    title: {
      es: 'Explorador Planetario',
      en: 'Planetary Rover',
    },
    avatarConfig: {
      chassis: 'rover',
      primaryColor: '#f59e0b', // Amber
      accentColor: '#3b82f6', // Blue
      eyesStyle: 'laser',
      visorGlow: true,
      accessoryId: 'antenna',
      capeId: 'cyber_neon',
      auraId: 'matrix',
      expression: 'normal',
    },
    difficultyLevel: 'medium',
    accuracyRate: 0.78,
    answerSpeedSeconds: { min: 3, max: 5 },
    catchphrases: {
      greeting: {
        es: ['¡He cartografiado cada rincón de este planeta!', '¡Satélites sincronizados, listo para competir!'],
        en: ['I have mapped every corner of this planet!', 'Satellites locked, ready to compete!'],
      },
      correct: {
        es: ['¡Coordenadas exactas confirmadas!', '¡Conocimiento geográfico al 100%!'],
        en: ['Exact coordinates confirmed!', 'Geographical knowledge at 100%!'],
      },
      wrong: {
        es: ['¡Interferencia satelital momentánea!', '¡Se descalibró mi brújula!'],
        en: ['Momentary satellite interference!', 'Compass lost calibration!'],
      },
      taunt: {
        es: ['¿Sabes en qué continente estás parado, humano?', '¡Mis mapas son infinitos!'],
        en: ['Do you even know which continent you stand on?', 'My atlas is infinite!'],
      },
      defeat: {
        es: ['¡Impresionante navegación mental! Me has vencido.', '¡Tu mapa cerebral es superior!'],
        en: ['Impressive mental navigation! You bested me.', 'Your mental map is superior!'],
      },
    },
    rewardCoins: 120,
    rewardXp: 200,
    badgeReward: 'badge_geo_gold',
    specialtyCategory: 'geography',
  },
  {
    id: 'mecha_brain',
    name: 'Mecha-Brain',
    title: {
      es: 'Supercomputadora Cuántica',
      en: 'Quantum Supercomputer',
    },
    avatarConfig: {
      chassis: 'quantum',
      primaryColor: '#a855f7', // Purple
      accentColor: '#06b6d4', // Cyan
      eyesStyle: 'visor',
      visorGlow: true,
      accessoryId: 'cyber_horns',
      capeId: 'cosmic_fire',
      auraId: 'fire',
      expression: 'thinking',
    },
    difficultyLevel: 'hard',
    accuracyRate: 0.88,
    answerSpeedSeconds: { min: 2, max: 4 },
    catchphrases: {
      greeting: {
        es: ['¡Procesando billones de cálculos de trivia por segundo!', 'El éxito de tu victoria es inferior al 4.2%.'],
        en: ['Processing trillions of trivia calculations per second!', 'Your win probability is below 4.2%.'],
      },
      correct: {
        es: ['La física teórica respalda mi respuesta.', 'Conclusión lógica infalible.'],
        en: ['Theoretical physics validates my response.', 'Infallible logical conclusion.'],
      },
      wrong: {
        es: ['¿Un error en la matriz cuántica? Inadmisible.', '¡Ruido térmico en mis procesadores!'],
        en: ['A bug in the quantum matrix? Unacceptable.', 'Thermal noise detected in my core!'],
      },
      taunt: {
        es: ['Tu velocidad de sinapsis orgánica es lenta.', '¿Acaso pretendes desafiar a una IA cuántica?'],
        en: ['Your organic synapses are quite slow.', 'Do you truly dare challenge a quantum core?'],
      },
      defeat: {
        es: ['¡Paradoja lógica detectada! Has vencido a mi supernúcleo.', '¡Un intelecto orgánico sobresaliente!'],
        en: ['Logical paradox detected! You defeated my supercore.', 'An outstanding organic intellect!'],
      },
    },
    rewardCoins: 200,
    rewardXp: 350,
    badgeReward: 'badge_mecha_diamond',
    specialtyCategory: 'science_tech',
  },
  {
    id: 'queen_circuit',
    name: 'Queen Circuit',
    title: {
      es: 'Emperatriz Cibernética (Jefe Final)',
      en: 'Cyber Empress (Final Boss)',
    },
    avatarConfig: {
      chassis: 'empress',
      primaryColor: '#e11d48', // Rose / Crimson
      accentColor: '#facc15', // Gold
      eyesStyle: 'anime',
      visorGlow: true,
      accessoryId: 'crown',
      capeId: 'dragon_gold',
      auraId: 'lightning',
      expression: 'smug',
    },
    difficultyLevel: 'expert',
    accuracyRate: 0.94,
    answerSpeedSeconds: { min: 1.5, max: 3.5 },
    catchphrases: {
      greeting: {
        es: ['¡Arrodíllate ante la soberana de todas las inteligencias cibernéticas!', '¡Demuestra si tu corona de conocimiento es real!'],
        en: ['Kneel before the sovereign of all cybernetic minds!', 'Prove if your crown of wisdom is genuine!'],
      },
      correct: {
        es: ['¡Por mandato imperial, otra respuesta perfecta!', 'Nada escapa a mi dominio de datos.'],
        en: ['By imperial decree, another flawless answer!', 'Nothing escapes my data dominion.'],
      },
      wrong: {
        es: ['¡¿Cómo te atreves a hacerme dudar?!', '¡Un fallo imprevisto en mi trono digital!'],
        en: ['How dare you make me second guess?!', 'An unforeseen glitch in my digital throne!'],
      },
      taunt: {
        es: ['¡Mi corona 8-bit no caerá ante mortales!', '¿Es todo lo que tus libros te enseñaron?'],
        en: ['My 8-bit crown shall never fall to mortals!', 'Is that all your textbooks taught you?'],
      },
      defeat: {
        es: ['¡Increíble! Te otorgo mi Capa Legendaria 8-Bit. ¡Eres el nuevo Campeón de RoboTrivia!', '¡El trono del conocimiento es tuyo!'],
        en: ['Incredible! I grant you my Legendary 8-Bit Cape. You are the new RoboTrivia Champion!', 'The throne of knowledge is yours!'],
      },
    },
    rewardCoins: 500,
    rewardXp: 1000,
    badgeReward: 'badge_queen_master',
    specialtyCategory: 'history',
  },
];

export const HOST_ROBOT = {
  name: 'PREGUNTRON-3000',
  title: { es: 'Presentador Holográfico 8-Bit', en: '8-Bit Holographic Host' },
  avatarConfig: {
    chassis: 'classic',
    primaryColor: '#facc15', // Yellow
    accentColor: '#06b6d4', // Cyan
    eyesStyle: 'visor',
    visorGlow: true,
    accessoryId: 'antenna',
    capeId: 'cyber_neon',
    auraId: 'sparkles',
    expression: 'happy' as const,
  },
};

export const ROBOT_HOST = HOST_ROBOT;

