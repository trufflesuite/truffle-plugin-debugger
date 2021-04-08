import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";

export const backgroundInherit = Colors.CHOCOLATE_200;
export const backgroundHighlight = Colors.YELLOW_200;
export const borderHighlight = Colors.ORANGE_300;

interface IHighlightProps {
  isCurrent: boolean;
}

const Row = styled.div`
  background: ${({ isCurrent }: IHighlightProps) =>
    isCurrent ? `${backgroundHighlight}` : `${backgroundInherit}`};
  border-color: ${({ isCurrent }: IHighlightProps) =>
    isCurrent ? `${borderHighlight}` : `${backgroundInherit}`};
  border-width: 1px;
  border-style: solid;
  border-radius: 0.4rem;
  width: fit-content;
  min-width: 100%;

  &:hover .fas.fa-dot-circle.faded {
    color: ${Colors.CI_RED};
    opacity: 0.5;
  }
`;

const LineContainer = styled.span`
  font-family: "Ubuntu Mono", monospace;
  white-space: pre;
  padding-left: 0.2rem;
  cursor: text;
`;

const LineNumber = styled.span`
  color: ${Colors.GRAY_300};
  padding-left: 0.2rem;
  cursor: pointer;
`;

interface IBreakpoint {
  isBreakpoint: boolean;
}

const Breakpoint = styled.i`
  text-align: center;
  display: inline-block;
  color: ${({ isBreakpoint }: IBreakpoint) =>
    isBreakpoint ? Colors.CI_RED : Colors.CHOCOLATE_200};
  cursor: pointer;
  padding-left: 0.2rem;
  width: 1.1rem;
  height: 1rem;
`;

export interface IProps {
  lineNumber: number;
  lineContents: string;
  isCurrent: boolean;
  breakpoints: any[];
  setBreakpoints: any;
  lineRef: any;
  sourceId: string;
  fileName: string;
  astId: number;
  lineNumberIndentLength: number;
}

const Line = ({
  lineNumber,
  lineContents,
  isCurrent,
  breakpoints,
  setBreakpoints,
  lineRef,
  sourceId,
  fileName,
  astId,
  lineNumberIndentLength,
}: IProps) => {
  const [isBreakpoint, updateBreakpoint] = useState(false);

  const start = () => {
    updateBreakpoint(
      breakpoints.filter(breakpoint => {
        return (
          breakpoint.line === lineNumber && breakpoint.sourceId === sourceId
        );
      }).length > 0
    );
  };

  const toggleBreakpoint = () => {
    updateBreakpoint(!isBreakpoint);

    if (isBreakpoint) {
      const filteredBreakpoints = breakpoints.filter(
        breakpoint =>
          breakpoint.line !== lineNumber || breakpoint.sourceId !== sourceId
      );
      setBreakpoints(filteredBreakpoints);
    } else {
      const breakpoint: any = {
        line: lineNumber,
        sourceId,
        compilationId: "shimmedcompilation",
        fileName,
        astId,
      };
      setBreakpoints((prev: any) => {
        return [...prev, breakpoint];
      });
    }
  };

  useEffect(() => {
    start();
  }, [breakpoints]);

  return (
    <Row
      key={`contract-source-${lineNumber}`}
      isCurrent={isCurrent}
      ref={lineRef}
    >
      <Breakpoint
        className={
          isBreakpoint ? "fas fa-dot-circle" : "fas fa-dot-circle faded"
        }
        isBreakpoint={isBreakpoint}
        onClick={toggleBreakpoint}
      />
      <LineContainer>
        <LineNumber onClick={toggleBreakpoint}>
          {` `.repeat(lineNumberIndentLength)}
          {lineNumber + 1}.{` `}
        </LineNumber>
        <span dangerouslySetInnerHTML={{ __html: lineContents }} />
      </LineContainer>
    </Row>
  );
};

export default Line;
