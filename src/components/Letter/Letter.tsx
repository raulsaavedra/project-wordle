import { motion } from "motion/react";
import { Letter as LetterType } from "../types";

interface LetterProps {
  letter: LetterType;
  isGuessing: boolean;
  index: number;
}

export const statusMap = {
  correct: {
    backgroundColor: "rgb(20, 148, 47)",
    borderColor: "transparent",
  },
  incorrect: {
    backgroundColor: "rgb(102, 102, 102)",
    borderColor: "transparent",
  },
  misplaced: {
    backgroundColor: "rgb(138, 138, 0)",
    borderColor: "transparent",
  },
  default: {
    backgroundColor: "transparent",
    borderColor: "rgb(107, 114, 128)",
  },
} as const;

export const Letter = ({ letter, isGuessing, index }: LetterProps) => {
  return (
    <motion.div
      animate={isGuessing ? "guessing" : "default"}
      variants={{
        default: {
          backgroundColor: statusMap[letter.status].backgroundColor,
          borderColor: statusMap[letter.status].borderColor,
          rotateX: 0,
        },
        guessing: {
          backgroundColor: statusMap[letter.status].backgroundColor,
          borderColor: statusMap[letter.status].borderColor,
          rotateX: [0, 90, 0],
          transition: {
            backgroundColor: {
              delay: 0.2 + index * 0.25,
              duration: 0.25,
            },
            borderColor: {
              delay: 0.2 + index * 0.25,
              duration: 0.25,
            },
            rotateX: {
              delay: 0 + index * 0.25,
              duration: 0.5,
            },
          },
        },
      }}
      className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-solid border-gray-500`}
    >
      <span className="text-2xl md:text-3xl font-bold uppercase">
        {letter.value}
      </span>
    </motion.div>
  );
};
