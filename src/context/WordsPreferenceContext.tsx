import React, { useContext, useState } from "react";
import { StorageConstant } from "../config/constants";
import { WordSortByKey, WordViewLayout } from "../types";

export interface WordsPreferenceValue {
  sortBy: WordSortByKey;
  setSortBy: (sortBy: WordSortByKey) => void;
  layout: WordViewLayout;
  setLayout: (layout: WordViewLayout) => void;
}

const defaultValue: WordsPreferenceValue = {
  sortBy: "history",
  setSortBy: () => {},
  layout: "list",
  setLayout: () => {},
};

export const WordsPreferenceContext =
  React.createContext<WordsPreferenceValue>(defaultValue);

export const WordPreferenceConsumer = WordsPreferenceContext.Consumer;

export const WordPreferenceProvider: React.FunctionComponent = ({
  children,
}) => {
  const [sortBy, _setSortBy] = useState<WordSortByKey>(
    (localStorage.getItem(StorageConstant.WORDS_SORT_BY) as WordSortByKey) ??
      "history"
  );
  const [layout, _setLayout] = useState<WordViewLayout>(
    (localStorage.getItem(StorageConstant.WORDS_LAYOUT) as WordViewLayout) ??
      "list"
  );

  const setSortBy = (newSortBy: WordSortByKey) => {
    localStorage.setItem(StorageConstant.WORDS_SORT_BY, newSortBy);
    _setSortBy(newSortBy);
  };

  const setLayout = (newLayout: WordViewLayout) => {
    localStorage.setItem(StorageConstant.WORDS_LAYOUT, newLayout);
    _setLayout(newLayout);
  };

  return (
    <WordsPreferenceContext.Provider
      value={{ sortBy, setSortBy, layout, setLayout }}
    >
      {children}
    </WordsPreferenceContext.Provider>
  );
};

export const useWordPreference = () => useContext(WordsPreferenceContext);
