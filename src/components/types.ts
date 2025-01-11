export interface IRow {
  id: string;
  guess: Letter[];
  index: number;
}

export interface Letter {
  id: string;
  value: string;
  status: "correct" | "incorrect" | "misplaced" | "default";
}
