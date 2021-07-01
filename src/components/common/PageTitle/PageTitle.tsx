import React from "react";
import styled from "styled-components";

const StyledPageTitle = styled.h3``;

const PageTitle: React.FunctionComponent = ({ children }) => {
  return (
    <StyledPageTitle className="text-3xl font-bold capitalize mb-8">
      {children}
    </StyledPageTitle>
  );
};

export default PageTitle;
