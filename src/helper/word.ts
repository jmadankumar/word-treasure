import { Word } from "../types";

export function formatSubheading(word: Word) {
  let subHeading = "";

  if (word.topic) {
    subHeading += `${word.topic}, `;
  }
  subHeading += word.category;
  return subHeading;
}
