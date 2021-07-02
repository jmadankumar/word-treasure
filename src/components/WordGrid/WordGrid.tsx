import { Grid } from "@material-ui/core";
import React from "react";
import { Word } from "../../types";
import WordCard from "../WordCard";

export interface WordGridProps {
  words: Word[];
  onEdit?: (word: Word) => void;
  onDelete?: (word: Word) => void;
  className?: string;
}

const WordGrid: React.FunctionComponent<WordGridProps> = ({
  words,
  onEdit,
  onDelete,
  className,
}) => {
  if (words.length === 0) {
    return null;
  }
  return (
    <Grid container spacing={2} className={className}>
      {words.map((word) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={word.id}>
          <WordCard word={word} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WordGrid;
