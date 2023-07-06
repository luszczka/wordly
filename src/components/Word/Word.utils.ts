import { MAX_LETTERS_IN_WORD } from "./Word.constants";

export const lettersConfig = Array.from(
  { length: MAX_LETTERS_IN_WORD },
  (value: string, index) => {
    return { id: index, value };
  }
);
