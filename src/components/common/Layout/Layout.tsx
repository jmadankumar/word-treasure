import React from "react";
import styled from "styled-components";
import Header from "../Header";

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  .main {
    margin-top: 4rem;
    width: 100%;
    height: calc(100% - 4rem);
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
`;

export interface LayoutProps {
  className?: string;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  className,
}) => {
  return (
    <StyledLayout id="page-container" className={className}>
      <Header />
      <main className="main">
        <div className="content p-3 pt-4 md:p-8">{children}</div>
      </main>
    </StyledLayout>
  );
};

export default Layout;
