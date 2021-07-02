import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import { WordSortByKey } from "../../types";

export interface WordSortingTabsProps {
  sortBy: WordSortByKey;
  onChange?: (sortBy: WordSortByKey) => void;
}

const WordSortingTabs: React.FunctionComponent<WordSortingTabsProps> = ({
  sortBy,
  onChange,
}) => {
  return (
    <div className="flex items-center mb-5">
      <div className="mr-3">Sort By</div>
      <Tabs
        value={sortBy}
        className="flex-grow"
        onChange={(event, value) => onChange?.(value as WordSortByKey)}
      >
        <Tab value="history" label="Recently Added" />
        <Tab value="alphabet" label="A-Z" />
      </Tabs>
    </div>
  );
};

export default WordSortingTabs;
