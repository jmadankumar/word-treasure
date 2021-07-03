import React from "react";
import styled from "styled-components";
import cn from "classnames";

const StyledPageTitle = styled.h3``;

export interface PageTitleProps {
  classNames?: string;
}
const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  children,
  classNames,
}) => {
  return (
    <StyledPageTitle
      className={cn("text-3xl font-bold capitalize", classNames)}
    >
      {children}
    </StyledPageTitle>
  );
};

export default PageTitle;
