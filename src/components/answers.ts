interface IAnswer {
  word: string;
  date: Date;
  index: number;
}

const createAnswerArray = () => {
  return words.map((word, index) => {
    const baseDate = new Date(2024, 11, 7);
    baseDate.setDate(baseDate.getDate() + (index ? index : 0));
    const date = baseDate;
    date.setHours(0, 0, 0, 0);
    return {
      word,
      date,
      index,
    } as IAnswer;
  });
};

const getAnswer = () => {
  const answers = createAnswerArray();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const answer = answers.find(
    (answer) => answer.date.getTime() === today.getTime()
  );
  if (!answer) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
  }
  return answer;
};

const words: string[] = [
  "BEACH",
  "APPLE",
  "CHAIR",
  "DANCE",
  "EAGLE",
  "FLAME",
  "GRAPE",
  "HEART",
  "IMAGE",
  "JUICE",
  "KNIFE",
  "LEMON",
  "MOUSE",
  "NIGHT",
  "OCEAN",
  "PIANO",
  "QUEEN",
  "RADIO",
  "SNAKE",
  "TIGER",
  "UNCLE",
  "VOICE",
  "WATER",
  "XENON",
  "YACHT",
  "ZEBRA",
  "BREAD",
  "CLOUD",
  "DREAM",
  "EARTH",
  "FLUTE",
  "GHOST",
  "HOUSE",
  "IVORY",
  "JELLY",
  "KOALA",
  "LIGHT",
  "MONEY",
  "NURSE",
  "OLIVE",
  "PEACH",
  "QUILT",
  "RIVER",
  "STORM",
  "TRAIN",
  "UMBRA",
  "VIRUS",
  "WHALE",
  "XYLON",
  "YOUTH",
  "BRAKE",
  "CRANE",
  "DRINK",
  "ELITE",
  "FLARE",
  "GREEN",
  "HAPPY",
  "INDEX",
  "JOKER",
  "KINGS",
  "LASER",
  "MAGIC",
  "NOBLE",
  "OASIS",
  "PAINT",
  "QUICK",
  "ROYAL",
  "SMILE",
  "TRACE",
  "ULTRA",
  "VALOR",
  "WORLD",
  "XEROX",
  "YIELD",
  "BLOOM",
  "CROWN",
  "DRAFT",
  "EMBER",
  "FROST",
  "GRACE",
  "HONEY",
  "IVORY",
  "JUDGE",
  "KNEEL",
  "LEARN",
  "MAPLE",
  "NORTH",
  "OPERA",
  "PULSE",
  "QUEST",
  "RIDGE",
  "STEAM",
  "TRUST",
  "UNITY",
  "VAULT",
  "WASTE",
  "XERIC",
  "YOUNG",
  "ZESTY",
  "BLITZ",
];

export { getAnswer };
