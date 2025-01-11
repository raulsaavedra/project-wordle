"use client";

import { RowList } from "../RowList";
import { Finished } from "../Finished";
import { Keyboard } from "../Keyboard/Keyboard";
import { Header } from "../Header";
import { GameProvider } from "@/providers/GameProvider";

export const Game = () => {
  return (
    <div className="pb-10">
      <GameProvider>
        <Header />
        <RowList />
        <Keyboard />
        <Finished />
      </GameProvider>
    </div>
  );
};
