import { AnimatePresence } from "motion/react";
import { IRow } from "../types";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import React from "react";
import { CopyButton } from "../CopyButton";
import Image from "next/image";

interface FinishedProps {
  gameStatus: "win" | "lose" | "playing" | "guessing" | "goose";
  lastGuess?: string;
  rows: IRow[];
  answer: string;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
}

interface GameStatusMessageProps {
  children: React.ReactNode;
  variant: "win" | "lose" | "goose";
}

const GameStatusMessage = ({ children, variant }: GameStatusMessageProps) => {
  const variantStyles = {
    win: "text-2xl text-center",
    lose: "text-2xl text-center",
    goose: "text-xl text-center",
  };

  return (
    <div className={`${variantStyles[variant]} mt-1 font-semibold`}>
      {children}
    </div>
  );
};

export const Finished = ({
  gameStatus,
  lastGuess,
  rows,
  answer,
  handleOpenModal,
  handleCloseModal,
  isModalOpen,
}: FinishedProps) => {
  return (
    <div className="flex justify-center mt-8 max-w-xs text-center mx-auto">
      <AnimatePresence>
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) =>
            open ? handleOpenModal() : handleCloseModal()
          }
        >
          <DialogContent>
            <DialogTitle
              className={`text-2xl text-center ${
                gameStatus === "lose" ? "text-red-500" : "text-green-500"
              }`}
            >
              Game finished
            </DialogTitle>
            {gameStatus === "win" && (
              <GameStatusMessage variant="win">You win! 🎉</GameStatusMessage>
            )}
            {gameStatus === "lose" && (
              <GameStatusMessage variant="lose">You lose! ❌</GameStatusMessage>
            )}
            {gameStatus === "goose" && (
              <GameStatusMessage variant="goose">
                The actual answer is not {lastGuess?.toUpperCase()}, but the
                developer likes geese.{" "}
                <span className="text-green-500">Therefore, you win. 🪿</span>
                <div className="flex justify-center mt-5">
                  <Image
                    src="/goose.gif"
                    alt="honk"
                    width={400}
                    height={400}
                    quality={100}
                    className="rounded-2xl overflow-hidden"
                  />
                </div>
              </GameStatusMessage>
            )}
            <div className="flex gap-4 justify-center mt-3">
              <Button onClick={handleCloseModal}>Reset 🔃</Button>
              <CopyButton gameStatus={gameStatus} rows={rows} answer={answer} />
            </div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </div>
  );
};
