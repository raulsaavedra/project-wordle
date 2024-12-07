import { IRow } from "../types";
import { Letter } from "../Letter";

export const Row = ({ letters, activeRow, index }: IRow) => {
  const isGuessing = activeRow ? activeRow > index : false;
  return (
    <div className="flex gap-1.5 justify-center">
      {letters.map((letter, index) => (
        <Letter
          key={letter.id}
          letter={letter}
          isGuessing={isGuessing}
          index={index}
        />
      ))}
    </div>
  );
};
