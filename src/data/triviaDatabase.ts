import { CategoryId, Difficulty, TriviaQuestion } from '../types';
import { getCategoryMassiveQuestions, getAllMassiveQuestions } from './massiveTriviaBank';

export const INITIAL_QUESTIONS: TriviaQuestion[] = [
  // --- Retro Games ---
  {
    id: 'rg_01',
    category: 'retro_games',
    difficulty: 'easy',
    question: {
      es: '¿Cuál es el nombre del hermano de Mario en la saga de Nintendo?',
      en: 'What is the name of Mario’s brother in Nintendo games?',
    },
    options: {
      es: ['Luigi', 'Wario', 'Toad', 'Yoshi'],
      en: ['Luigi', 'Wario', 'Toad', 'Yoshi'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Luigi debutó en el juego arcade Mario Bros. en 1983.',
      en: 'Luigi debuted in the 1983 arcade game Mario Bros.',
    },
    tags: ['nintendo', 'mario'],
  },
  {
    id: 'rg_02',
    category: 'retro_games',
    difficulty: 'medium',
    question: {
      es: '¿En qué año fue lanzada la consola original Nintendo Entertainment System (NES) en Norteamérica?',
      en: 'In what year was the original NES console released in North America?',
    },
    options: {
      es: ['1985', '1983', '1989', '1991'],
      en: ['1985', '1983', '1989', '1991'],
    },
    correctIndex: 0,
    explanation: {
      es: 'La NES se lanzó como prueba en Nueva York en octubre de 1985.',
      en: 'The NES test launched in New York in October 1985.',
    },
    tags: ['nes', 'hardware'],
  },
  {
    id: 'rg_03',
    category: 'retro_games',
    difficulty: 'medium',
    question: {
      es: '¿Cuál es el legendario código Konami original introducido en Gradius?',
      en: 'What is the legendary original Konami Code first seen in Gradius?',
    },
    options: {
      es: [
        'Arriba, Arriba, Abajo, Abajo, Izq, Der, Izq, Der, B, A',
        'Arriba, Abajo, Izq, Der, A, B, A, B, Start',
        'Izq, Der, Izq, Der, Arriba, Abajo, A, B, Select',
        'B, A, B, A, Arriba, Arriba, Abajo, Abajo, Start',
      ],
      en: [
        'Up, Up, Down, Down, Left, Right, Left, Right, B, A',
        'Up, Down, Left, Right, A, B, A, B, Start',
        'Left, Right, Left, Right, Up, Down, A, B, Select',
        'B, A, B, A, Up, Up, Down, Down, Start',
      ],
    },
    correctIndex: 0,
    explanation: {
      es: 'Creado por Kazuhisa Hashimoto en 1986 para facilitar las pruebas.',
      en: 'Created by Kazuhisa Hashimoto in 1986 to make testing easier.',
    },
    tags: ['konami', 'code'],
  },
  {
    id: 'rg_04',
    category: 'retro_games',
    difficulty: 'hard',
    question: {
      es: '¿Cuál fue el primer videojuego arcade comercial de la historia?',
      en: 'What was the first commercial arcade video game in history?',
    },
    options: {
      es: ['Computer Space', 'Pong', 'Space Invaders', 'Asteroids'],
      en: ['Computer Space', 'Pong', 'Space Invaders', 'Asteroids'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Computer Space fue creado por Nolan Bushnell y Ted Dabney en 1971 antes de Pong.',
      en: 'Computer Space was made by Nolan Bushnell and Ted Dabney in 1971 before Pong.',
    },
    tags: ['arcade', 'history'],
  },
  {
    id: 'rg_05',
    category: 'retro_games',
    difficulty: 'easy',
    question: {
      es: '¿Cómo se llama el fantasma rojo en el clásico arcade Pac-Man?',
      en: 'What is the name of the red ghost in the classic arcade Pac-Man?',
    },
    options: {
      es: ['Blinky', 'Pinky', 'Inky', 'Clyde'],
      en: ['Blinky', 'Pinky', 'Inky', 'Clyde'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Blinky (rojo), Pinky (rosa), Inky (cian) y Clyde (naranja).',
      en: 'Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange).',
    },
    tags: ['pacman', 'namco'],
  },
  {
    id: 'rg_06',
    category: 'retro_games',
    difficulty: 'hard',
    question: {
      es: '¿Qué microprocesador de 8 bits impulsó tanto a la Game Boy original como a la consola ColecoVision?',
      en: 'What 8-bit architecture/CPU family powered the ColecoVision and was modified for Game Boy?',
    },
    options: {
      es: ['Zilog Z80', 'MOS 6502', 'Motorola 68000', 'Intel 8086'],
      en: ['Zilog Z80', 'MOS 6502', 'Motorola 68000', 'Intel 8086'],
    },
    correctIndex: 0,
    explanation: {
      es: 'La Game Boy usó una variante Sharp LR35902 basada en el Zilog Z80 y el 8080.',
      en: 'The Game Boy used a Sharp LR35902 core based on the Zilog Z80 and 8080.',
    },
    tags: ['hardware', 'chips'],
  },

  // --- Science & Tech ---
  {
    id: 'st_01',
    category: 'science_tech',
    difficulty: 'easy',
    question: {
      es: '¿Cuál es el elemento químico más abundante en el universo observable?',
      en: 'What is the most abundant chemical element in the observable universe?',
    },
    options: {
      es: ['Hidrógeno', 'Helio', 'Oxígeno', 'Carbono'],
      en: ['Hydrogen', 'Helium', 'Oxygen', 'Carbon'],
    },
    correctIndex: 0,
    explanation: {
      es: 'El hidrógeno constituye aproximadamente el 75% de la masa bariónica del universo.',
      en: 'Hydrogen makes up about 75% of the baryonic mass of the universe.',
    },
    tags: ['chemistry', 'space'],
  },
  {
    id: 'st_02',
    category: 'science_tech',
    difficulty: 'medium',
    question: {
      es: '¿Quién es considerada la primera programadora de computadoras de la historia?',
      en: 'Who is widely considered the world’s first computer programmer?',
    },
    options: {
      es: ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke'],
      en: ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Ada Lovelace escribió el primer algoritmo para la Máquina Analítica de Babbage en 1843.',
      en: 'Ada Lovelace wrote the first algorithm intended for Babbage’s Analytical Engine in 1843.',
    },
    tags: ['computing', 'pioneers'],
  },
  {
    id: 'st_03',
    category: 'science_tech',
    difficulty: 'hard',
    question: {
      es: '¿Qué partícula elemental transmite la fuerza nuclear fuerte uniendo los quarks?',
      en: 'Which elementary particle mediates the strong nuclear force binding quarks together?',
    },
    options: {
      es: ['Gluón', 'Fotón', 'Bosón W', 'Gravitón'],
      en: ['Gluon', 'Photon', 'W Boson', 'Graviton'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Los gluones actúan como el pegamento que une los quarks dentro de protones y neutrones.',
      en: 'Gluons act as the exchange particles for the strong force between quarks.',
    },
    tags: ['physics', 'quantum'],
  },
  {
    id: 'st_04',
    category: 'science_tech',
    difficulty: 'medium',
    question: {
      es: '¿Cuántos bits componen exactamente un solo Byte estándar?',
      en: 'How many bits make up a standard Byte?',
    },
    options: {
      es: ['8 bits', '4 bits', '16 bits', '32 bits'],
      en: ['8 bits', '4 bits', '16 bits', '32 bits'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Un byte está compuesto por 8 bits (un grupo de 4 bits se llama nibble).',
      en: 'A standard byte is composed of 8 bits (a 4-bit group is a nibble).',
    },
    tags: ['computing', 'units'],
  },
  {
    id: 'st_05',
    category: 'science_tech',
    difficulty: 'expert',
    question: {
      es: '¿Cuál es la velocidad de la luz en el vacío redondeada al número entero en m/s?',
      en: 'What is the speed of light in vacuum (c) in m/s?',
    },
    options: {
      es: ['299,792,458 m/s', '300,500,000 m/s', '150,000,000 m/s', '384,400,000 m/s'],
      en: ['299,792,458 m/s', '300,500,000 m/s', '150,000,000 m/s', '384,400,000 m/s'],
    },
    correctIndex: 0,
    explanation: {
      es: 'La constante c es exactamente 299,792,458 metros por segundo.',
      en: 'The constant c is exactly 299,792,458 meters per second.',
    },
    tags: ['physics', 'constants'],
  },

  // --- World History ---
  {
    id: 'hi_01',
    category: 'history',
    difficulty: 'easy',
    question: {
      es: '¿En qué año cayó el Muro de Berlín marcando el fin simbólico de la Guerra Fría?',
      en: 'In what year did the Berlin Wall fall, marking the symbolic end of the Cold War?',
    },
    options: {
      es: ['1989', '1991', '1985', '1975'],
      en: ['1989', '1991', '1985', '1975'],
    },
    correctIndex: 0,
    explanation: {
      es: 'El muro cayó el 9 de noviembre de 1989.',
      en: 'The wall fell on November 9, 1989.',
    },
    tags: ['modern', 'europe'],
  },
  {
    id: 'hi_02',
    category: 'history',
    difficulty: 'medium',
    question: {
      es: '¿Quién fue el primer Emperador del Imperio Romano?',
      en: 'Who was the first Emperor of the Roman Empire?',
    },
    options: {
      es: ['César Augusto (Octavio)', 'Julio César', 'Nerón', 'Trajano'],
      en: ['Caesar Augustus (Octavian)', 'Julius Caesar', 'Nero', 'Trajan'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Augusto asumió el poder como primer emperador en el 27 a.C.',
      en: 'Augustus reigned as the first Roman Emperor starting in 27 BC.',
    },
    tags: ['rome', 'ancient'],
  },
  {
    id: 'hi_03',
    category: 'history',
    difficulty: 'hard',
    question: {
      es: '¿Qué tratado puso fin formal a la Guerra de los Treinta Años en 1648?',
      en: 'Which peace treaty ended the Thirty Years’ War in 1648?',
    },
    options: {
      es: ['Paz de Westfalia', 'Tratado de Utrecht', 'Tratado de Versalles', 'Paz de Augsburgo'],
      en: ['Peace of Westphalia', 'Treaty of Utrecht', 'Treaty of Versailles', 'Peace of Augsburg'],
    },
    correctIndex: 0,
    explanation: {
      es: 'La Paz de Westfalia sentó las bases del concepto de soberanía nacional.',
      en: 'The Peace of Westphalia laid the foundation of modern national sovereignty.',
    },
    tags: ['treaties', 'europe'],
  },
  {
    id: 'hi_04',
    category: 'history',
    difficulty: 'easy',
    question: {
      es: '¿En qué año llegó Cristóbal Colón a América?',
      en: 'In which year did Christopher Columbus first arrive in the Americas?',
    },
    options: {
      es: ['1492', '1500', '1453', '1521'],
      en: ['1492', '1500', '1453', '1521'],
    },
    correctIndex: 0,
    explanation: {
      es: 'La expedición llegó a Guanahani el 12 de octubre de 1492.',
      en: 'The expedition landed in the Bahamas on October 12, 1492.',
    },
    tags: ['exploration', 'americas'],
  },

  // --- World Geography ---
  {
    id: 'geo_01',
    category: 'geography',
    difficulty: 'easy',
    question: {
      es: '¿Cuál es el río más largo y caudaloso del mundo?',
      en: 'What is the largest and longest river system in the world by discharge?',
    },
    options: {
      es: ['Río Amazonas', 'Río Nilo', 'Río Yangtsé', 'Río Misisipi'],
      en: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
    },
    correctIndex: 0,
    explanation: {
      es: 'El Amazonas descarga aproximadamente una quinta parte del agua fluvial del mundo.',
      en: 'The Amazon River carries roughly one-fifth of the world’s river flow.',
    },
    tags: ['rivers', 'nature'],
  },
  {
    id: 'geo_02',
    category: 'geography',
    difficulty: 'medium',
    question: {
      es: '¿Cuál es la capital oficial de Australia?',
      en: 'What is the official capital city of Australia?',
    },
    options: {
      es: ['Canberra', 'Sídney', 'Melbourne', 'Brisbane'],
      en: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Canberra fue elegida como compromiso entre Sídney y Melbourne en 1908.',
      en: 'Canberra was chosen in 1908 as a compromise between Sydney and Melbourne.',
    },
    tags: ['capitals', 'oceania'],
  },
  {
    id: 'geo_03',
    category: 'geography',
    difficulty: 'hard',
    question: {
      es: '¿Cuál es el país más pequeño del mundo por superficie terrestre?',
      en: 'What is the smallest independent state in the world by land area?',
    },
    options: {
      es: ['Ciudad del Vaticano', 'Mónaco', 'Nauru', 'San Marino'],
      en: ['Vatican City', 'Monaco', 'Nauru', 'San Marino'],
    },
    correctIndex: 0,
    explanation: {
      es: 'La Ciudad del Vaticano tiene una extensión de solo 0.49 km².',
      en: 'Vatican City spans only about 0.49 km² (121 acres).',
    },
    tags: ['countries', 'europe'],
  },
  {
    id: 'geo_04',
    category: 'geography',
    difficulty: 'medium',
    question: {
      es: '¿En qué continente se encuentra el desierto del Sahara?',
      en: 'On which continent is the Sahara Desert located?',
    },
    options: {
      es: ['África', 'Asia', 'América del Sur', 'Australia'],
      en: ['Africa', 'Asia', 'South America', 'Australia'],
    },
    correctIndex: 0,
    explanation: {
      es: 'El Sahara cubre gran parte del norte de África.',
      en: 'The Sahara spans most of Northern Africa.',
    },
    tags: ['deserts', 'africa'],
  },

  // --- Entertainment & Cinema ---
  {
    id: 'ent_01',
    category: 'entertainment',
    difficulty: 'easy',
    question: {
      es: '¿Quién dirigió la trilogía original de películas de "El Señor de los Anillos"?',
      en: 'Who directed the iconic "The Lord of the Rings" film trilogy?',
    },
    options: {
      es: ['Peter Jackson', 'Steven Spielberg', 'James Cameron', 'Christopher Nolan'],
      en: ['Peter Jackson', 'Steven Spielberg', 'James Cameron', 'Christopher Nolan'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Peter Jackson rodó la trilogía simultáneamente en Nueva Zelanda.',
      en: 'Peter Jackson filmed the entire trilogy in New Zealand.',
    },
    tags: ['movies', 'lotr'],
  },
  {
    id: 'ent_02',
    category: 'entertainment',
    difficulty: 'medium',
    question: {
      es: '¿Cuál fue la primera película animada de largometraje en la historia del cine?',
      en: 'What was the first feature-length animated film released by Disney in 1937?',
    },
    options: {
      es: [
        'Blancanieves y los siete enanitos',
        'Pinocho',
        'Fantasía',
        'Cenicienta',
      ],
      en: [
        'Snow White and the Seven Dwarfs',
        'Pinocchio',
        'Fantasia',
        'Cinderella',
      ],
    },
    correctIndex: 0,
    explanation: {
      es: 'Blancanieves se estrenó en diciembre de 1937.',
      en: 'Snow White premiered in December 1937.',
    },
    tags: ['animation', 'disney'],
  },
  {
    id: 'ent_03',
    category: 'entertainment',
    difficulty: 'hard',
    question: {
      es: '¿Qué actor interpretó al androide T-800 en la película "The Terminator" (1984)?',
      en: 'Which actor played the cyborg assassin in "The Terminator" (1984)?',
    },
    options: {
      es: ['Arnold Schwarzenegger', 'Sylvester Stallone', 'Michael Biehn', 'Kurt Russell'],
      en: ['Arnold Schwarzenegger', 'Sylvester Stallone', 'Michael Biehn', 'Kurt Russell'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Arnold inmortalizó la icónica frase "I\'ll be back".',
      en: 'Arnold immortalized the famous quote "I\'ll be back".',
    },
    tags: ['scifi', 'cinema'],
  },

  // --- Sports & Competition ---
  {
    id: 'spo_01',
    category: 'sports',
    difficulty: 'easy',
    question: {
      es: '¿Cada cuántos años se celebran los Juegos Olímpicos de Verano?',
      en: 'How often are the Summer Olympic Games held under normal schedules?',
    },
    options: {
      es: ['Cada 4 años', 'Cada 2 años', 'Cada 3 años', 'Cada 5 años'],
      en: ['Every 4 years', 'Every 2 years', 'Every 3 years', 'Every 5 years'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Se celebran en un ciclo cuatrienal conocido como Olimpiada.',
      en: 'They take place every 4 years in a cycle known as an Olympiad.',
    },
    tags: ['olympics'],
  },
  {
    id: 'spo_02',
    category: 'sports',
    difficulty: 'medium',
    question: {
      es: '¿Qué país ha ganado más Copas Mundiales de la FIFA de fútbol masculino?',
      en: 'Which country has won the most FIFA Men’s World Cup tournaments?',
    },
    options: {
      es: ['Brasil (5)', 'Alemania (4)', 'Italia (4)', 'Argentina (3)'],
      en: ['Brazil (5)', 'Germany (4)', 'Italy (4)', 'Argentina (3)'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Brasil fue campeón en 1958, 1962, 1970, 1994 y 2002.',
      en: 'Brazil won the title in 1958, 1962, 1970, 1994, and 2002.',
    },
    tags: ['soccer', 'worldcup'],
  },
  {
    id: 'spo_03',
    category: 'sports',
    difficulty: 'hard',
    question: {
      es: '¿Cuántos puntos vale un tiro libre encestado en el baloncesto profesional?',
      en: 'How many points is a successful free throw worth in basketball?',
    },
    options: {
      es: ['1 punto', '2 puntos', '3 puntos', '1.5 puntos'],
      en: ['1 point', '2 points', '3 points', '1.5 points'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Cada tiro libre anotado tras una falta cuenta como 1 punto.',
      en: 'Each free throw made awards 1 point.',
    },
    tags: ['basketball', 'rules'],
  },

  // --- Art & Literature ---
  {
    id: 'art_01',
    category: 'art_lit',
    difficulty: 'easy',
    question: {
      es: '¿Quién pintó la famosa obra maestra renacentista "La Gioconda" (Mona Lisa)?',
      en: 'Who painted the famous Renaissance masterpiece "Mona Lisa"?',
    },
    options: {
      es: ['Leonardo da Vinci', 'Miguel Ángel', 'Rafael Sanzio', 'Sandro Botticelli'],
      en: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Sandro Botticelli'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Leonardo da Vinci comenzó a pintarla a principios del siglo XVI.',
      en: 'Leonardo da Vinci began painting it in the early 16th century.',
    },
    tags: ['painting', 'renaissance'],
  },
  {
    id: 'art_02',
    category: 'art_lit',
    difficulty: 'medium',
    question: {
      es: '¿Quién es el autor de la célebre novela "Cien años de soledad"?',
      en: 'Who wrote the celebrated novel "One Hundred Years of Solitude"?',
    },
    options: {
      es: [
        'Gabriel García Márquez',
        'Mario Vargas Llosa',
        'Julio Cortázar',
        'Jorge Luis Borges',
      ],
      en: [
        'Gabriel García Márquez',
        'Mario Vargas Llosa',
        'Julio Cortázar',
        'Jorge Luis Borges',
      ],
    },
    correctIndex: 0,
    explanation: {
      es: 'Publicada en 1967, es una de las cumbres del realismo mágico.',
      en: 'Published in 1967, it is a landmark in magical realism literature.',
    },
    tags: ['books', 'latinamerica'],
  },
  {
    id: 'art_03',
    category: 'art_lit',
    difficulty: 'hard',
    question: {
      es: '¿Qué famoso pintor postimpresionista se cortó parte de la oreja izquierda en 1888?',
      en: 'Which post-impressionist painter famously injured his ear in 1888?',
    },
    options: {
      es: ['Vincent van Gogh', 'Paul Gauguin', 'Claude Monet', 'Edvard Munch'],
      en: ['Vincent van Gogh', 'Paul Gauguin', 'Claude Monet', 'Edvard Munch'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Van Gogh sufrió el incidente en Arlés tras una disputa con Gauguin.',
      en: 'Van Gogh suffered the incident in Arles following a row with Gauguin.',
    },
    tags: ['art', 'history'],
  },

  // --- Anime & Pop Culture ---
  {
    id: 'ani_01',
    category: 'anime_pop',
    difficulty: 'easy',
    question: {
      es: '¿Cuál es el sueño principal de Monkey D. Luffy en "One Piece"?',
      en: 'What is Monkey D. Luffy’s ultimate dream in "One Piece"?',
    },
    options: {
      es: [
        'Ser el Rey de los Piratas',
        'Ser el mejor espadachín',
        'Encontrar el All Blue',
        'Gobernar la Marina',
      ],
      en: [
        'Become the Pirate King',
        'Become the greatest swordsman',
        'Find the All Blue',
        'Rule the Marines',
      ],
    },
    correctIndex: 0,
    explanation: {
      es: 'Luffy busca el tesoro legendario One Piece para convertirse en el Rey Pirata.',
      en: 'Luffy seeks the One Piece treasure to claim the title of King of the Pirates.',
    },
    tags: ['anime', 'onepiece'],
  },
  {
    id: 'ani_02',
    category: 'anime_pop',
    difficulty: 'medium',
    question: {
      es: '¿Cómo se llama la esfera del dragón de 4 estrellas que el abuelo Gohan le dejó a Goku?',
      en: 'How many stars were on the Dragon Ball Goku inherited from his Grandpa Gohan?',
    },
    options: {
      es: ['4 estrellas (Si Xing Qiu)', '1 estrella', '7 estrellas', '3 estrellas'],
      en: ['4 stars (Four-Star Dragon Ball)', '1 star', '7 stars', '3 stars'],
    },
    correctIndex: 0,
    explanation: {
      es: 'La esfera de 4 estrellas es el recuerdo más preciado de la infancia de Goku.',
      en: 'The 4-star ball was Goku’s cherished memento from Grandpa Gohan.',
    },
    tags: ['anime', 'dragonball'],
  },
  {
    id: 'ani_03',
    category: 'anime_pop',
    difficulty: 'medium',
    question: {
      es: '¿En qué serie anime clásica aparece el robot gigante mecha "EVA-01"?',
      en: 'Which classic mecha anime features the giant biomechanical EVA-01?',
    },
    options: {
      es: ['Neon Genesis Evangelion', 'Mobile Suit Gundam', 'Gurren Lagann', 'Code Geass'],
      en: ['Neon Genesis Evangelion', 'Mobile Suit Gundam', 'Gurren Lagann', 'Code Geass'],
    },
    correctIndex: 0,
    explanation: {
      es: 'Creada por Hideaki Anno y Studio Gainax en 1995.',
      en: 'Created by Hideaki Anno and Studio Gainax in 1995.',
    },
    tags: ['anime', 'mecha'],
  },
];

// Strategic in-memory and localStorage cache
const STORAGE_KEY = 'robotrivia_question_cache_v1';
const SEEN_QUESTIONS_KEY = 'robotrivia_anti_repetition_seen_v2';

export class TriviaRepository {
  private customQuestions: TriviaQuestion[] = [];
  private seenQuestionIds: Set<string> = new Set();
  private poolCache: Partial<Record<CategoryId, TriviaQuestion[]>> = {};

  constructor() {
    this.loadState();
  }

  private loadState() {
    // 1. Load seen questions for strict anti-repetition
    try {
      if (typeof localStorage !== 'undefined') {
        const storedSeen = localStorage.getItem(SEEN_QUESTIONS_KEY);
        if (storedSeen) {
          const arr = JSON.parse(storedSeen);
          if (Array.isArray(arr)) {
            this.seenQuestionIds = new Set(arr);
          }
        }
      }
    } catch {
      this.seenQuestionIds = new Set();
    }

    // 2. Load any custom/generated cache
    try {
      if (typeof localStorage !== 'undefined') {
        const storedCustom = localStorage.getItem(STORAGE_KEY);
        if (storedCustom) {
          this.customQuestions = JSON.parse(storedCustom);
        }
      }
    } catch {
      this.customQuestions = [];
    }
  }

  private persistSeenQuestions() {
    try {
      if (typeof localStorage !== 'undefined') {
        const arr = Array.from(this.seenQuestionIds);
        localStorage.setItem(SEEN_QUESTIONS_KEY, JSON.stringify(arr));
      }
    } catch (e) {
      console.warn('Could not persist seen trivia IDs', e);
    }
  }

  /**
   * Returns the full pool of questions for a category (INITIAL + Massive Bank of 3,150+ questions + Custom)
   */
  public getQuestionsForCategoryPool(category: CategoryId): TriviaQuestion[] {
    if (this.poolCache[category]) {
      return this.poolCache[category]!;
    }
    const initial = INITIAL_QUESTIONS.filter(q => q.category === category);
    const massive = getCategoryMassiveQuestions(category);
    const custom = this.customQuestions.filter(q => q.category === category);

    // Merge ensuring unique IDs
    const mergedMap = new Map<string, TriviaQuestion>();
    initial.forEach(q => mergedMap.set(q.id, q));
    massive.forEach(q => mergedMap.set(q.id, q));
    custom.forEach(q => mergedMap.set(q.id, q));

    const result = Array.from(mergedMap.values());
    this.poolCache[category] = result;
    return result;
  }

  /**
   * Retrieves a non-repeating question for the given category with strict anti-repetition.
   * Guarantees that questions are never repeated until the entire 3,000+ pool has been exhausted!
   */
  public getQuestionForCategory(category: CategoryId, difficulty?: Difficulty): TriviaQuestion {
    const fullPool = this.getQuestionsForCategoryPool(category);

    // 1. Filter out all previously seen questions
    let candidatePool = fullPool.filter(q => !this.seenQuestionIds.has(q.id));

    // 2. If the user somehow exhausted all 3,150+ questions in this category, cycle seen history for this category
    if (candidatePool.length === 0) {
      fullPool.forEach(q => this.seenQuestionIds.delete(q.id));
      this.persistSeenQuestions();
      candidatePool = [...fullPool];
    }

    // 3. Match difficulty if possible
    if (difficulty) {
      const matchingDiff = candidatePool.filter(q => q.difficulty === difficulty);
      if (matchingDiff.length > 0) {
        candidatePool = matchingDiff;
      }
    }

    // 4. Select a random question from candidate pool
    const selected = candidatePool[Math.floor(Math.random() * candidatePool.length)] || fullPool[0];

    // 5. Mark as seen and persist to localStorage
    this.seenQuestionIds.add(selected.id);
    this.persistSeenQuestions();

    return selected;
  }

  public getRandomQuestion(difficulty?: Difficulty): TriviaQuestion {
    const allCategories: CategoryId[] = [
      'science_tech', 'history', 'entertainment', 'geography', 
      'sports', 'art_lit', 'retro_games', 'anime_pop'
    ];
    const randomCat = allCategories[Math.floor(Math.random() * allCategories.length)];
    return this.getQuestionForCategory(randomCat, difficulty);
  }

  public getCategoryCount(category: CategoryId): number {
    return this.getQuestionsForCategoryPool(category).length;
  }

  public getTotalQuestionsCount(): number {
    const allCategories: CategoryId[] = [
      'science_tech', 'history', 'entertainment', 'geography', 
      'sports', 'art_lit', 'retro_games', 'anime_pop'
    ];
    return allCategories.reduce((acc, cat) => acc + this.getCategoryCount(cat), 0);
  }

  public getCategoryRemainingUnseenCount(category: CategoryId): number {
    const full = this.getQuestionsForCategoryPool(category);
    return full.filter(q => !this.seenQuestionIds.has(q.id)).length;
  }

  public getAnsweredCount(): number {
    return this.seenQuestionIds.size;
  }

  public resetSeenQuestions(): void {
    this.seenQuestionIds.clear();
    try {
      localStorage.removeItem(SEEN_QUESTIONS_KEY);
    } catch (e) {
      console.warn(e);
    }
  }

  public getAllQuestions(): TriviaQuestion[] {
    const allCategories: CategoryId[] = [
      'science_tech', 'history', 'entertainment', 'geography', 
      'sports', 'art_lit', 'retro_games', 'anime_pop'
    ];
    let all: TriviaQuestion[] = [];
    allCategories.forEach(cat => {
      all = all.concat(this.getQuestionsForCategoryPool(cat));
    });
    return all;
  }

  public saveCustomQuestions(newQuestions: TriviaQuestion[]) {
    try {
      newQuestions.forEach(nq => {
        if (!this.customQuestions.some(cq => cq.id === nq.id)) {
          this.customQuestions.push(nq);
        }
      });
      this.poolCache = {}; // clear cache to include new ones
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.customQuestions));
    } catch (e) {
      console.warn('Could not persist trivia cache to localStorage', e);
    }
  }
}

export const triviaRepo = new TriviaRepository();
