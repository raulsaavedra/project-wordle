import { GameContext } from "@/providers/GameProvider";
import { Row } from "../Row";
import { useContext } from "react";

export const RowList = () => {
  const { rows } = useContext(GameContext);
  return (
    <div className="flex flex-col gap-1.5 justify-center">
      {rows.map((row, index) => (
        <Row key={row.id} id={row.id} guess={row.guess} index={index} />
      ))}
    </div>
  );
};
