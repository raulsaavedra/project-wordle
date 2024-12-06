export interface IRowList {
  rows: IRow[];
  activeRow?: number;
}

export interface IRow {
  id: string;
  letters: Letter[];
  index: number;
  activeRow?: number;
}

export interface Letter {
  id: string;
  value: string;
  status: "correct" | "incorrect" | "misplaced" | "default";
}
