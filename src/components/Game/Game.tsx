"use client";

import { RowList } from "../RowList";
import { Finished } from "../Finished";
import { Keyboard } from "../Keyboard/Keyboard";
import { Header } from "../Header";
import { GameProvider } from "@/providers/GameProvider";

export const Game = () => {
  return (
    <GameProvider>
      <div className="pb-10">
        <Header />
        <RowList />
        <Keyboard />
        <Finished />
      </div>
    </GameProvider>
  );
};
