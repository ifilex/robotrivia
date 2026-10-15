import { TriviaQuestion } from '../../types';
import { buildTriviaQuestion } from './generatorUtils';

export function generateArtLitQuestions(): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  const artLitFacts = [
    { work: 'Mona Lisa (La Gioconda)', author: 'Leonardo da Vinci', type: 'Pintura al óleo sobre tabla de álamo', year: 'c. 1503', place: 'Museo del Louvre (París)', diff: 'easy', enType: 'Oil painting on poplar panel' },
    { work: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes Saavedra', type: 'Novela clásica de caballerías', year: '1605', place: 'Siglo de Oro español', diff: 'easy', enType: 'Classic chivalric novel' },
    { work: 'La noche estrellada', author: 'Vincent van Gogh', type: 'Pintura postimpresionista', year: '1889', place: 'MoMA (Nueva York)', diff: 'easy', enType: 'Post-impressionist painting' },
    { work: 'Guernica', author: 'Pablo Picasso', type: 'Mural al óleo de denuncia cubista', year: '1937', place: 'Museo Reina Sofía (Madrid)', diff: 'easy', enType: 'Cubist anti-war mural' },
    { work: 'Las Meninas', author: 'Diego Velázquez', type: 'Pintura barroca de la familia real', year: '1656', place: 'Museo del Prado (Madrid)', diff: 'easy', enType: 'Baroque masterpiece painting' },
    { work: 'Hamlet', author: 'William Shakespeare', type: 'Tragedia dramática en cinco actos ("Ser o no ser")', year: 'c. 1601', place: 'Teatro isabelino inglés', diff: 'easy', enType: 'Dramatic tragedy play' },
    { work: 'Cien años de soledad', author: 'Gabriel García Márquez', type: 'Novela cumbre del Realismo Mágico en Macondo', year: '1967', place: 'Literatura latinoamericana (Nobel)', diff: 'easy', enType: 'Magical realism masterpiece' },
    { work: 'La Divina Comedia', author: 'Dante Alighieri', type: 'Poema épico medieval (Infierno, Purgatorio, Paraíso)', year: 'c. 1320', place: 'Florencia (Italia)', diff: 'easy', enType: 'Medieval epic poem' },
    { work: 'Bóveda de la Capilla Sixtina', author: 'Miguel Ángel Buonarroti', type: 'Fresco renacentista monumental', year: '1508-1512', place: 'Museos Vaticanos (Ciudad del Vaticano)', diff: 'easy', enType: 'Monumental Renaissance fresco' },
    { work: 'La persistencia de la memoria (Relojes blandos)', author: 'Salvador Dalí', type: 'Pintura cumbre del Surrealismo', year: '1931', place: 'MoMA (Nueva York)', diff: 'easy', enType: 'Surrealist painting' },
    { work: 'El Grito', author: 'Edvard Munch', type: 'Pintura expresionista de angustia existencial', year: '1893', place: 'Galería Nacional de Oslo (Noruega)', diff: 'easy', enType: 'Expressionist icon' },
    { work: '1984', author: 'George Orwell', type: 'Novela distópica sobre el Gran Hermano y el totalitarismo', year: '1949', place: 'Literatura británica', diff: 'easy', enType: 'Dystopian fiction novel' },
    { work: 'La Metamorfosis', author: 'Franz Kafka', type: 'Relato existencial sobre Gregorio Samsa convertido en insecto', year: '1915', place: 'Literatura en alemán (Praga)', diff: 'easy', enType: 'Existential novella' },
    { work: 'Frankenstein o el moderno Prometeo', author: 'Mary Shelley', type: 'Novela gótica fundacional de la ciencia ficción', year: '1818', place: 'Romanticismo británico', diff: 'easy', enType: 'Gothic science fiction novel' },
    { work: 'La Odisea', author: 'Homero', type: 'Poema épico griego sobre el regreso de Odiseo (Ulises) a Ítaca', year: 'Siglo VIII a.C.', place: 'Antigua Grecia', diff: 'easy', enType: 'Ancient Greek epic poem' },
    { work: 'Crimen y castigo', author: 'Fiódor Dostoievski', type: 'Novela psicológica sobre Rodión Raskólnikov', year: '1866', place: 'Literatura rusa', diff: 'medium', enType: 'Psychological fiction novel' },
    { work: 'El Pensador', author: 'Auguste Rodin', type: 'Escultura monumental en bronce', year: '1904', place: 'Museo Rodin (París)', diff: 'medium', enType: 'Monumental bronze sculpture' },
    { work: 'El beso', author: 'Gustav Klimt', type: 'Pintura simbolista y modernista con pan de oro', year: '1907-1908', place: 'Palacio Belvedere (Viena)', diff: 'medium', enType: 'Symbolist oil and gold leaf' },
    { work: 'La joven de la perla', author: 'Johannes Vermeer', type: 'Tronie barroco holandés del Siglo de Oro', year: 'c. 1665', place: 'Mauritshuis (La Haya)', diff: 'medium', enType: 'Dutch Golden Age painting' },
    { work: 'El nacimiento de Venus', author: 'Sandro Botticelli', type: 'Pintura al temple sobre lienzo del Renacimiento', year: 'c. 1485', place: 'Galería Uffizi (Florencia)', diff: 'medium', enType: 'Italian Renaissance painting' },
    { work: 'Orgullo y prejuicio', author: 'Jane Austen', type: 'Novela romántica y sátira social sobre Elizabeth Bennet', year: '1813', place: 'Literatura británica de la Regencia', diff: 'medium', enType: 'Classic romance novel' },
    { work: 'Los Miserables', author: 'Victor Hugo', type: 'Novela social e histórica sobre Jean Valjean y Javert', year: '1862', place: 'Literatura francesa del siglo XIX', diff: 'medium', enType: 'French historical epic' },
    { work: 'El Principito', author: 'Antoine de Saint-Exupéry', type: 'Cuento poético y filosófico sobre el zorro y la rosa', year: '1943', place: 'Literatura universal', diff: 'easy', enType: 'Philosophical poetic novella' },
    { work: 'Rayuela', author: 'Julio Cortázar', type: 'Contranovela experimental de estructura abierta', year: '1963', place: 'Boom latinoamericano', diff: 'hard', enType: 'Experimental novel' },
    { work: 'Ficciones', author: 'Jorge Luis Borges', type: 'Colección de relatos laberínticos y metafísicos', year: '1944', place: 'Literatura argentina', diff: 'hard', enType: 'Metaphysical short stories' },
  ];

  for (let cycle = 0; cycle < 130; cycle++) {
    for (let aIdx = 0; aIdx < artLitFacts.length; aIdx++) {
      if (questions.length >= 3150) break;
      const f = artLitFacts[aIdx];
      const others = artLitFacts.filter((_, idx) => idx !== aIdx);
      const distAuthors = [
        others[(aIdx + 1 + cycle) % others.length].author,
        others[(aIdx + 3 + cycle) % others.length].author,
        others[(aIdx + 5 + cycle) % others.length].author,
      ];

      const qId = `art_fact_${cycle}_${aIdx}`;
      const diff = f.diff as any;

      if (cycle % 4 === 0) {
        questions.push(buildTriviaQuestion(
          qId,
          'art_lit',
          diff,
          `¿Quién es el autor o creador de la célebre obra '${f.work}'?`,
          `Who created or authored the famous masterpiece '${f.work}'?`,
          f.author,
          f.author,
          distAuthors,
          distAuthors,
          `'${f.work}' fue creada por ${f.author} (${f.year}).`,
          `'${f.work}' was created by ${f.author} (${f.year}).`,
          ['art_creators', 'literature']
        ));
      } else if (cycle % 4 === 1) {
        const distWorks = [
          others[(aIdx + 1 + cycle) % others.length].work,
          others[(aIdx + 2 + cycle) % others.length].work,
          others[(aIdx + 4 + cycle) % others.length].work,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'art_lit',
          diff,
          `¿Cuál de las siguientes obras cumbre fue creada por ${f.author}?`,
          `Which masterwork was created by ${f.author}?`,
          f.work,
          f.work,
          distWorks,
          distWorks,
          `${f.author} es el creador de '${f.work}' (${f.type}).`,
          `${f.author} created '${f.work}' (${f.enType}).`,
          ['masterpieces']
        ));
      } else if (cycle % 4 === 2) {
        const distPlaces = [
          others[(aIdx + 1 + cycle) % others.length].place,
          others[(aIdx + 2 + cycle) % others.length].place,
          others[(aIdx + 3 + cycle) % others.length].place,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'art_lit',
          'medium',
          `¿En qué museo, ciudad o contexto histórico se conserva o sitúa '${f.work}'?`,
          `Where is '${f.work}' exhibited or historically contextualized?`,
          f.place,
          f.place,
          distPlaces,
          distPlaces,
          `'${f.work}' se asocia con: ${f.place}.`,
          `'${f.work}' is connected with: ${f.place}.`,
          ['museums_contexts']
        ));
      } else {
        const distTypes = [
          others[(aIdx + 1 + cycle) % others.length].type,
          others[(aIdx + 2 + cycle) % others.length].type,
          others[(aIdx + 3 + cycle) % others.length].type,
        ];
        const distEnTypes = [
          others[(aIdx + 1 + cycle) % others.length].enType,
          others[(aIdx + 2 + cycle) % others.length].enType,
          others[(aIdx + 3 + cycle) % others.length].enType,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'art_lit',
          'hard',
          `¿Qué género, técnica o descripción corresponde a la obra '${f.work}' de ${f.author}?`,
          `What genre, medium or description corresponds to '${f.work}' by ${f.author}?`,
          f.type,
          f.enType,
          distTypes,
          distEnTypes,
          `'${f.work}' es: ${f.type} (${f.year}).`,
          `'${f.work}' is: ${f.enType} (${f.year}).`,
          ['art_mediums']
        ));
      }
    }
  }

  return questions;
}
