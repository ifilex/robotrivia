import { CategoryId, Difficulty, TriviaQuestion } from '../../types';

/**
 * Deterministic pseudo-random number generator (LCG)
 * ensures consistent option distribution without external dependencies.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function buildTriviaQuestion(
  id: string,
  category: CategoryId,
  difficulty: Difficulty,
  qEs: string,
  qEn: string,
  correctEs: string,
  correctEn: string,
  distractorsEs: string[],
  distractorsEn: string[],
  expEs: string,
  expEn: string,
  tags: string[] = []
): TriviaQuestion {
  // Filter out any distractor identical to correct answer
  const cleanDistEs: string[] = [];
  const cleanDistEn: string[] = [];

  for (let i = 0; i < distractorsEs.length; i++) {
    const dEs = distractorsEs[i];
    const dEn = distractorsEn[i] || dEs;
    if (dEs.toLowerCase() !== correctEs.toLowerCase() && !cleanDistEs.includes(dEs)) {
      cleanDistEs.push(dEs);
      cleanDistEn.push(dEn);
    }
  }

  // Ensure at least 3 distractors
  while (cleanDistEs.length < 3) {
    cleanDistEs.push(`N/A ${cleanDistEs.length + 1}`);
    cleanDistEn.push(`N/A ${cleanDistEn.length + 1}`);
  }

  // Pick 3 distractors deterministically based on id
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  const chosenDistEs = [cleanDistEs[0], cleanDistEs[1], cleanDistEs[2]];
  const chosenDistEn = [cleanDistEn[0], cleanDistEn[1], cleanDistEn[2]];

  // Determine correct index (0, 1, 2, 3) based on hash
  const correctPos = hash % 4;

  const optionsEs = [...chosenDistEs];
  optionsEs.splice(correctPos, 0, correctEs);

  const optionsEn = [...chosenDistEn];
  optionsEn.splice(correctPos, 0, correctEn);

  return {
    id,
    category,
    difficulty,
    question: { es: qEs, en: qEn },
    options: { es: optionsEs, en: optionsEn },
    correctIndex: correctPos,
    explanation: { es: expEs, en: expEn },
    tags,
  };
}
