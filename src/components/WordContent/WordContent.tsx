import React from "react";
import { Word } from "../../types";

export interface WordContentProps {
  word: Word;
}

const WordContent: React.FunctionComponent<WordContentProps> = ({ word }) => {
  return (
    <>
      <p className="mb-3">{word.description}</p>
      <div className="mb-3">
        <span className="font-semibold">Tamil -</span>
        <span className="ml-2">{word.translation.ta}</span>
      </div>
      <div className="mb-3">
        <span className="font-semibold">Hindi -</span>
        <span className="ml-2">{word.translation.hi}</span>
      </div>
    </>
  );
};

export default WordContent;
