import { TriviaQuestion } from '../../types';
import { buildTriviaQuestion } from './generatorUtils';

export function generateScienceTechQuestions(): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  // 1. Elements of the Periodic Table
  const elements = [
    { name: 'Hidrógeno', en: 'Hydrogen', sym: 'H', num: 1, group: 'No metal', app: 'El elemento más abundante del universo' },
    { name: 'Helio', en: 'Helium', sym: 'He', num: 2, group: 'Gas noble', app: 'Segundo elemento más ligero e inerte' },
    { name: 'Litio', en: 'Lithium', sym: 'Li', num: 3, group: 'Metal alcalino', app: 'Baterías recargables modernas' },
    { name: 'Berilio', en: 'Beryllium', sym: 'Be', num: 4, group: 'Alcalinotérreo', app: 'Espejos del telescopio James Webb' },
    { name: 'Boro', en: 'Boron', sym: 'B', num: 5, group: 'Metaloide', app: 'Vidrio de borosilicato resistente' },
    { name: 'Carbono', en: 'Carbon', sym: 'C', num: 6, group: 'No metal', app: 'Base fundamental de la química orgánica' },
    { name: 'Nitrógeno', en: 'Nitrogen', sym: 'N', num: 7, group: 'No metal', app: 'Compone el 78% de la atmósfera terrestre' },
    { name: 'Oxígeno', en: 'Oxygen', sym: 'O', num: 8, group: 'Calcógeno', app: 'Vital para la respiración celular aeróbica' },
    { name: 'Flúor', en: 'Fluorine', sym: 'F', num: 9, group: 'Halógeno', app: 'El elemento más electronegativo' },
    { name: 'Neón', en: 'Neon', sym: 'Ne', num: 10, group: 'Gas noble', app: 'Luces de descarga de alto voltaje' },
    { name: 'Sodio', en: 'Sodium', sym: 'Na', num: 11, group: 'Metal alcalino', app: 'Sal común junto con el cloro' },
    { name: 'Magnesio', en: 'Magnesium', sym: 'Mg', num: 12, group: 'Alcalinotérreo', app: 'Clorofila vegetal y aleaciones ligeras' },
    { name: 'Aluminio', en: 'Aluminum', sym: 'Al', num: 13, group: 'Metal del bloque p', app: 'Metal ligero no ferromagnético' },
    { name: 'Silicio', en: 'Silicon', sym: 'Si', num: 14, group: 'Metaloide', app: 'Corazón de los microchips semiconductores' },
    { name: 'Fósforo', en: 'Phosphorus', sym: 'P', num: 15, group: 'No metal', app: 'Forma parte del esqueleto de ADN/ARN' },
    { name: 'Azufre', en: 'Sulfur', sym: 'S', num: 16, group: 'Calcógeno', app: 'Aminoácidos cisteína y metionina' },
    { name: 'Cloro', en: 'Chlorine', sym: 'Cl', num: 17, group: 'Halógeno', app: 'Desinfectante y purificación de agua' },
    { name: 'Argón', en: 'Argon', sym: 'Ar', num: 18, group: 'Gas noble', app: 'Atmósfera protectora en soldaduras' },
    { name: 'Potasio', en: 'Potassium', sym: 'K', num: 19, group: 'Metal alcalino', app: 'Impulsos nerviosos y bomba Na+/K+' },
    { name: 'Calcio', en: 'Calcium', sym: 'Ca', num: 20, group: 'Alcalinotérreo', app: 'Estructura ósea y contracción muscular' },
    { name: 'Titanio', en: 'Titanium', sym: 'Ti', num: 22, group: 'Metal de transición', app: 'Gran resistencia a la corrosión e implantes' },
    { name: 'Hierro', en: 'Iron', sym: 'Fe', num: 26, group: 'Metal de transición', app: 'Hemoglobina y núcleo terrestre' },
    { name: 'Níquel', en: 'Nickel', sym: 'Ni', num: 28, group: 'Metal de transición', app: 'Aleaciones de acero inoxidable y monedas' },
    { name: 'Cobre', en: 'Copper', sym: 'Cu', num: 29, group: 'Metal de transición', app: 'Excelente conductor eléctrico y térmico' },
    { name: 'Cinc', en: 'Zinc', sym: 'Zn', num: 30, group: 'Metal de transición', app: 'Galvanizado de metales y oligoelemento' },
    { name: 'Plata', en: 'Silver', sym: 'Ag', num: 47, group: 'Metal de transición', app: 'Mayor conductividad eléctrica conocida' },
    { name: 'Oro', en: 'Gold', sym: 'Au', num: 79, group: 'Metal de transición', app: 'Metal noble de alta ductilidad e inercia' },
    { name: 'Mercurio', en: 'Mercury', sym: 'Hg', num: 80, group: 'Metal de transición', app: 'Único metal líquido a temperatura ambiente' },
    { name: 'Plomo', en: 'Lead', sym: 'Pb', num: 82, group: 'Metal del bloque p', app: 'Blindaje contra radiaciones ionizantes' },
    { name: 'Uranio', en: 'Uranium', sym: 'U', num: 92, group: 'Actínido', app: 'Combustible en reactores de fisión nuclear' },
    { name: 'Plutonio', en: 'Plutonium', sym: 'Pu', num: 94, group: 'Actínido', app: 'Fisión nuclear y generadores RTG espaciales' },
  ];

  const allSymbols = elements.map(e => e.sym);
  const allNames = elements.map(e => e.name);
  const allEnNames = elements.map(e => e.en);

  // 1. Elements questions
  elements.forEach((el, idx) => {
    // Symbol Question
    questions.push(buildTriviaQuestion(
      `sci_sym_${idx}`,
      'science_tech',
      'easy',
      `¿Cuál es el símbolo químico oficial del elemento ${el.name}?`,
      `What is the official chemical symbol for ${el.en}?`,
      el.sym,
      el.sym,
      allSymbols.filter(s => s !== el.sym).slice(idx % 15, (idx % 15) + 4),
      allSymbols.filter(s => s !== el.sym).slice(idx % 15, (idx % 15) + 4),
      `El símbolo químico del ${el.name} es ${el.sym} (número atómico ${el.num}).`,
      `The chemical symbol for ${el.en} is ${el.sym} (atomic number ${el.num}).`,
      ['chemistry', 'periodic_table']
    ));

    // Reverse Symbol Question
    questions.push(buildTriviaQuestion(
      `sci_revsym_${idx}`,
      'science_tech',
      'medium',
      `¿Qué elemento químico está representado con el símbolo '${el.sym}'?`,
      `Which chemical element is represented by the symbol '${el.sym}'?`,
      el.name,
      el.en,
      allNames.filter(n => n !== el.name).slice((idx + 2) % 15, ((idx + 2) % 15) + 4),
      allEnNames.filter(n => n !== el.en).slice((idx + 2) % 15, ((idx + 2) % 15) + 4),
      `'${el.sym}' corresponde al ${el.name}, con número atómico ${el.num}.`,
      `'${el.sym}' stands for ${el.en}, with atomic number ${el.num}.`,
      ['chemistry']
    ));

    // Atomic Number Question
    questions.push(buildTriviaQuestion(
      `sci_num_${idx}`,
      'science_tech',
      'hard',
      `¿Cuál es el número atómico (protones) del elemento ${el.name}?`,
      `What is the atomic number of ${el.en}?`,
      String(el.num),
      String(el.num),
      [String((el.num + 2) % 100 || 12), String((el.num + 6) % 100 || 24), String((el.num + 10) % 100 || 36)],
      [String((el.num + 2) % 100 || 12), String((el.num + 6) % 100 || 24), String((el.num + 10) % 100 || 36)],
      `El ${el.name} posee exactamente ${el.num} protones en su núcleo atómico.`,
      `${el.en} has exactly ${el.num} protons in its atomic nucleus.`,
      ['atomic_physics']
    ));

    // Chemical Group Question
    questions.push(buildTriviaQuestion(
      `sci_grp_${idx}`,
      'science_tech',
      'medium',
      `¿A qué categoría o familia química pertenece el ${el.name}?`,
      `To which chemical family does ${el.en} belong?`,
      el.group,
      el.group,
      ['Gas noble', 'Metal de transición', 'Halógeno', 'Actínido', 'Metaloide'].filter(g => g !== el.group).slice(0, 3),
      ['Noble gas', 'Transition metal', 'Halogen', 'Actinide', 'Metalloid'].filter(g => g !== el.group).slice(0, 3),
      `El ${el.name} se clasifica como ${el.group}.`,
      `${el.en} is classified as a ${el.group}.`,
      ['periodic_groups']
    ));
  });

  // 2. Breakthrough Facts in Science, Computing, Astronomy, Biology, Physics
  const sciFacts = [
    { topic: 'James Watson y Francis Crick', ans: 'Estructura de doble hélice del ADN', enAns: 'Double helix structure of DNA', field: 'Biología molecular', year: '1953', diff: 'medium' },
    { topic: 'Albert Einstein', ans: 'Teoría de la Relatividad General', enAns: 'General Theory of Relativity', field: 'Física teórica', year: '1915', diff: 'easy' },
    { topic: 'Alexander Fleming', ans: 'Descubrimiento de la Penicilina', enAns: 'Discovery of Penicillin', field: 'Medicina', year: '1928', diff: 'easy' },
    { topic: 'Isaac Newton', ans: 'Ley de Gravitación Universal y Leyes del Movimiento', enAns: 'Law of Universal Gravitation', field: 'Física clásica', year: '1687', diff: 'easy' },
    { topic: 'Marie Curie', ans: 'Descubrimiento del Polonio y el Radio', enAns: 'Discovery of Polonium and Radium', field: 'Radioactividad', year: '1898', diff: 'easy' },
    { topic: 'Alan Turing', ans: 'Concepto de la Máquina de Turing y Computación Universal', enAns: 'Universal Turing Machine concept', field: 'Ciencias de la computación', year: '1936', diff: 'medium' },
    { topic: 'Tim Berners-Lee', ans: 'Invención de la World Wide Web (WWW)', enAns: 'Invention of the World Wide Web (WWW)', field: 'Informática', year: '1989', diff: 'easy' },
    { topic: 'Charles Darwin', ans: 'Teoría de la Evolución por Selección Natural', enAns: 'Theory of Evolution by Natural Selection', field: 'Biología', year: '1859', diff: 'easy' },
    { topic: 'Dmitri Mendeléyev', ans: 'Formulación de la Tabla Periódica de los Elementos', enAns: 'Periodic Table of the Elements', field: 'Química', year: '1869', diff: 'medium' },
    { topic: 'Wilhelm Röntgen', ans: 'Descubrimiento de los Rayos X', enAns: 'Discovery of X-rays', field: 'Física médica', year: '1895', diff: 'medium' },
    { topic: 'Louis Pasteur', ans: 'Pasteurización y vacuna contra la rabia', enAns: 'Pasteurization and rabies vaccine', field: 'Microbiología', year: '1885', diff: 'easy' },
    { topic: 'Gregor Mendel', ans: 'Leyes de la herencia genética con guisantes', enAns: 'Laws of genetic inheritance with pea plants', field: 'Genética', year: '1865', diff: 'medium' },
    { topic: 'Johannes Kepler', ans: 'Leyes del movimiento planetario elíptico', enAns: 'Laws of planetary motion', field: 'Astronomía', year: '1609', diff: 'medium' },
    { topic: 'Galileo Galilei', ans: 'Observación de lunas de Júpiter y fases de Venus', enAns: 'Observation of Jupiter’s moons', field: 'Astronomía observacional', year: '1610', diff: 'easy' },
    { topic: 'Max Planck', ans: 'Constante de Planck e hipótesis cuántica', enAns: 'Quantum hypothesis and Planck constant', field: 'Física cuántica', year: '1900', diff: 'hard' },
    { topic: 'Niels Bohr', ans: 'Modelo atómico con órbitas de electrones cuantizadas', enAns: 'Bohr model of the atom', field: 'Física atómica', year: '1913', diff: 'medium' },
    { topic: 'Werner Heisenberg', ans: 'Principio de Incertidumbre cuántica', enAns: 'Uncertainty Principle', field: 'Física cuántica', year: '1927', diff: 'hard' },
    { topic: 'Edwin Hubble', ans: 'Expansión del universo y ley de desplazamiento al rojo', enAns: 'Expansion of the universe', field: 'Cosmología', year: '1929', diff: 'medium' },
    { topic: 'Linus Torvalds', ans: 'Creación del núcleo del sistema operativo Linux', enAns: 'Creation of the Linux OS kernel', field: 'Sistemas operativos', year: '1991', diff: 'easy' },
    { topic: 'Brendan Eich', ans: 'Creación del lenguaje JavaScript en Netscape', enAns: 'Creation of JavaScript language', field: 'Desarrollo web', year: '1995', diff: 'easy' },
    { topic: 'Guido van Rossum', ans: 'Creación del lenguaje de programación Python', enAns: 'Creation of Python programming language', field: 'Lenguajes de programación', year: '1991', diff: 'easy' },
    { topic: 'Dennis Ritchie', ans: 'Creación del lenguaje de programación C y Unix', enAns: 'Creation of C programming language and Unix', field: 'Sistemas informáticos', year: '1972', diff: 'medium' },
    { topic: 'Ada Lovelace', ans: 'Primer algoritmo procesado por una máquina (primera programadora)', enAns: 'First computer algorithm (first programmer)', field: 'Pioneros de la computación', year: '1843', diff: 'easy' },
    { topic: 'Misión Apolo 11', ans: 'Primer alunizaje tripulado en el Mar de la Tranquilidad', enAns: 'First crewed Moon landing', field: 'Exploración espacial', year: '1969', diff: 'easy' },
    { topic: 'Sputnik 1', ans: 'Primer satélite artificial en orbitar la Tierra', enAns: 'First artificial satellite in orbit', field: 'Carrera espacial', year: '1957', diff: 'easy' },
    { topic: 'Telescopio Espacial James Webb', ans: 'Observación en infrarrojo en el punto Lagrange L2', enAns: 'Infrared observation at Lagrange Point L2', field: 'Astrofísica espacial', year: '2021', diff: 'medium' },
    { topic: 'Sonda Voyager 1', ans: 'Objeto creado por el hombre más alejado en el espacio interestelar', enAns: 'Farthest human-made object in interstellar space', field: 'Sondas espaciales', year: '1977', diff: 'medium' },
    { topic: 'Estación Espacial Internacional (ISS)', ans: 'Laboratorio de microgravedad en órbita baja continua', enAns: 'Continuous microgravity orbital laboratory', field: 'Astronáutica', year: '1998', diff: 'easy' },
    { topic: 'Colisionador de Hadrones (LHC en el CERN)', ans: 'Detección experimental del Bosón de Higgs', enAns: 'Experimental detection of the Higgs Boson', field: 'Física de partículas', year: '2012', diff: 'medium' },
    { topic: 'Mitocondria', ans: 'Central energética de la célula productora de ATP', enAns: 'Cellular powerhouse producing ATP', field: 'Citología celular', year: 'Biológico', diff: 'easy' },
    { topic: 'Ribosoma', ans: 'Síntesis y ensamblaje de proteínas celulares', enAns: 'Synthesis and assembly of cellular proteins', field: 'Biología molecular', year: 'Biológico', diff: 'medium' },
  ];

  for (let cycle = 0; cycle < 100; cycle++) {
    for (let sIdx = 0; sIdx < sciFacts.length; sIdx++) {
      if (questions.length >= 3150) break;
      const f = sciFacts[sIdx];
      const others = sciFacts.filter((_, idx) => idx !== sIdx);
      const distractors = [
        others[(sIdx + 1 + cycle) % others.length].ans,
        others[(sIdx + 3 + cycle) % others.length].ans,
        others[(sIdx + 5 + cycle) % others.length].ans,
      ];
      const enDistractors = [
        others[(sIdx + 1 + cycle) % others.length].enAns,
        others[(sIdx + 3 + cycle) % others.length].enAns,
        others[(sIdx + 5 + cycle) % others.length].enAns,
      ];

      const qId = `sci_fact_${cycle}_${sIdx}`;
      const diff = f.diff as any;

      if (cycle % 3 === 0) {
        questions.push(buildTriviaQuestion(
          qId,
          'science_tech',
          diff,
          `¿Por cuál de los siguientes hitos científicos destaca ${f.topic}?`,
          `Which scientific milestone is associated with ${f.topic}?`,
          f.ans,
          f.enAns,
          distractors,
          enDistractors,
          `${f.topic} es célebre por: ${f.ans} (${f.field}, año ${f.year}).`,
          `${f.topic} is famed for: ${f.enAns} (${f.field}, ${f.year}).`,
          ['science_history', 'discoveries']
        ));
      } else if (cycle % 3 === 1) {
        const distTopics = [
          others[(sIdx + 2 + cycle) % others.length].topic,
          others[(sIdx + 4 + cycle) % others.length].topic,
          others[(sIdx + 6 + cycle) % others.length].topic,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'science_tech',
          diff,
          `¿A quién o a qué hito se atribuye: '${f.ans}'?`,
          `Who or what is credited with: '${f.enAns}'?`,
          f.topic,
          f.topic,
          distTopics,
          distTopics,
          `Corresponde a ${f.topic} en el campo de ${f.field} (${f.year}).`,
          `Attributed to ${f.topic} in ${f.field} (${f.year}).`,
          ['science_pioneers']
        ));
      } else {
        const distFields = [
          others[(sIdx + 1 + cycle) % others.length].field,
          others[(sIdx + 2 + cycle) % others.length].field,
          others[(sIdx + 3 + cycle) % others.length].field,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'science_tech',
          'medium',
          `¿En qué rama de la ciencia o tecnología se enmarca '${f.ans}' de ${f.topic}?`,
          `In which field of science or technology does '${f.enAns}' by ${f.topic} belong?`,
          f.field,
          f.field,
          distFields,
          distFields,
          `Se enmarca en ${f.field}, liderado por ${f.topic}.`,
          `Belongs to the field of ${f.field}, led by ${f.topic}.`,
          ['scientific_disciplines']
        ));
      }
    }
  }

  return questions;
}
