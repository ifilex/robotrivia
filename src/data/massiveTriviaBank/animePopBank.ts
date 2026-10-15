import { TriviaQuestion } from '../../types';
import { buildTriviaQuestion } from './generatorUtils';

export function generateAnimePopQuestions(): TriviaQuestion[] {
  const questions: TriviaQuestion[] = [];

  const animeFacts = [
    { title: 'Dragon Ball Z', author: 'Akira Toriyama', hero: 'Son Goku (Kakarotto)', villain: 'Freezer, Cell y Majin Buu', power: 'Kamehameha y transformación Super Saiyajin', lore: 'Esferas del Dragón de Shenron' },
    { title: 'One Piece', author: 'Eiichiro Oda', hero: 'Monkey D. Luffy', villain: 'Los Cuatro Emperadores y el Gobierno Mundial', power: 'Fruta Gomu Gomu (Nika) y Haki del Conquistador', lore: 'Tesoro legendario One Piece en Laugh Tale' },
    { title: 'Naruto', author: 'Masashi Kishimoto', hero: 'Naruto Uzumaki', villain: 'Madara Uchiha y Organización Akatsuki', power: 'Rasengan y Chakra del Nueve Colas (Kurama)', lore: 'Aldea Oculta de la Hoja y título de Hokage' },
    { title: 'Bleach', author: 'Tite Kubo', hero: 'Ichigo Kurosaki', villain: 'Sōsuke Aizen y Yhwach', power: 'Zangetsu y Bankai (Tensa Zangetsu)', lore: 'Sociedad de Almas y los Shinigamis' },
    { title: 'Attack on Titan (Shingeki no Kyojin)', author: 'Hajime Isayama', hero: 'Eren Jaeger', villain: 'Titán Colosal y el Imperio de Marley', power: 'Titán de Ataque y Titán Fundador', lore: 'Murallas María, Rose y Sina en la Isla Paradis' },
    { title: 'Death Note', author: 'Tsugumi Ohba y Takeshi Obata', hero: 'L Lawliet (detective)', villain: 'Light Yagami (Kira)', power: 'Cuaderno Death Note que causa ataques cardíacos', lore: 'El shinigami Ryuk aficionado a las manzanas' },
    { title: 'Fullmetal Alchemist: Brotherhood', author: 'Hiromu Arakawa', hero: 'Edward Elric y Alphonse Elric', villain: 'Padre y los 7 Homúnculos', power: 'Alquimia sin círculo de transmutación', lore: 'Búsqueda de la Piedra Filosofal y la Ley del Intercambio Equivalente' },
    { title: 'Neon Genesis Evangelion', author: 'Hideaki Anno (Studio Gainax)', hero: 'Shinji Ikari', villain: 'Los Ángeles que atacan Tokio-3', power: 'Unidades mecha EVA y Campo AT', lore: 'Proyecto de Instrumentalización Humana de NERV' },
    { title: 'Demon Slayer (Kimetsu no Yaiba)', author: 'Koyoharu Gotouge', hero: 'Tanjiro Kamado y Nezuko', villain: 'Muzan Kibutsuji y las Doce Lunas Demoníacas', power: 'Respiración del Agua y Danza del Dios del Fuego', lore: 'Cuerpo de Exterminio de Demonios y los Pilares (Hashira)' },
    { title: 'Jujutsu Kaisen', author: 'Gege Akutami', hero: 'Yuji Itadori y Satoru Gojo', villain: 'Ryomen Sukuna y Kenjaku', power: 'Expansión de Dominio y Energía Maldita', lore: 'Los 20 dedos malditos de Sukuna' },
    { title: 'Hunter x Hunter', author: 'Yoshihiro Togashi', hero: 'Gon Freecss y Killua Zoldyck', villain: 'Meruem (Rey Hormiga Quimera) y Genei Ryodan', power: 'Sistema de aura Nen (Ten, Zetsu, Ren, Hatsu)', lore: 'Examen de Cazador profesional' },
    { title: 'Cowboy Bebop', author: 'Shinichiro Watanabe (Sunrise)', hero: 'Spike Spiegel y Jet Black', villain: 'Vicious del Sindicato Dragón Rojo', power: 'Artes marciales Jeet Kune Do y puntería Jericho 941', lore: 'Nave espacial Bebop y cazarrecompensas interestelares' },
    { title: 'My Hero Academia (Boku no Hero)', author: 'Kohei Horikoshi', hero: 'Izuku Midoriya (Deku) y All Might', villain: 'All For One y Tomura Shigaraki', power: 'Don transferible One For All', lore: 'Academia U.A. de superhéroes' },
    { title: 'Sailor Moon', author: 'Naoko Takeuchi', hero: 'Usagi Tsukino (Serena)', villain: 'Reina Beryl y el Reino Oscuro', power: 'Tiara lunar y Cristal de Plata', lore: 'Sailor Scouts guardianas del Sistema Solar' },
    { title: 'Saint Seiya (Los Caballeros del Zodiaco)', author: 'Masami Kurumada', hero: 'Seiya de Pegaso', villain: 'Hades, Poseidón y el Patriarca Saga', power: 'Cosmos interior y Meteoros de Pegaso', lore: 'Las doce casas del Santuario y las armaduras doradas de Atenea' },
    { title: 'JoJo\'s Bizarre Adventure', author: 'Hirohiko Araki', hero: 'Jotaro Kujo y el linaje Joestar', villain: 'Dio Brando (DIO)', power: 'Manifestaciones espirituales llamadas Stands (Star Platinum, The World)', lore: 'La máscara de piedra vampírica y el linaje de Jonathan Joestar' },
    { title: 'El Viaje de Chihiro (Spirited Away)', author: 'Hayao Miyazaki (Studio Ghibli)', hero: 'Chihiro Ogino (Sen)', villain: 'La bruja Yubaba de la casa de baños', power: 'Ayuda del dragón de río Haku', lore: 'Balneario para espíritus y ganador del Óscar al Mejor Filme Animado' },
    { title: 'Mi Vecino Totoro', author: 'Hayao Miyazaki (Studio Ghibli)', hero: 'Satsuki y Mei Kusakabe', villain: 'La enfermedad de su madre (drama cotidiano)', power: 'Magia de los espíritus del bosque y el Gatobús', lore: 'Totoro, el espíritu guardián del gran árbol alcanforero' },
    { title: 'Akira', author: 'Katsuhiro Otomo', hero: 'Shotaro Kaneda', villain: 'Tetsuo Shima y sus poderes telequinéticos', power: 'Poder psíquico destructivo incontrolable', lore: 'Neo-Tokio en el año 2019 tras la Tercera Guerra Mundial' },
    { title: 'Ghost in the Shell', author: 'Masamune Shirow (Mamoru Oshii)', hero: 'Mayor Motoko Kusanagi', villain: 'El Titiritero (Puppet Master)', power: 'Cuerpo cibernético completo y camuflaje termo-óptico', lore: 'Sección 9 de Seguridad Pública y la conciencia en la red' },
    { title: 'Pokémon', author: 'Satoshi Tajiri', hero: 'Ash Ketchum y Pikachu', villain: 'Team Rocket (Jessie, James y Meowth)', power: 'Ataques elementales e Impactrueno', lore: 'Convertirse en Maestro Pokémon ganando medallas de gimnasio' },
    { title: 'Digimon Adventure', author: 'Akiyoshi Hongo', hero: 'Tai Kamiya y Agumon', villain: 'Devimon, Myotismon y los Amos Oscuros', power: 'Digievolución a Greymon y WarGreymon', lore: 'Niños elegidos transportados al Mundo Digital' },
    { title: 'Chainsaw Man', author: 'Tatsuki Fujimoto', hero: 'Denji y Pochita', villain: 'Makima (Demonio del Control)', power: 'Motosierras en brazos y cabeza tirando de la cuerda de su pecho', lore: 'Cazadores de demonios de Seguridad Pública' },
    { title: 'Spy x Family', author: 'Tatsuya Endo', hero: 'Loid Forger (Twilight), Anya y Yor', villain: 'Extremistas que amenazan la paz entre Ostania y Westalis', power: 'Telepatía de Anya y habilidades asesinas de Yor', lore: 'Operación Strix y la prestigiosa Academia Eden' },
    { title: 'Berserk', author: 'Kentaro Miura', hero: 'Guts (El Espadachín Negro)', villain: 'Griffith (Femto de la Mano de Dios)', power: 'Espada colosal Dragonslayer y armadura Berserker', lore: 'Banda del Halcón y la marca del sacrificio' },
  ];

  for (let cycle = 0; cycle < 130; cycle++) {
    for (let aIdx = 0; aIdx < animeFacts.length; aIdx++) {
      if (questions.length >= 3150) break;
      const f = animeFacts[aIdx];
      const others = animeFacts.filter((_, idx) => idx !== aIdx);
      const distTitles = [
        others[(aIdx + 1 + cycle) % others.length].title,
        others[(aIdx + 3 + cycle) % others.length].title,
        others[(aIdx + 5 + cycle) % others.length].title,
      ];

      const qId = `ani_fact_${cycle}_${aIdx}`;
      const diff = (aIdx % 3 === 0 ? 'easy' : aIdx % 3 === 1 ? 'medium' : 'hard') as any;

      if (cycle % 4 === 0) {
        questions.push(buildTriviaQuestion(
          qId,
          'anime_pop',
          diff,
          `¿En qué famosa serie de anime/manga el protagonista es ${f.hero}?`,
          `In which famous anime/manga series is ${f.hero} the protagonist?`,
          f.title,
          f.title,
          distTitles,
          distTitles,
          `${f.hero} es el protagonista principal de '${f.title}', creado por ${f.author}.`,
          `${f.hero} is the main protagonist of '${f.title}', created by ${f.author}.`,
          ['anime_heroes', 'manga']
        ));
      } else if (cycle % 4 === 1) {
        const distAuthors = [
          others[(aIdx + 1 + cycle) % others.length].author,
          others[(aIdx + 2 + cycle) % others.length].author,
          others[(aIdx + 4 + cycle) % others.length].author,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'anime_pop',
          diff,
          `¿Quién es el célebre autor o creador de '${f.title}'?`,
          `Who is the renowned creator or mangaka of '${f.title}'?`,
          f.author,
          f.author,
          distAuthors,
          distAuthors,
          `'${f.title}' fue creado e ilustrado por ${f.author}.`,
          `'${f.title}' was created by ${f.author}.`,
          ['mangaka_authors']
        ));
      } else if (cycle % 4 === 2) {
        const distPowers = [
          others[(aIdx + 1 + cycle) % others.length].power,
          others[(aIdx + 2 + cycle) % others.length].power,
          others[(aIdx + 3 + cycle) % others.length].power,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'anime_pop',
          'medium',
          `¿Qué poder, técnica o habilidad característica define a '${f.title}'?`,
          `Which power or signature ability characterizes '${f.title}'?`,
          f.power,
          f.power,
          distPowers,
          distPowers,
          `En '${f.title}', destaca el poder: ${f.power}.`,
          `In '${f.title}', a signature power is: ${f.power}.`,
          ['anime_powers']
        ));
      } else {
        const distLore = [
          others[(aIdx + 1 + cycle) % others.length].lore,
          others[(aIdx + 2 + cycle) % others.length].lore,
          others[(aIdx + 3 + cycle) % others.length].lore,
        ];
        questions.push(buildTriviaQuestion(
          qId,
          'anime_pop',
          'hard',
          `¿A cuál de estas obras pertenece el concepto: '${f.lore}'?`,
          `Which story features the lore: '${f.lore}'?`,
          f.title,
          f.title,
          distTitles,
          distTitles,
          `'${f.lore}' forma parte del universo de '${f.title}'.`,
          `'${f.lore}' is part of '${f.title}'.`,
          ['anime_lore']
        ));
      }
    }
  }

  return questions;
}
