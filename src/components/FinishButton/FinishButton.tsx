import React from "react";
import { IRow } from "../types";
import { CopyButton } from "../CopyButton/CopyButton";

interface FinishButtonProps {
  gameStatus: string;
  rows: IRow[];
  answer: string;
  onReset: () => void;
}

export const FinishButton: React.FC<FinishButtonProps> = ({
  gameStatus,
  rows,
  answer,
  onReset,
}) => {
  return (
    <div className="flex gap-4 justify-center mt-3">
      <button
        onClick={onReset}
        className="px-5 py-2 bg-gray-700 text-white text-xl rounded-xl hover:bg-gray-500 transition-colors font-semibold"
      >
        Reset 🔃
      </button>
      <CopyButton gameStatus={gameStatus} rows={rows} answer={answer} />
    </div>
  );
};
