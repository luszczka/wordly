import { useCallback, useEffect, useState } from "react";
import { Word } from "../Word/Word";
import { WORDS_COUNT } from "../Word/Word.constants";

import styles from "./WordList.module.css";

export const WordList = () => {
  const [words, setWords] = useState<string[]>([]);

  const passTypedWordToArray = (word: string) => {
    setWords([...words, word]);
  };
  console.log(words);
  return (
    <div className={styles.wordsWrapper}>
      {[...Array(WORDS_COUNT)].map((word, index) => (
        <Word
          // key={word.id}
          isGuessing={index === words.length}
          passTypedWordToArray={passTypedWordToArray}
        />
      ))}
    </div>
  );
};
