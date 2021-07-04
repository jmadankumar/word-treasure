import React from "react";

const Container: React.FunctionComponent = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-5/6 xl:w-2/3">{children}</div>
    </div>
  );
};

export default Container;
