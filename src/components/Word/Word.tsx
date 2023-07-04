import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { InputLetter, Letter } from "./Letter/Letter";
import { MAX_LETTERS_IN_WORD } from "./Word.constants";
import styles from "./Word.module.css";

export const Word = () => {
  // const letters = ({ id, value }: LettersProps) => {
  //   return { id, value };
  // };

  // const leters = Array.from({ length: MAX_LETTERS_IN_WORD }, (value, index) => {
  //   return { id: index, value };
  // });
  // console.log(leters);

  const lettersConfig = Array.from(
    { length: MAX_LETTERS_IN_WORD },
    (value: string, index) => {
      return { id: index, value };
    }
  );

  const [letters, setLetters] = useState(lettersConfig);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const notEmptyLetter = letters.findLast((letter) => letter.value);
      if (event.code === "Backspace") {
        if (!notEmptyLetter) {
          return;
        }
        const newLetters = [...letters];
        newLetters[notEmptyLetter.id].value = "";
        setLetters(newLetters);
        return;
      }

      const emptyLetter = letters.find((letter) => !letter.value);
      if (emptyLetter) {
        const newLetters = [...letters];
        newLetters[emptyLetter.id].value = event.key;
        setLetters(newLetters);
      }
      return;
    },
    [letters]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className={styles.lettersWrapper}>
      {letters.map((letter) => {
        return <Letter key={letter.id} value={letter.value} />;
      })}
    </div>
  );
};
