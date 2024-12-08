import { Letter } from "@/components/types";

type LetterStatus = Letter["status"];

/**
 * Core function to check a letter against an answer at a specific position
 */
const checkLetterInAnswer = (
  letter: string,
  answer: string,
  index: number
): { exactMatch: boolean; exists: boolean } => {
  const letterLower = letter.toLowerCase();
  const answerLower = answer.toLowerCase();
  
  return {
    exactMatch: letterLower === answerLower[index],
    exists: answerLower.includes(letterLower),
  };
};

/**
 * Convert a check result to a letter status
 */
const getStatusFromCheck = (
  check: ReturnType<typeof checkLetterInAnswer>
): LetterStatus => {
  if (check.exactMatch) return "correct";
  if (check.exists) return "misplaced";
  return "incorrect";
};

/**
 * Get status for a single letter guess
 */
export const guessLetter = (
  letter: string,
  index: number,
  answer: string
): Letter => {
  const check = checkLetterInAnswer(letter, answer, index);
  const status = getStatusFromCheck(check);

  return {
    id: crypto.randomUUID(),
    value: letter,
    status,
  };
};

/**
 * Convert a letter status to its emoji representation for sharing
 */
export const letterStatusToEmoji = (
  letter: string,
  answer: string,
  index: number
): string => {
  const check = checkLetterInAnswer(letter, answer, index);
  if (check.exactMatch) return "🟩";
  if (check.exists) return "🟨";
  return "⬛";
};

/**
 * Status hierarchy for determining the most relevant status
 */
const STATUS_HIERARCHY: LetterStatus[] = ["correct", "misplaced", "incorrect", "default"];

/**
 * Compare two statuses to determine which has higher precedence
 */
const compareStatus = (a: LetterStatus, b: LetterStatus): LetterStatus => {
  const aIndex = STATUS_HIERARCHY.indexOf(a);
  const bIndex = STATUS_HIERARCHY.indexOf(b);
  return aIndex <= bIndex ? a : b;
};

/**
 * Get the most relevant status for a letter across multiple guessed rows
 */
export const getKeyboardLetterStatus = (
  letter: string,
  rows: { letters: Letter[] }[]
): LetterStatus => {
  return rows.reduce((status, row) => {
    const letterStatuses = row.letters
      .filter((l) => l.value.toUpperCase() === letter)
      .map((l) => l.status);
    
    return letterStatuses.reduce(
      (currentStatus, newStatus) => compareStatus(currentStatus, newStatus),
      status
    );
  }, "default" as LetterStatus);
};
