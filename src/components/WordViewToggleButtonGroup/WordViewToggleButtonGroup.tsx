import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { WordViewLayout } from "../../types";

export interface WordViewToggleButtonGroupProps {
  value: WordViewLayout;
  onChange: (selectedLayout: WordViewLayout) => void;
}

const WordViewToggleButtonGroup: React.FunctionComponent<WordViewToggleButtonGroupProps> =
  ({ value, onChange }) => {
    return (
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(event, value) => onChange?.(value)}
      >
        <ToggleButton value="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="grid">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };

export default WordViewToggleButtonGroup;
