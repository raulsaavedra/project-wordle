"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function Home() {
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
    <Wrapper>
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
    </Wrapper>
  );
}

interface IRowList {
  rows: IRow[];
  activeRow?: number;
}

const RowList = ({ rows, activeRow }: IRowList) => {
  return (
    <div className="flex flex-col gap-3 justify-center">
      {rows.map((row, index) => (
        <Row
          key={row.id}
          id={row.id}
          letters={row.letters}
          index={index}
          activeRow={activeRow ?? 0}
        />
      ))}
    </div>
  );
};

interface IRow {
  id: string;
  letters: Letter[];
  index: number;
  activeRow?: number;
}

interface Letter {
  id: string;
  value: string;
  status: "correct" | "incorrect" | "misplaced" | "default";
}

const Row = ({ letters, activeRow, index }: IRow) => {
  const isGuessing = activeRow ? activeRow > index : false;
  return (
    <div className="flex gap-2 justify-center">
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

const Letter = ({
  letter,
  isGuessing,
  index,
}: {
  letter: Letter;
  isGuessing: boolean;
  index: number;
}) => {
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
        // Animation explanation:
        // The state of each row is set all at once, but under the hood,
        // we animate the letters individually, by a delay effect based on the index.
        // Additionally, we do a little delay on backgroundColor to make it change in the middle of the rotation.
        // This creates a nice effect where the background color changes in the middle of the rotation.
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

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-10 h-full">
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  );
};
