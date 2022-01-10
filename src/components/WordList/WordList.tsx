import { List } from "@material-ui/core";
import React from "react";
import { Word } from "../../types";
import WordItem from "../WordItem";

export interface WordListProps {
  words: Word[];
  onEdit?: (word: Word) => void;
  onPractice?: (word: Word) => void;
  className?: string;
}

const WordList: React.FunctionComponent<WordListProps> = ({
  words,
  onEdit,
  className,
  onPractice,
}) => {
  if (words.length === 0) {
    return null;
  }
  return (
    <List disablePadding className={className}>
      {words.map((word) => (
        <WordItem
          word={word}
          onEdit={onEdit}
          key={word.id}
          onPractice={onPractice}
        />
      ))}
    </List>
  );
};

export default WordList;
