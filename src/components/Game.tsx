"use client";
import { useState } from "react";
import { IRow, Letter } from "./types";
import { RowList } from "./RowList";

export const Game = () => {
  const answer = "SMART";

  const defaultRows = Array.from({ length: 6 }, (_, rowIndex) => ({
    id: crypto.randomUUID(),
    index: rowIndex,
    letters: Array.from({ length: 5 }, (_, letterIndex) => ({
      index: letterIndex,
      id: crypto.randomUUID(),
      value: "",
      status: "default",
    })) as Letter[],
  }));

  const [rows, setRows] = useState<IRow[]>(defaultRows);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (rows.length === activeRow) return;
    e.preventDefault();
    const newRows = [...rows];
    newRows[activeRow].letters = input
      .split("")
      .map((letter: string, index: number) => {
        let status: Letter["status"] = "default";

        const answerLower = answer.toLowerCase();
        const letterLower = letter.toLowerCase();

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
      });
    setRows(newRows);
    setActiveRow(activeRow + 1);
    setInput("");
  };

  const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let index;
    let inputLetter;

    if (input.length > value.length) {
      index = value.length;
      inputLetter = "";
    } else {
      index = input.length;
      inputLetter = value[value.length - 1];
    }

    const newRows = [...rows];
    const updatedRow = newRows[activeRow];

    updatedRow.letters[index].value = inputLetter;

    setInput(value);
    setRows(newRows);
  };

  return (
    <>
      <RowList rows={rows} activeRow={activeRow} />
      <div className="flex justify-center mt-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full bg-black border border-white rounded-md p-2 max-w-xs"
            placeholder="Enter your guess"
            value={input}
            maxLength={5}
            minLength={5}
            onChange={(e) => handleLetterChange(e)}
          />
        </form>
      </div>
    </>
  );
};
