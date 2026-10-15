import { TriviaQuestion } from '../../types';
import { buildTriviaQuestion } from './generatorUtils';

export function generateRetroGamesQuestions(): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  const retroFacts = [
    { game: 'Super Mario Bros.', year: '1985', dev: 'Nintendo (Shigeru Miyamoto)', hero: 'Mario', villain: 'Bowser (Rey Koopa)', item: 'Superchampiñón y Flor de Fuego', plat: 'NES (Famicom)', enFact: 'Rescues Princess Peach in the Mushroom Kingdom' },
    { game: 'The Legend of Zelda', year: '1986', dev: 'Nintendo', hero: 'Link', villain: 'Ganon', item: 'Trifuerza y Espada Maestra', plat: 'NES', enFact: 'First home console game with internal battery backup save' },
    { game: 'Pac-Man', year: '1980', dev: 'Namco (Toru Iwatani)', hero: 'Pac-Man', villain: 'Blinky, Pinky, Inky y Clyde', item: 'Píldoras de poder y frutas', plat: 'Arcade', enFact: 'Pioneered maze chases and cutscenes in video games' },
    { game: 'Space Invaders', year: '1978', dev: 'Taito (Tomohiro Nishikado)', hero: 'Cañón láser terrestre', villain: 'Invasores alienígenas en formación', item: 'Búnkeres protectores destruibles', plat: 'Arcade', enFact: 'Caused a temporary 100-yen coin shortage in Japan' },
    { game: 'Donkey Kong', year: '1981', dev: 'Nintendo', hero: 'Jumpman (después llamado Mario)', villain: 'Donkey Kong', item: 'Martillo de demolición', plat: 'Arcade', enFact: 'Debut of Mario and the modern platformer genre' },
    { game: 'Sonic the Hedgehog', year: '1991', dev: 'Sega (Sonic Team / Yuji Naka)', hero: 'Sonic el erizo azul supersónico', villain: 'Dr. Ivo Robotnik (Eggman)', item: 'Anillos dorados y Esmeraldas del Caos', plat: 'Sega Mega Drive / Genesis', enFact: 'Sega mascot created to rival Mario at blazing speed' },
    { game: 'Street Fighter II', year: '1991', dev: 'Capcom', hero: 'Ryu y Ken Masters', villain: 'M. Bison (dictador de Shadaloo)', item: 'Hadoken y Shoryuken', plat: 'Arcade (CPS-1)', enFact: 'Defined the 2D competitive fighting game tournament genre' },
    { game: 'Doom', year: '1993', dev: 'id Software (John Carmack y John Romero)', hero: 'Doom Slayer (Doomguy)', villain: 'Hordas de demonios del Infierno en Fobos', item: 'BFG 9000 y escopeta de dos cañones', plat: 'MS-DOS PC', enFact: 'Popularized first-person shooters and networked multiplayer' },
    { game: 'Tetris', year: '1984', dev: 'Alekséi Pázhitnov', hero: 'Los 7 Tetrominós geométricos', villain: 'La gravedad que acumula bloques', item: 'Línea cuádruple "Tetris"', plat: 'Elektronika 60 / Game Boy', enFact: 'Most ported puzzle game, bundled famously with Game Boy' },
    { game: 'Mega Man (Rockman)', year: '1987', dev: 'Capcom (Keiji Inafune)', hero: 'Mega Man (androide azul)', villain: 'Dr. Wily y los 6 Robot Masters', item: 'Mega Buster que copia armas de jefes', plat: 'NES', enFact: 'Known for letting players choose the order of boss stages' },
    { game: 'Metroid', year: '1986', dev: 'Nintendo (Gunpei Yokoi)', hero: 'Samus Aran (cazarrecompensas espacial)', villain: 'Mother Brain y los Piratas Espaciales', item: 'Morfosfera, Rayo de Hielo y Misiles', plat: 'NES', enFact: 'Famous for revealing the protagonist is a woman at the end' },
    { game: 'Castlevania', year: '1986', dev: 'Konami (Koji Igarashi más tarde)', hero: 'Simon Belmont (clan cazavampiros)', villain: 'Conde Drácula', item: 'Látigo Vampire Killer y agua bendita', plat: 'NES', enFact: 'Gothic action platformer featuring horror movie monsters' },
    { game: 'Mortal Kombat', year: '1992', dev: 'Midway (Ed Boon y John Tobias)', hero: 'Liu Kang, Raiden y Johnny Cage', villain: 'Shang Tsung y Goro', item: 'Movimientos finales "Fatality"', plat: 'Arcade', enFact: 'Photorealistic digitized sprites that led to the creation of the ESRB' },
    { game: 'Pokemon Rojo y Azul', year: '1996', dev: 'Game Freak (Satoshi Tajiri)', hero: 'Rojo (entrenador de Pueblo Paleta)', villain: 'Team Rocket y Giovanni', item: 'Pokéballs y Pokédex', plat: 'Game Boy', enFact: 'Ignited a global monster-catching trading phenomenon' },
    { game: 'Metal Gear Solid', year: '1998', dev: 'Konami (Hideo Kojima)', hero: 'Solid Snake', villain: 'Liquid Snake y FOXHOUND en Shadow Moses', item: 'Caja de cartón y radar Soliton', plat: 'PlayStation', enFact: 'Cinematic stealth action pioneer with Psycho Mantis 4th-wall break' },
    { game: 'Final Fantasy VII', year: '1997', dev: 'Square (Hironobu Sakaguchi)', hero: 'Cloud Strife (ex-SOLDADO de Shinra)', villain: 'Sefirot (Sephiroth)', item: 'Materia mágica y Espada Destructora', plat: 'PlayStation', enFact: 'Groundbreaking 3D JRPG with Aerith iconic tragic scene' },
    { game: 'Chrono Trigger', year: '1995', dev: 'Square (Dream Team: Sakaguchi, Horii, Toriyama)', hero: 'Crono, Marle y Lucca', villain: 'Lavos (parásito alienígena del núcleo)', item: 'Máquina del tiempo Epoch', plat: 'Super Nintendo (SNES)', enFact: 'Celebrated for multiple endings and active time battle combos' },
    { game: 'The Secret of Monkey Island', year: '1990', dev: 'Lucasfilm Games (Ron Gilbert)', hero: 'Guybrush Threepwood', villain: 'Pirata fantasma LeChuck', item: 'Duelos de insultos con espada y grog', plat: 'PC (SCUMM)', enFact: 'Hilarious point-and-click adventure with insult sword fighting' },
    { game: 'Asteroids', year: '1979', dev: 'Atari (Ed Logg y Lyle Rains)', hero: 'Nave espacial triangular vector', villain: 'Platillos volantes y rocas espaciales', item: 'Hiperespacio de emergencia', plat: 'Arcade vectorial', enFact: 'One of the first major hits utilizing vector graphic monitors' },
    { game: 'Galaga', year: '1981', dev: 'Namco', hero: 'Caza estelar Fighter', villain: 'Jefes Galaga con rayo tractor', item: 'Caza dual acoplado', plat: 'Arcade', enFact: 'Sequel to Galaxian featuring ship-capturing rescue mechanics' },
    { game: 'GoldenEye 007', year: '1997', dev: 'Rareware', hero: 'James Bond 007', villain: 'Alec Trevelyan (006) y General Ourumov', item: 'PP7 silenciada y reloj láser', plat: 'Nintendo 64', enFact: 'Redefined console FPS with legendary 4-player split-screen' },
    { game: 'Super Mario 64', year: '1996', dev: 'Nintendo (Shigeru Miyamoto)', hero: 'Mario', villain: 'Bowser dentro de los cuadros del castillo', item: '120 Estrellas de poder y Gorra alada', plat: 'Nintendo 64', enFact: 'Set the benchmark for analog 3D camera control and movement' },
    { game: 'Resident Evil', year: '1996', dev: 'Capcom (Shinji Mikami)', hero: 'Chris Redfield y Jill Valentine (S.T.A.R.S.)', villain: 'Albert Wesker y Corporación Umbrella', item: 'Hierba verde y cinta de máquina de escribir', plat: 'PlayStation', enFact: 'Coined the term Survival Horror in the Spencer Mansion' },
    { game: 'Silent Hill', year: '1999', dev: 'Konami (Team Silent)', hero: 'Harry Mason', villain: 'Dahlia Gillespie y el culto de la Orden', item: 'Radio que emite estática ante monstruos', plat: 'PlayStation', enFact: 'Used dense fog and psychological horror to mask hardware limits' },
    { game: 'Out Run', year: '1986', dev: 'Sega (Yu Suzuki)', hero: 'Conductor al volante del Ferrari Testarossa', villain: 'El cronómetro de bifurcaciones', item: 'Banda sonora seleccionable (Magical Sound Shower)', plat: 'Arcade hidráulico', enFact: 'Famous for fork-in-the-road branching routes and sunny blue skies' },
  ];

  for (let cycle = 0; cycle < 130; cycle++) {
    for (let rIdx = 0; rIdx < retroFacts.length; rIdx++) {
      if (questions.length >= 3150) break;
      const f = retroFacts[rIdx];
      const others = retroFacts.filter((_, idx) => idx !== rIdx);
      const distGames = [
        others[(rIdx + 1 + cycle) % others.length].game,
        others[(rIdx + 3 + cycle) % others.length].game,
        others[(rIdx + 5 + cycle) % others.length].game,
      ];

      const qId = `ret_fact_${cycle}_${rIdx}`;
      const diff = (rIdx % 3 === 0 ? 'easy' : rIdx % 3 === 1 ? 'medium' : 'hard') as any;

      if (cycle % 4 === 0) {
        questions.push(buildTriviaQuestion(
          qId,
          'retro_games',
          diff,
          `¿En qué videojuego clásico el protagonista es ${f.hero} y su archienemigo es ${f.villain}?`,
          `In which classic video game is ${f.hero} the hero fighting ${f.villain}?`,
          f.game,
          f.game,
          distGames,
          distGames,
          `${f.game} (${f.year}) presenta a ${f.hero} enfrentando a ${f.villain}.`,
          `${f.game} (${f.year}) stars ${f.hero} against ${f.villain}.`,
          ['retro_characters', 'video_games']
        ));
      } else if (cycle % 4 === 1) {
        const distDevs = [
          others[(rIdx + 1 + cycle) % others.length].dev,
          others[(rIdx + 2 + cycle) % others.length].dev,
          others[(rIdx + 4 + cycle) % others.length].dev,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'retro_games',
          diff,
          `¿Qué estudio o creador legendario desarrolló originalmente '${f.game}'?`,
          `Which legendary studio or designer originally developed '${f.game}'?`,
          f.dev,
          f.dev,
          distDevs,
          distDevs,
          `'${f.game}' fue creado por ${f.dev} y lanzado en ${f.year} para ${f.plat}.`,
          `'${f.game}' was created by ${f.dev} in ${f.year} for ${f.plat}.`,
          ['retro_studios']
        ));
      } else if (cycle % 4 === 2) {
        const distPlats = [
          others[(rIdx + 1 + cycle) % others.length].plat,
          others[(rIdx + 2 + cycle) % others.length].plat,
          others[(rIdx + 3 + cycle) % others.length].plat,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'retro_games',
          'medium',
          `¿En qué plataforma o sistema debutó '${f.game}' en el año ${f.year}?`,
          `On which hardware platform did '${f.game}' debut in ${f.year}?`,
          f.plat,
          f.plat,
          distPlats,
          distPlats,
          `'${f.game}' debutó en ${f.plat} en ${f.year}.`,
          `'${f.game}' debuted on ${f.plat} in ${f.year}.`,
          ['retro_consoles']
        ));
      } else {
        const distItems = [
          others[(rIdx + 1 + cycle) % others.length].item,
          others[(rIdx + 2 + cycle) % others.length].item,
          others[(rIdx + 3 + cycle) % others.length].item,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'retro_games',
          'hard',
          `¿Qué objeto, arma o elemento icónico pertenece al universo de '${f.game}'?`,
          `Which iconic item, power, or weapon belongs to the game '${f.game}'?`,
          f.item,
          f.item,
          distItems,
          distItems,
          `En '${f.game}', destaca: ${f.item}.`,
          `In '${f.game}', a signature item is: ${f.item}.`,
          ['retro_lore']
        ));
      }
    }
  }

  return questions;
}
