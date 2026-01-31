import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 }
});

export function generateText(keyConfig, amount) {
  const type = keyConfig.type;

  if (type === "words") {
    return lorem.generateWords(amount);
  }

  if (type === "chars") {
    return lorem.generateWords(Math.ceil(amount / 5)).slice(0, amount);
  }

  return "";
}
