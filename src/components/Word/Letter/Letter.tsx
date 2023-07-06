import styles from "./Letter.module.css";
import { MAX_INPUT_LETTERS } from "./Letter.constants";
import { ChangeEvent } from "react";

type LetterProps = {
  value: string;
};

type InputLetterProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const Letter = ({ value }: LetterProps) => {
  return <div className={styles.letter}>{value}</div>;
};

export const InputLetter = ({ onChange, value }: InputLetterProps) => {
  return (
    <input
      className={styles.letter}
      maxLength={MAX_INPUT_LETTERS}
      onChange={onChange}
      value={value}
    />
  );
};
