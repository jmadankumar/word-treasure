import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { Word } from "../../types/word";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { formatSubheading } from "../../helper/word";
import WordContent from "../WordContent";

export interface WordItemProps {
  word: Word;
  onEdit?: (word: Word) => void;
  onDelete?: (word: Word) => void;
}
const WordItem: React.FunctionComponent<WordItemProps> = ({
  word,
  onEdit,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem
        button
        divider={!open}
        key={word.id}
        onClick={() => setOpen(!open)}
      >
        <ListItemIcon onClick={() => setOpen((_open) => !_open)}>
          <Avatar src={word.image_url} className="capitalize">
            {word.text[0]}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={word.text}
          secondary={formatSubheading(word)}
          primaryTypographyProps={{ className: "capitalize" }}
          secondaryTypographyProps={{ className: "capitalize" }}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onEdit?.(word);
              setOpen(false);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onDelete?.(word);
              setOpen(false);
            }}
          >
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem divider={open}>
          <ListItemText>
            <WordContent word={word} />
          </ListItemText>
        </ListItem>
      </Collapse>
    </>
  );
};

export default WordItem;
