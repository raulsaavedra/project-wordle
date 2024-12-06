import { motion } from "motion/react";
import { Letter as LetterType } from "./types";

interface LetterProps {
  letter: LetterType;
  isGuessing: boolean;
  index: number;
}

export const Letter = ({ letter, isGuessing, index }: LetterProps) => {
  const statusMap = {
    correct: {
      backgroundColor: "#008800",
    },
    incorrect: {
      backgroundColor: "#666666",
    },
    misplaced: {
      backgroundColor: "#888800",
    },
    default: {
      backgroundColor: "transparent",
    },
  } as const;

  return (
    <motion.div
      animate={isGuessing ? "guessing" : "default"}
      variants={{
        default: { backgroundColor: "transparent", rotateX: 0 },
        guessing: {
          backgroundColor: statusMap[letter.status].backgroundColor,
          rotateX: [0, 90, 0],
          transition: {
            backgroundColor: {
              delay: 0.2 + index * 0.25,
              duration: 0.25,
              ease: "easeInOut",
            },
            rotateX: {
              delay: 0 + index * 0.25,
              duration: 0.5,
              ease: "easeInOut",
            },
          },
        },
      }}
      className={`w-14 h-14 border border-white flex items-center justify-center`}
    >
      <span className="text-3xl font-bold uppercase">{letter.value}</span>
    </motion.div>
  );
};
