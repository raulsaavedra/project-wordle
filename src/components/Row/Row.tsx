import { IRow } from "../types";
import { Letter } from "../Letter";
import { useContext } from "react";
import { GameContext } from "@/providers/GameProvider";

export const Row = ({ guess, index }: IRow) => {
  const { activeRow } = useContext(GameContext);
  const isGuessing = activeRow ? activeRow > index : false;
  return (
    <div className="flex gap-1.5 justify-center">
      {guess.map((letter, index) => (
        <Letter
          key={letter.id}
          letter={letter}
          index={index}
          isGuessing={isGuessing}
        />
      ))}
    </div>
  );
};
