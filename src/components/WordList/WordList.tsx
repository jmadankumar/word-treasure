import { List } from "@material-ui/core";
import React from "react";
import { Word } from "../../types";
import WordItem from "../WordItem";

export interface WordListProps {
  words: Word[];
  onEdit?: (word: Word) => void;
  onDelete?: (word: Word) => void;
  className?: string;
}

const WordList: React.FunctionComponent<WordListProps> = ({
  words,
  onEdit,
  onDelete,
  className,
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
          onDelete={onDelete}
          key={word.id}
        />
      ))}
    </List>
  );
};

export default WordList;
