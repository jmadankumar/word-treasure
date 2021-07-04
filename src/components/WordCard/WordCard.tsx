import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { Word } from "../../types";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import styled from "styled-components";
import { formatSubheading } from "../../helper/word";
import WordContent from "../WordContent";

const StyledWordCard = styled(Card)`
  .card-media {
    height: 0;
    padding-top: 50%;
  }
`;

export interface WordCardProps {
  word: Word;
  onEdit?: (word: Word) => void;
  onDelete?: (word: Word) => void;
}
const WordCard: React.FunctionComponent<WordCardProps> = ({
  word,
  onEdit,
  onDelete,
}) => {
  return (
    <StyledWordCard>
      <CardHeader title={word.text} subheader={formatSubheading(word)} />
      {word.image_url && (
        <CardMedia
          image={word.image_url}
          title={word.text}
          className="card-media"
        />
      )}
      <CardContent>
        <WordContent word={word} />
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => {
            onEdit?.(word);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            onDelete?.(word);
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </StyledWordCard>
  );
};

export default WordCard;
