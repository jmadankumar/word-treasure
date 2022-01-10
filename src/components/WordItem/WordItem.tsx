import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { Word } from "../../types/word";
import Edit from "@material-ui/icons/Edit";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import MicIcon from "@material-ui/icons/Mic";
import { pronounceWord } from "../../helper/pronounce";
export interface WordItemProps {
  word: Word;
  onEdit?: (word: Word) => void;
  onPractice?: (word: Word) => void;
}
const WordItem: React.FunctionComponent<WordItemProps> = ({
  word,
  onEdit,
  onPractice,
}) => {
  return (
    <>
      <ListItem divider key={word.id}>
        <ListItemText
          primary={word.text}
          primaryTypographyProps={{ className: "capitalize" }}
        />
        <ListItemSecondaryAction>
          <Tooltip title="Practice">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onPractice?.(word);
              }}
            >
              <MicIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pronounce">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                pronounceWord(word.text);
              }}
            >
              <VolumeUpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onEdit?.(word);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default WordItem;
