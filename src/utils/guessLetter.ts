import { Letter } from "@/components/types";

export const guessLetter = (
  letter: string,
  index: number,
  answer: string
): Letter => {
  const answerLower = answer.toLowerCase();
  const letterLower = letter.toLowerCase();
  let status: Letter["status"] = "default";

  if (letterLower === answerLower[index]) {
    status = "correct";
  } else if (answerLower.includes(letterLower)) {
    status = "misplaced";
  } else {
    status = "incorrect";
  }

  return {
    id: crypto.randomUUID(),
    value: letter,
    status,
  };
};
