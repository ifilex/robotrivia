import { TriviaQuestion } from '../../types';
import { buildTriviaQuestion } from './generatorUtils';

export function generateSportsQuestions(): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  const sportsFacts = [
    { athlete: 'Lionel Messi', sport: 'Fútbol', feat: '8 Balones de Oro y Campeón del Mundo 2022 con Argentina', team: 'FC Barcelona / Inter Miami', diff: 'easy' },
    { athlete: 'Pelé (Edson Arantes do Nascimento)', sport: 'Fútbol', feat: 'Único futbolista en ganar 3 Copas del Mundo (1958, 1962, 1970)', team: 'Santos FC y Selección de Brasil', diff: 'easy' },
    { athlete: 'Diego Armando Maradona', sport: 'Fútbol', feat: 'El "Gol del Siglo" y "La Mano de Dios" en México 1986', team: 'SSC Napoli y Selección de Argentina', diff: 'easy' },
    { athlete: 'Cristiano Ronaldo', sport: 'Fútbol', feat: 'Máximo goleador histórico del fútbol profesional y 5 Champions League', team: 'Real Madrid / Manchester United', diff: 'easy' },
    { athlete: 'Michael Jordan', sport: 'Baloncesto', feat: '6 anillos de la NBA y 6 veces MVP de las Finales invicto con los Bulls', team: 'Chicago Bulls', diff: 'easy' },
    { athlete: 'LeBron James', sport: 'Baloncesto', feat: 'Máximo anotador histórico de todos los tiempos en la NBA', team: 'Los Angeles Lakers / Cleveland Cavaliers', diff: 'easy' },
    { athlete: 'Kobe Bryant', sport: 'Baloncesto', feat: 'La "Mamba Mentality", 5 anillos de campeón y 81 puntos en un solo partido', team: 'Los Angeles Lakers', diff: 'easy' },
    { athlete: 'Stephen Curry', sport: 'Baloncesto', feat: 'Récord histórico de más triples encestados en la historia de la NBA', team: 'Golden State Warriors', diff: 'easy' },
    { athlete: 'Michael Phelps', sport: 'Natación', feat: 'El deportista más condecorado de los Juegos Olímpicos con 23 medallas de oro', team: 'Estados Unidos', diff: 'easy' },
    { athlete: 'Usain Bolt', sport: 'Atletismo', feat: 'Récords mundiales de 100 metros (9.58s) y 200 metros (19.19s)', team: 'Jamaica', diff: 'easy' },
    { athlete: 'Rafael Nadal', sport: 'Tenis', feat: 'El "Rey de la Tierra Batida" con 14 títulos de Roland Garros', team: 'España', diff: 'easy' },
    { athlete: 'Roger Federer', sport: 'Tenis', feat: 'Elegancia pura con 20 títulos de Grand Slam y 8 coronas en Wimbledon', team: 'Suiza', diff: 'easy' },
    { athlete: 'Novak Djokovic', sport: 'Tenis', feat: 'Récord histórico masculino de títulos de Grand Slam (más de 24)', team: 'Serbia', diff: 'easy' },
    { athlete: 'Serena Williams', sport: 'Tenis', feat: '23 títulos individuales de Grand Slam en la Era Abierta', team: 'Estados Unidos', diff: 'easy' },
    { athlete: 'Ayrton Senna', sport: 'Fórmula 1', feat: 'Triple campeón mundial y maestro absoluto en circuitos bajo lluvia', team: 'McLaren Honda', diff: 'easy' },
    { athlete: 'Michael Schumacher', sport: 'Fórmula 1', feat: '7 campeonatos mundiales y era dorada de la Scuderia Ferrari', team: 'Ferrari / Benetton', diff: 'easy' },
    { athlete: 'Lewis Hamilton', sport: 'Fórmula 1', feat: '7 campeonatos del mundo y más de 100 victorias en Grandes Premios', team: 'Mercedes AMG F1', diff: 'easy' },
    { athlete: 'Muhammad Ali (Cassius Clay)', sport: 'Boxeo', feat: '"Vuela como una mariposa, pica como una abeja" y Rumble in the Jungle', team: 'Pesos Pesados', diff: 'easy' },
    { athlete: 'Mike Tyson', sport: 'Boxeo', feat: 'El campeón mundial de peso pesado más joven de la historia con 20 años', team: 'Pesos Pesados', diff: 'easy' },
    { athlete: 'Nadia Comaneci', sport: 'Gimnasia artística', feat: 'Primera gimnasta en lograr una puntuación perfecta de 10.0 en Montreal 1976', team: 'Rumanía', diff: 'easy' },
    { athlete: 'Simone Biles', sport: 'Gimnasia artística', feat: 'Gimnasta más laureada de todos los tiempos con múltiples elementos propios', team: 'Estados Unidos', diff: 'easy' },
    { athlete: 'Jesse Owens', sport: 'Atletismo', feat: '4 medallas de oro en los Juegos Olímpicos de Berlín 1936 ante Hitler', team: 'Estados Unidos', diff: 'medium' },
    { athlete: 'Eddy Merckx', sport: 'Ciclismo', feat: 'El "Caníbal", 5 Tours de Francia, 5 Giros de Italia y 1 Vuelta a España', team: 'Molteni / Bélgica', diff: 'medium' },
    { athlete: 'Miguel Induráin', sport: 'Ciclismo', feat: '5 Tours de Francia consecutivos y oro olímpico contrarreloj', team: 'Banesto / España', diff: 'medium' },
    { athlete: 'Carl Lewis', sport: 'Atletismo', feat: 'El "Hijo del Viento", 9 oros olímpicos en 100m, 200m y salto de longitud', team: 'Estados Unidos', diff: 'medium' },
  ];

  for (let cycle = 0; cycle < 130; cycle++) {
    for (let sIdx = 0; sIdx < sportsFacts.length; sIdx++) {
      if (questions.length >= 3150) break;
      const f = sportsFacts[sIdx];
      const others = sportsFacts.filter((_, idx) => idx !== sIdx);
      const distAthletes = [
        others[(sIdx + 1 + cycle) % others.length].athlete,
        others[(sIdx + 3 + cycle) % others.length].athlete,
        others[(sIdx + 5 + cycle) % others.length].athlete,
      ];

      const qId = `spt_fact_${cycle}_${sIdx}`;
      const diff = f.diff as any;

      if (cycle % 4 === 0) {
        questions.push(buildTriviaQuestion(
          qId,
          'sports',
          diff,
          `¿Qué legendario deportista es reconocido por la hazaña: '${f.feat}'?`,
          `Which legendary athlete is famed for: '${f.feat}'?`,
          f.athlete,
          f.athlete,
          distAthletes,
          distAthletes,
          `${f.athlete} compitió en ${f.sport} y logró: ${f.feat}.`,
          `${f.athlete} competed in ${f.sport} and achieved: ${f.feat}.`,
          ['sports_legends', 'world_records']
        ));
      } else if (cycle % 4 === 1) {
        const distFeats = [
          others[(sIdx + 1 + cycle) % others.length].feat,
          others[(sIdx + 2 + cycle) % others.length].feat,
          others[(sIdx + 4 + cycle) % others.length].feat,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'sports',
          diff,
          `¿Cuál de estos logros históricos pertenece a la carrera de ${f.athlete}?`,
          `Which historic milestone belongs to the career of ${f.athlete}?`,
          f.feat,
          f.feat,
          distFeats,
          distFeats,
          `${f.athlete} es sinónimo de: ${f.feat} (${f.team}).`,
          `${f.athlete} is celebrated for: ${f.feat} (${f.team}).`,
          ['sports_records']
        ));
      } else if (cycle % 4 === 2) {
        const allSports = ['Fútbol', 'Baloncesto', 'Tenis', 'Natación', 'Atletismo', 'Fórmula 1', 'Boxeo', 'Ciclismo', 'Gimnasia artística'];
        questions.push(buildTriviaQuestion(
          qId,
          'sports',
          'easy',
          `¿En qué disciplina deportiva triunfó mundialmente ${f.athlete}?`,
          `In which sport did ${f.athlete} achieve worldwide glory?`,
          f.sport,
          f.sport,
          allSports.filter(s => s !== f.sport).slice(0, 3),
          allSports.filter(s => s !== f.sport).slice(0, 3),
          `${f.athlete} es una figura histórica en el deporte de ${f.sport}.`,
          `${f.athlete} is an icon in ${f.sport}.`,
          ['sports_categories']
        ));
      } else {
        const distTeams = [
          others[(sIdx + 1 + cycle) % others.length].team,
          others[(sIdx + 2 + cycle) % others.length].team,
          others[(sIdx + 3 + cycle) % others.length].team,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'sports',
          'medium',
          `¿Con qué equipo, selección o categoría está estrechamente asociado ${f.athlete}?`,
          `With which team, national squad, or category is ${f.athlete} closely linked?`,
          f.team,
          f.team,
          distTeams,
          distTeams,
          `${f.athlete} destacó con: ${f.team}.`,
          `${f.athlete} is famous for their time with: ${f.team}.`,
          ['sports_teams']
        ));
      }
    }
  }

  return questions;
}
