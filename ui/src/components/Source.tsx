import React, {
  createRef,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import SyntaxStyle from "./SyntaxStyle";
import Line from "./Line";

const SourceWrapper = styled.div`
  padding: 1rem 0.5rem;
  overflow-x: scroll;
  overflow-y: scroll;
  white-space: nowrap;
`;

interface IProps {
  activeLine: number;
  selectedLine: number;
  contractSource: string[];
  breakpoints: any[];
  setBreakpoints: any;
  visible: boolean;
  sourceIsActive: boolean;
  sourceId: string;
  fileName: string;
  astId: number;
}

const Source = ({
  activeLine,
  selectedLine,
  contractSource,
  breakpoints,
  setBreakpoints,
  visible,
  sourceIsActive,
  sourceId,
  fileName,
  astId,
}: IProps) => {
  const output: React.ReactNode[] = [];
  const [scrollTop, setScrollTop] = useState(0);
  const sourceRef = useRef<HTMLDivElement>(null);
  const lineDigitLength = contractSource.length.toString().length;

  let selectedLineRef: any;

  contractSource.forEach((line: string) => {
    const lineRef = createRef();
    if (output.length === selectedLine) {
      selectedLineRef = lineRef;
    }
    output.push(
      <Line
        lineNumber={output.length}
        lineContents={line}
        isCurrent={sourceIsActive && output.length === activeLine}
        breakpoints={breakpoints}
        setBreakpoints={setBreakpoints}
        key={`contract-source-${output.length}`}
        lineRef={lineRef}
        sourceId={sourceId}
        fileName={fileName}
        astId={astId}
        lineNumberIndentLength={
          lineDigitLength - (output.length + 1).toString().length
        }
      />
    );
  });

  useEffect(() => {
    if (selectedLineRef) {
      if (selectedLineRef.current) {
        selectedLineRef.current.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }
    }
  }, [selectedLine]);

  useLayoutEffect(() => {
    if (visible) {
      if (sourceRef.current !== null) {
        sourceRef.current.scrollTo({
          top: scrollTop,
          left: 0,
          behavior: "auto",
        });
      }
    }
  }, [visible]);

  const updateLine = (e: any) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <>
      {visible ? (
        <SourceWrapper onScroll={updateLine} ref={sourceRef}>
          <SyntaxStyle>{output}</SyntaxStyle>
        </SourceWrapper>
      ) : null}
    </>
  );
};

export default Source;
