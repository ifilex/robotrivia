import { TriviaQuestion } from '../../types';
import { buildTriviaQuestion } from './generatorUtils';

export function generateEntertainmentQuestions(): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  const entFacts = [
    { title: 'El Padrino (The Godfather)', dir: 'Francis Ford Coppola', star: 'Marlon Brando y Al Pacino (Don Vito y Michael Corleone)', oscar: '3 Premios Óscar (incluida Mejor Película en 1972)', quote: '"Le haré una oferta que no podrá rechazar"', diff: 'easy' },
    { title: 'Star Wars: Episodio IV - Una Nueva Esperanza', dir: 'George Lucas', star: 'Mark Hamill, Harrison Ford y Carrie Fisher', oscar: '6 Premios Óscar técnicos y banda sonora de John Williams', quote: '"Que la Fuerza te acompañe"', diff: 'easy' },
    { title: 'Titanic', dir: 'James Cameron', star: 'Leonardo DiCaprio y Kate Winslet (Jack y Rose)', oscar: '11 Premios Óscar (récord histórico igualado)', quote: '"¡Soy el rey del mundo!"', diff: 'easy' },
    { title: 'Jurassic Park (Parque Jurásico)', dir: 'Steven Spielberg', star: 'Sam Neill, Laura Dern y Jeff Goldblum', oscar: '3 Premios Óscar por efectos visuales revolucionarios', quote: '"La vida se abre camino"', diff: 'easy' },
    { title: 'Pulp Fiction', dir: 'Quentin Tarantino', star: 'John Travolta, Samuel L. Jackson y Uma Thurman', oscar: 'Palma de Oro en Cannes y Óscar a Mejor Guion Original', quote: '"Ezequiel 25:17"', diff: 'easy' },
    { title: 'El Señor de los Anillos: El Retorno del Rey', dir: 'Peter Jackson', star: 'Elijah Wood, Ian McKellen y Viggo Mortensen', oscar: '11 Premios Óscar de 11 nominaciones (pleno absoluto)', quote: '"Por Frodo"', diff: 'easy' },
    { title: 'Matrix (The Matrix)', dir: 'Las Hermanas Wachowski', star: 'Keanu Reeves (Neo), Laurence Fishburne y Carrie-Anne Moss', oscar: '4 Premios Óscar y técnica de cámara lenta "Bullet Time"', quote: '"No hay cuchara"', diff: 'easy' },
    { title: 'Origen (Inception)', dir: 'Christopher Nolan', star: 'Leonardo DiCaprio, Joseph Gordon-Levitt y Elliot Page', oscar: '4 Premios Óscar técnicos por su mundo de sueños lúcidos', quote: '"Una idea es como un virus"', diff: 'easy' },
    { title: 'El Caballero Oscuro (The Dark Knight)', dir: 'Christopher Nolan', star: 'Christian Bale (Batman) y Heath Ledger (Joker)', oscar: 'Óscar póstumo para Heath Ledger como Mejor Actor de Reparto', quote: '"¿Por qué tan serio?"', diff: 'easy' },
    { title: 'Psicosis (Psycho)', dir: 'Alfred Hitchcock', star: 'Anthony Perkins (Norman Bates) y Janet Leigh', oscar: 'Hito del suspense y célebre escena de la ducha con violines de Bernard Herrmann', quote: '"El mejor amigo de un chico es su madre"', diff: 'easy' },
    { title: '2001: Una Odisea del Espacio', dir: 'Stanley Kubrick', star: 'Keir Dullea y la supercomputadora HAL 9000', oscar: 'Óscar a Mejores Efectos Visuales para Stanley Kubrick', quote: '"Lo siento, Dave. Me temo que no puedo hacer eso"', diff: 'medium' },
    { title: 'Regreso al Futuro (Back to the Future)', dir: 'Robert Zemeckis', star: 'Michael J. Fox (Marty McFly) y Christopher Lloyd (Doc Brown)', oscar: 'Óscar a Mejor Edición de Sonido (máquina del tiempo DeLorean)', quote: '"A donde vamos no necesitamos carreteras"', diff: 'easy' },
    { title: 'Forrest Gump', dir: 'Robert Zemeckis', star: 'Tom Hanks (Forrest Gump)', oscar: '6 Premios Óscar (Mejor Película y Mejor Actor)', quote: '"La vida es como una caja de bombones"', diff: 'easy' },
    { title: 'Gladiator (El Gladiador)', dir: 'Ridley Scott', star: 'Russell Crowe (Máximo Décimo Meridio) y Joaquin Phoenix', oscar: '5 Premios Óscar incluida Mejor Película', quote: '"Lo que hacemos en la vida tiene su eco en la eternidad"', diff: 'easy' },
    { title: 'Casablanca', dir: 'Michael Curtiz', star: 'Humphrey Bogart (Rick) e Ingrid Bergman (Ilsa)', oscar: '3 Premios Óscar (Mejor Película, Director y Guion)', quote: '"Siempre nos quedará París"', diff: 'medium' },
    { title: 'Breaking Bad', dir: 'Vince Gilligan', star: 'Bryan Cranston (Walter White / Heisenberg) y Aaron Paul (Jesse)', oscar: '16 Premios Primetime Emmy a mejor serie dramática', quote: '"Yo soy el que llama a la puerta"', diff: 'easy' },
    { title: 'Juego de Tronos (Game of Thrones)', dir: 'David Benioff y D.B. Weiss (George R.R. Martin)', star: 'Peter Dinklage (Tyrion Lannister), Emilia Clarke y Kit Harington', oscar: '59 Premios Emmy (récord histórico para serie de ficción)', quote: '"Se acerca el invierno"', diff: 'easy' },
    { title: 'The Beatles', dir: 'Liverpool (Reino Unido)', star: 'John Lennon, Paul McCartney, George Harrison y Ringo Starr', oscar: 'La banda con más sencillos número 1 en la historia de la música', quote: '"Hey Jude", "Yesterday" y "Let It Be"', diff: 'easy' },
    { title: 'Queen', dir: 'Londres (Reino Unido)', star: 'Freddie Mercury, Brian May, Roger Taylor y John Deacon', oscar: 'Inmortal concierto Live Aid 1985 en el estadio de Wembley', quote: '"Bohemian Rhapsody", "We Will Rock You" y "Don\'t Stop Me Now"', diff: 'easy' },
    { title: 'Michael Jackson', dir: 'Gary, Indiana (EE.UU.)', star: 'El "Rey del Pop" (Moonwalk y chaqueta roja de Thriller)', oscar: '"Thriller" (el álbum más vendido de todos los tiempos con más de 70M)', quote: '"Billie Jean", "Beat It" y "Smooth Criminal"', diff: 'easy' },
    { title: 'Pink Floyd', dir: 'Londres (Reino Unido)', star: 'David Gilmour, Roger Waters, Syd Barrett y Richard Wright', oscar: '"The Dark Side of the Moon" (más de 900 semanas en Billboard)', quote: '"Comfortably Numb", "Wish You Were Here" y "Another Brick in the Wall"', diff: 'medium' },
    { title: 'El Rey León (The Lion King)', dir: 'Roger Allers y Rob Minkoff (Disney)', star: 'Simba, Mufasa, Scar, Timón y Pumba', oscar: '2 Premios Óscar a música de Hans Zimmer y Elton John', quote: '"Hakuna Matata"', diff: 'easy' },
    { title: 'Toy Story', dir: 'John Lasseter (Pixar Animation Studios)', star: 'Woody el vaquero y Buzz Lightyear', oscar: 'Primer largometraje de animación íntegramente por ordenador', quote: '"¡Hasta el infinito y más allá!"', diff: 'easy' },
    { title: 'Oppenheimer', dir: 'Christopher Nolan', star: 'Cillian Murphy (J. Robert Oppenheimer) y Robert Downey Jr.', oscar: '7 Premios Óscar incluidos Mejor Película y Mejor Director', quote: '"Ahora me he convertido en la muerte, el destructor de mundos"', diff: 'easy' },
    { title: 'Interstellar', dir: 'Christopher Nolan', star: 'Matthew McConaughey (Cooper), Anne Hathaway y Jessica Chastain', oscar: 'Óscar a Mejores Efectos Visuales asesorado por Kip Thorne (agujero Gargantúa)', quote: '"El amor es lo único que somos capaces de percibir que trasciende las dimensiones"', diff: 'easy' },
  ];

  for (let cycle = 0; cycle < 130; cycle++) {
    for (let eIdx = 0; eIdx < entFacts.length; eIdx++) {
      if (questions.length >= 3150) break;
      const f = entFacts[eIdx];
      const others = entFacts.filter((_, idx) => idx !== eIdx);
      const distTitles = [
        others[(eIdx + 1 + cycle) % others.length].title,
        others[(eIdx + 3 + cycle) % others.length].title,
        others[(eIdx + 5 + cycle) % others.length].title,
      ];

      const qId = `ent_fact_${cycle}_${eIdx}`;
      const diff = f.diff as any;

      if (cycle % 4 === 0) {
        questions.push(buildTriviaQuestion(
          qId,
          'entertainment',
          diff,
          `¿En qué famosa obra, película o producción destacan: ${f.star}?`,
          `Which famous movie or production features: ${f.star}?`,
          f.title,
          f.title,
          distTitles,
          distTitles,
          `'${f.title}' cuenta con ${f.star}.`,
          `'${f.title}' features ${f.star}.`,
          ['cinema_stars', 'entertainment']
        ));
      } else if (cycle % 4 === 1) {
        const distDirs = [
          others[(eIdx + 1 + cycle) % others.length].dir,
          others[(eIdx + 2 + cycle) % others.length].dir,
          others[(eIdx + 4 + cycle) % others.length].dir,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'entertainment',
          diff,
          `¿Quién dirigió o lideró la creación de '${f.title}'?`,
          `Who directed or created '${f.title}'?`,
          f.dir,
          f.dir,
          distDirs,
          distDirs,
          `'${f.title}' fue dirigida o creada por ${f.dir}.`,
          `'${f.title}' was directed or created by ${f.dir}.`,
          ['directors_creators']
        ));
      } else if (cycle % 4 === 2) {
        const distQuotes = [
          others[(eIdx + 1 + cycle) % others.length].quote,
          others[(eIdx + 2 + cycle) % others.length].quote,
          others[(eIdx + 3 + cycle) % others.length].quote,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'entertainment',
          'medium',
          `¿Qué frase célebre, tema musical o cita icónica pertenece a '${f.title}'?`,
          `Which iconic quote or musical anthem belongs to '${f.title}'?`,
          f.quote,
          f.quote,
          distQuotes,
          distQuotes,
          `'${f.quote}' es un sello inconfundible de '${f.title}'.`,
          `'${f.quote}' is an iconic element of '${f.title}'.`,
          ['movie_quotes']
        ));
      } else {
        const distOscars = [
          others[(eIdx + 1 + cycle) % others.length].oscar,
          others[(eIdx + 2 + cycle) % others.length].oscar,
          others[(eIdx + 3 + cycle) % others.length].oscar,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'entertainment',
          'hard',
          `¿Qué galardón, récord o reconocimiento histórico logró '${f.title}'?`,
          `Which milestone or award did '${f.title}' achieve?`,
          f.oscar,
          f.oscar,
          distOscars,
          distOscars,
          `'${f.title}' obtuvo: ${f.oscar}.`,
          `'${f.title}' achieved: ${f.oscar}.`,
          ['awards_records']
        ));
      }
    }
  }

  return questions;
}
