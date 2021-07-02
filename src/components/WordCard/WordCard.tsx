import {
  Avatar,
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
      <CardHeader
        avatar={<Avatar src={word.image_url}>{word.text[0]}</Avatar>}
        title={word.text}
        subheader={word.category}
      />
      {word.image_url && (
        <CardMedia
          image={word.image_url}
          title={word.text}
          className="card-media"
        />
      )}
      <CardContent>
        <div className="mb-3">
          <span className="font-semibold">English</span>
          <span className="ml-2">{word.translation.en}</span>
        </div>
        <div className="mb-3">
          <span className="font-semibold"> Tamil</span>
          <span className="ml-2">{word.translation.ta}</span>
        </div>
        <div className="mb-3">
          <span className="font-semibold"> Hindi</span>
          <span className="ml-2">{word.translation.hi}</span>
        </div>
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
