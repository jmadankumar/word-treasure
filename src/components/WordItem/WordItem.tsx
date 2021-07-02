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
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

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
      <ListItem divider={!open} key={word.id}>
        <ListItemIcon onClick={() => setOpen((_open) => !_open)}>
          <Avatar src={word.image_url} className="capitalize">
            {word.text[0]}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={word.text}
          secondary={word.category}
          primaryTypographyProps={{ className: "capitalize" }}
          secondaryTypographyProps={{ className: "capitalize" }}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem divider={open}>
          <ListItemText>
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
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                onEdit?.(word);
                setOpen(false);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                onDelete?.(word);
                setOpen(false);
              }}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Collapse>
    </>
  );
};

export default WordItem;
