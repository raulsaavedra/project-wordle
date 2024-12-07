import { AnimatePresence, motion } from "motion/react";

interface FinishedProps {
  gameStatus: "win" | "lose" | "playing" | "guessing" | "goose";
  lastGuess?: string;
}

export const Finished = ({ gameStatus, lastGuess }: FinishedProps) => {
  return (
    <div className="flex justify-center mt-8 max-w-xs text-center mx-auto">
      <AnimatePresence>
        {gameStatus === "win" && (
          <motion.div
            className="text-green-500 text-2xl font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.5,
            }}
          >
            You win! 🎉
          </motion.div>
        )}
        {gameStatus === "lose" && (
          <motion.div
            className="text-red-500 text-2xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            You lose! ❌
          </motion.div>
        )}
        {gameStatus === "goose" && (
          <motion.div
            className="text-white-500 text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            The actual answer is not {lastGuess?.toUpperCase()}, but the
            developer likes geese.{" "}
            <span className="text-green-500">Therefore, you win. 🪿</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
