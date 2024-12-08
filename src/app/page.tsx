import { Game } from "../components/Game";
import { Wrapper } from "../components/Wrapper";

export const metadata = {
  title: "Project Wordle",
  description: "Project Wordle",
};

export default function Home() {
  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
}
