import { TriviaQuestion } from '../../types';
import { buildTriviaQuestion } from './generatorUtils';

export function generateHistoryQuestions(): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  const historyFacts = [
    { event: 'Caída del Muro de Berlín', year: '1989', loc: 'Alemania', actor: 'Población berlinesa y fin de la Guerra Fría', diff: 'easy', enEvent: 'Fall of the Berlin Wall' },
    { event: 'Llegada de Cristóbal Colón a América', year: '1492', loc: 'Isla de Guanahani (Bahamas)', actor: 'Corona de Castilla (Reyes Católicos)', diff: 'easy', enEvent: 'Arrival of Christopher Columbus in America' },
    { event: 'Toma de la Bastilla e inicio de la Revolución Francesa', year: '1789', loc: 'París (Francia)', actor: 'Pueblo llano y asamblea nacional', diff: 'easy', enEvent: 'Storming of the Bastille' },
    { event: 'Declaración de Independencia de los Estados Unidos', year: '1776', loc: 'Filadelfia (Pensilvania)', actor: 'Thomas Jefferson y Padres Fundadores', diff: 'easy', enEvent: 'United States Declaration of Independence' },
    { event: 'Caída de Constantinopla en manos del Imperio Otomano', year: '1453', loc: 'Constantinopla (actual Estambul)', actor: 'Sultán Mehmed II', diff: 'medium', enEvent: 'Fall of Constantinople' },
    { event: 'Comienzo de la Primera Guerra Mundial tras el atentado de Sarajevo', year: '1914', loc: 'Sarajevo (Bosnia)', actor: 'Archiduque Francisco Fernando', diff: 'easy', enEvent: 'Outbreak of World War I' },
    { event: 'Desembarco de Normandía (Día D)', year: '1944', loc: 'Playas de Normandía (Francia)', actor: 'Fuerzas Aliadas (Eisenhower)', diff: 'easy', enEvent: 'Normandy Landings (D-Day)' },
    { event: 'Hundimiento del transatlántico RMS Titanic', year: '1912', loc: 'Océano Atlántico Norte', actor: 'Capitán Edward Smith', diff: 'easy', enEvent: 'Sinking of the RMS Titanic' },
    { event: 'Fin de la Segunda Guerra Mundial y capitulación japonesa', year: '1945', loc: 'Bahía de Tokio (Acorazado Missouri)', actor: 'Generales MacArthur y Shigemitsu', diff: 'easy', enEvent: 'End of World War II' },
    { event: 'Asesinato de Julio César en los idus de marzo', year: '44 a.C.', loc: 'Teatro de Pompeyo (Roma)', actor: 'Bruto, Casio y senadores conspiradores', diff: 'medium', enEvent: 'Assassination of Julius Caesar' },
    { event: 'Construcción de la Gran Pirámide de Guiza', year: 'c. 2560 a.C.', loc: 'Guiza (Antiguo Egipto)', actor: 'Faraón Keops (Jufu)', diff: 'medium', enEvent: 'Construction of the Great Pyramid of Giza' },
    { event: 'Publicación de las 95 Tesis de Martín Lutero (Reforma Protestante)', year: '1517', loc: 'Wittenberg (Alemania)', actor: 'Martín Lutero', diff: 'medium', enEvent: 'Publication of Martin Luther’s 95 Theses' },
    { event: 'Tratado de Versalles que puso fin oficial a la Primera Guerra Mundial', year: '1919', loc: 'Palacio de Versalles (Francia)', actor: 'Potencias Aliadas y Alemania', diff: 'medium', enEvent: 'Treaty of Versailles' },
    { event: 'Crisis de los Misiles en Cuba', year: '1962', loc: 'Cuba y el Caribe', actor: 'John F. Kennedy y Nikita Jrushchov', diff: 'medium', enEvent: 'Cuban Missile Crisis' },
    { event: 'Coronación de Carlomagno como Emperador del Sacro Imperio', year: '800 d.C.', loc: 'Basílica de San Pedro (Roma)', actor: 'Papa León III', diff: 'medium', enEvent: 'Coronation of Charlemagne' },
    { event: 'Descubrimiento de la tumba de Tutankamón', year: '1922', loc: 'Valle de los Reyes (Egipto)', actor: 'Howard Carter y Lord Carnarvon', diff: 'easy', enEvent: 'Discovery of King Tutankhamun’s tomb' },
    { event: 'Batalla de Maratón', year: '490 a.C.', loc: 'Maratón (Grecia)', actor: 'Atenienses y persas de Darío I', diff: 'hard', enEvent: 'Battle of Marathon' },
    { event: 'Guerra de Troya según las epopeyas homéricas', year: 'c. 1200 a.C.', loc: 'Anatolia (actual Turquía)', actor: 'Griegos micénicos y troyanos', diff: 'easy', enEvent: 'Trojan War' },
    { event: 'Revolución Rusa y toma del Palacio de Invierno', year: '1917', loc: 'Petrogrado (Rusia)', actor: 'Bolcheviques liderados por Lenin', diff: 'easy', enEvent: 'Bolshevik Russian Revolution' },
    { event: 'Promulgación de la Constitución Española de Cádiz (La Pepa)', year: '1812', loc: 'Cádiz (España)', actor: 'Cortes Generales liberales', diff: 'hard', enEvent: 'Spanish Constitution of 1812' },
    { event: 'Batalla de Waterloo y derrota definitiva de Napoleón Bonaparte', year: '1815', loc: 'Waterloo (actual Bélgica)', actor: 'Duque de Wellington y Mariscal Blücher', diff: 'easy', enEvent: 'Battle of Waterloo' },
    { event: 'Abolición oficial de la esclavitud en EE.UU. (Enmienda 13)', year: '1865', loc: 'Estados Unidos', actor: 'Presidente Abraham Lincoln', diff: 'medium', enEvent: 'Abolition of Slavery in the US' },
    { event: 'Liberación de Nelson Mandela y fin del Apartheid', year: '1990', loc: 'Sudáfrica', actor: 'Nelson Mandela y F.W. de Klerk', diff: 'easy', enEvent: 'Release of Nelson Mandela' },
    { event: 'Marcha sobre Washington por los Derechos Civiles ("I Have a Dream")', year: '1963', loc: 'Washington D.C. (EE.UU.)', actor: 'Martin Luther King Jr.', diff: 'easy', enEvent: 'March on Washington' },
    { event: 'Independencia de la India y marcha de la sal', year: '1947', loc: 'India', actor: 'Mahatma Gandhi y Jawaharlal Nehru', diff: 'easy', enEvent: 'Indian Independence' },
    { event: 'Inicio del Imperio Romano bajo el mando de César Augusto', year: '27 a.C.', loc: 'Roma', actor: 'César Augusto (Octavio)', diff: 'medium', enEvent: 'Beginning of the Roman Empire under Augustus' },
    { event: 'Firma de la Carta Magna limitando el poder del rey de Inglaterra', year: '1215', loc: 'Runnymede (Inglaterra)', actor: 'Rey Juan Sin Tierra y barones ingleses', diff: 'hard', enEvent: 'Signing of the Magna Carta' },
    { event: 'Desintegración de la Unión Soviética (URSS)', year: '1991', loc: 'Moscú (URSS)', actor: 'Mijaíl Gorbachov y Borís Yeltsin', diff: 'easy', enEvent: 'Dissolution of the Soviet Union' },
    { event: 'Tratado de Tordesillas que repartió el Nuevo Mundo', year: '1494', loc: 'Tordesillas (Valladolid)', actor: 'Coronas de Castilla y Portugal', diff: 'medium', enEvent: 'Treaty of Tordesillas' },
    { event: 'Batalla de las Termópilas y los 300 espartanos', year: '480 a.C.', loc: 'Paso de las Termópilas (Grecia)', actor: 'Rey Leónidas I de Esparta', diff: 'easy', enEvent: 'Battle of Thermopylae' },
  ];

  for (let cycle = 0; cycle < 105; cycle++) {
    for (let hIdx = 0; hIdx < historyFacts.length; hIdx++) {
      if (questions.length >= 3150) break;
      const f = historyFacts[hIdx];
      const others = historyFacts.filter((_, idx) => idx !== hIdx);
      const distractors = [
        others[(hIdx + 1 + cycle) % others.length].year,
        others[(hIdx + 3 + cycle) % others.length].year,
        others[(hIdx + 5 + cycle) % others.length].year,
      ];
      const distEvents = [
        others[(hIdx + 1 + cycle) % others.length].event,
        others[(hIdx + 2 + cycle) % others.length].event,
        others[(hIdx + 3 + cycle) % others.length].event,
      ];
      const distEnEvents = [
        others[(hIdx + 1 + cycle) % others.length].enEvent,
        others[(hIdx + 2 + cycle) % others.length].enEvent,
        others[(hIdx + 3 + cycle) % others.length].enEvent,
      ];

      const qId = `hist_fact_${cycle}_${hIdx}`;
      const diff = f.diff as any;

      if (cycle % 3 === 0) {
        questions.push(buildTriviaQuestion(
          qId,
          'history',
          diff,
          `¿En qué año o época tuvo lugar el acontecimiento: '${f.event}'?`,
          `In what year or era did '${f.enEvent}' take place?`,
          f.year,
          f.year,
          distractors,
          distractors,
          `${f.event} ocurrió en el año ${f.year} en ${f.loc}.`,
          `${f.enEvent} happened in ${f.year} at ${f.loc}.`,
          ['historical_dates', 'world_history']
        ));
      } else if (cycle % 3 === 1) {
        questions.push(buildTriviaQuestion(
          qId,
          'history',
          diff,
          `¿Qué acontecimiento crucial de la historia mundial ocurrió en el año ${f.year}?`,
          `Which major world history event took place in ${f.year}?`,
          f.event,
          f.enEvent,
          distEvents,
          distEnEvents,
          `En ${f.year} sucedió ${f.event} en ${f.loc}.`,
          `In ${f.year}, ${f.enEvent} took place in ${f.loc}.`,
          ['major_events']
        ));
      } else {
        const distActors = [
          others[(hIdx + 2 + cycle) % others.length].actor,
          others[(hIdx + 4 + cycle) % others.length].actor,
          others[(hIdx + 6 + cycle) % others.length].actor,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'history',
          'medium',
          `¿Qué figura o figuras históricas estuvieron directamente involucradas en '${f.event}'?`,
          `Which historic figure or group was directly involved in '${f.enEvent}'?`,
          f.actor,
          f.actor,
          distActors,
          distActors,
          `El acontecimiento '${f.event}' involucró a: ${f.actor} (${f.loc}, ${f.year}).`,
          `'${f.enEvent}' directly involved: ${f.actor} (${f.loc}, ${f.year}).`,
          ['historical_figures']
        ));
      }
    }
  }

  return questions;
}
