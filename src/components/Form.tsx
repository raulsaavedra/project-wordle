import { RefObject } from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  input: string;
  handleLetterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gameStatus: "win" | "lose" | "playing" | "guessing" | "goose";
}

export const Form = ({
  handleSubmit,
  inputRef,
  input,
  handleLetterChange,
  gameStatus,
}: FormProps) => {
  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          ref={inputRef}
          className="w-full bg-black border border-gray-500 rounded-md p-2 max-w-xs disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
          placeholder="Enter your guess"
          value={input}
          maxLength={5}
          minLength={5}
          onChange={(e) => handleLetterChange(e)}
          disabled={gameStatus !== "playing"}
        />
      </form>
    </div>
  );
};
