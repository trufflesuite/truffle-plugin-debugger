import React from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";

const TrayWrapper = styled.div`
  background: ${Colors.CHOCOLATE_200};
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1em;
  overflow-x: scroll;
  overflow-y: scroll;
`;

const Row = styled.div`
  margin: 0.1rem 0;
  cursor: pointer;
  padding: 0.25rem 0.1rem;
  border-width: 0.1rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${Colors.GRAY_100};
  }
`;

const Breakpoint = styled.span`
  margin-left: 0.4rem;
`;

const Icon = styled.span`
  color: ${Colors.CI_RED};
`;

const Badge = styled.span`
  background: ${Colors.CHOCOLATE_400};
  border: solid 1px ${Colors.CHOCOLATE_500};
  border-radius: 0.5rem;
  padding: 0.025rem 0.2rem;
  color: #fff;
`;

const Remove = styled.span`
  color: ${Colors.CHOCOLATE_400};
  margin-left: 0.25rem;
`;

export interface IProps {
  breakpoints: any;
  setBreakpoints: any;
  setActiveTabIndex: any;
  setSelectedLine: any;
}

const Tray = ({
  breakpoints,
  setBreakpoints,
  setActiveTabIndex,
  setSelectedLine,
}: IProps) => {
  const removeBreakpoint = (sourceId: number, lineNumber: number) => {
    const filteredBreakpoints = breakpoints.filter((breakpoint: any) => {
      return breakpoint.line !== lineNumber || breakpoint.sourceId !== sourceId;
    });
    setBreakpoints(filteredBreakpoints);
  };

  const jumptoLine = (astId: number, lineNumber: number) => {
    setActiveTabIndex(astId);
    setSelectedLine(lineNumber);
  };

  const list = breakpoints.map((breakpoint: any, index: number) => {
    const sourceId = breakpoint.sourceId;
    const fileName = breakpoint.fileName;
    const lineNumber = breakpoint.line;
    const astId = breakpoint.astId;
    return (
      <Row key={`tray-breakpoint-${index}`}>
        <Icon
          className={`fas fa-dot-circle`}
          onClick={() => removeBreakpoint(sourceId, lineNumber)}
        />
        <Breakpoint onClick={() => jumptoLine(astId, lineNumber)}>
          {fileName}
          <Badge>{lineNumber + 1}</Badge>
        </Breakpoint>
        <Remove
          className={`fas fa-times-circle`}
          onClick={() => removeBreakpoint(sourceId, lineNumber)}
        />
      </Row>
    );
  });

  return (
    <TrayWrapper>
      {list.length > 0
        ? list
        : `Add a breakpoint by clicking to the left of the line`}
    </TrayWrapper>
  );
};

export default Tray;
