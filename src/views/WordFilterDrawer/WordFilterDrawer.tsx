import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { WordFilterFormData } from "../../types";
import { Drawer, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const StyledWordFilterDrawer = styled(Drawer)`
  .paper {
    min-height: 400px;
  }
  .filter-form {
    width: 100%;
    max-width: 400px;
  }
`;

export interface WordFilterDrawerProps {
  open: boolean;
  onClose?: () => void;
  onSearch?: (options: WordFilterFormData) => void;
  value: WordFilterFormData;
}

const WordFilterDrawer: React.FunctionComponent<WordFilterDrawerProps> = ({
  open,
  value,
  onSearch,
  onClose,
}) => {
  const [options, setOptions] = useState<WordFilterFormData>(value);

  const handleSearch = () => {
    onSearch?.(options);
  };

  const handleClear = () => {
    onSearch?.({ query: "" });
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string | undefined; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    if (name && value) {
      setOptions((state) => ({ ...state, [name]: value as string }));
    }
  };
  return (
    <StyledWordFilterDrawer
      open={open}
      anchor="right"
      onClose={onClose}
      PaperProps={{ className: "paper p-3 flex items-center" }}
    >
      <Grid container spacing={2} justify="center" className="filter-form">
        <Grid item xs={12} className="flex items-center justify-between">
          <Typography className="text-2xl font-bold">Filter</Typography>
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </Grid>
        <Grid item xs={12} className="mb-5">
          <TextField
            variant="outlined"
            label="Search"
            fullWidth
            name="query"
            onChange={handleChange}
            value={options.query}
          />
        </Grid>
        
        <Grid item xs={12} className="flex items-center">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            onClick={handleClear}
            className="ml-3"
          >
            clear
          </Button>
        </Grid>
      </Grid>
    </StyledWordFilterDrawer>
  );
};

export default WordFilterDrawer;
