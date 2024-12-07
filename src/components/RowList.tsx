import { IRowList } from "./types";
import { Row } from "./Row";

export const RowList = ({ rows, activeRow }: IRowList) => {
  return (
    <div className="flex flex-col gap-1.5 justify-center">
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
