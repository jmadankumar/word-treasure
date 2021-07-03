import { Button, Popover, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { WordSortByKey } from "../../types";

const sortByLabels: { [key in WordSortByKey]: string } = {
  alphabet: "A-Z",
  history: "Recently Added",
};

type SortOption = { value: WordSortByKey; label: string };

const sortOptions: SortOption[] = [
  {
    label: "Recently Added",
    value: "history",
  },
  {
    label: "A-Z",
    value: "alphabet",
  },
];
export interface WordSortingMenuProps {
  sortBy: WordSortByKey;
  onChange?: (sortBy: WordSortByKey) => void;
}

const WordSortingMenu: React.FunctionComponent<WordSortingMenuProps> = ({
  sortBy,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: WordSortByKey) => {
    onChange?.(value);
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="primary" onClick={handleClick} className="block">
        <span className="text-black mr-1 font-bold">Sort By: </span>
        <span className="mr-1">{sortByLabels[sortBy]}</span>
        <ExpandMoreIcon />
      </Button>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            selected={option.value === sortBy}
            onClick={() => handleSelect(option.value)}
            key={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

export default WordSortingMenu;
