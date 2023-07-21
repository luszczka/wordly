import { useCallback, useEffect, useState } from "react";
import { Letter } from "./Letter/Letter";
import styles from "./Word.module.css";
import { lettersConfig } from "./Word.utils";
import { MAX_LETTERS_IN_WORD } from "./Word.constants";

export const EmptyWord = () => {
  return (
    <div className={styles.emptyLettersWrapper}>
      {[...Array(MAX_LETTERS_IN_WORD)].map((word, index) => (
        <Letter key={index} />
      ))}
    </div>
  );
};

type FulfilledWordProps = {
  value: string;
};

export const FulfilledWord = ({ value }: FulfilledWordProps) => {
  return (
    <div className={styles.emptyLettersWrapper}>
      {[...value].map((letter, index) => {
        return <Letter key={letter + index} value={letter} />;
      })}
    </div>
  );
};

type GuessingWordProps = {
  passTypedWordToArray: (word: string) => void;
};

export const GuessingWord = ({ passTypedWordToArray }: GuessingWordProps) => {
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
      if (emptyLetter && /\p{L}/u.test(event.key) && event.key.length === 1) {
        const newLetters = [...letters];
        newLetters[emptyLetter.id].value = event.key;
        setLetters(newLetters);
        if (!letters.find((letter) => !letter.value)) {
          const word = letters.map((letter) => letter.value).join("");
          passTypedWordToArray(word);
          newLetters.map((letter) => (letter.value = ""));
          setLetters(newLetters);
        }
      }
      return;
    },
    [letters, passTypedWordToArray]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className={styles.lettersWrapper}>
      {letters.map((letter) => (
        <Letter key={letter.id} value={letter.value} />
      ))}
    </div>
  );
};

type WordProps = {
  isGuessing?: boolean;
  passTypedWordToArray: (word: string) => void;
  values?: string[];
};

export const Word = ({
  isGuessing,
  passTypedWordToArray,
  values,
}: WordProps) => {
  console.log(values);
  if (isGuessing) {
    return <GuessingWord passTypedWordToArray={passTypedWordToArray} />;
  }

  if (values && values.length > 0) {
    return (
      <div>
        {values.map((value) => (
          <FulfilledWord value={value} />
        ))}
      </div>
    );
  }

  return <EmptyWord />;
};
