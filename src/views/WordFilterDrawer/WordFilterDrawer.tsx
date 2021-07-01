import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { WordFilterOptions } from "../../types";
import { Drawer, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import useWordCategories from "../../hooks/useWordCategories";

export interface WordFilterDrawerProps {
  open: boolean;
  onClose?: () => void;
  onSearch?: () => void;
}

const StyledWordFilterDrawer = styled(Drawer)`
  .paper {
    min-height: 400px;
  }
  .filter-form {
    width: 100%;
    max-width: 600px;
  }
`;
const WordFilterDrawer: React.FunctionComponent<WordFilterDrawerProps> = ({
  open,
  onClose,
}) => {
  const categories = useWordCategories();
  const [filterOptions, setFilterOptions] = useState<WordFilterOptions>({
    query: "",
    category: "",
  });

  return (
    <StyledWordFilterDrawer
      open={open}
      anchor="bottom"
      onClose={onClose}
      PaperProps={{ className: "paper p-8 flex items-center" }}
    >
      <Grid container spacing={2} justify="center" className="filter-form">
        <Grid item xs={12} className="flex items-center justify-between">
          <Typography className="text-2xl font-bold">Filter</Typography>
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </Grid>
        <Grid item xs={12} className="mb-5">
          <TextField variant="outlined" label="Search" fullWidth />
        </Grid>
        <Grid item xs={12} className="mb-5">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              placeholder="Category"
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} className="flex items-center">
          <Button variant="contained" color="primary" disableElevation size="large">
            Search
          </Button>
        </Grid>
      </Grid>
    </StyledWordFilterDrawer>
  );
};

export default WordFilterDrawer;
