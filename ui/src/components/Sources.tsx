import React, { useState } from "react";
import Source from "./Source";
import unified from "unified";
import stringify from "rehype-dom-stringify";
import low from "lowlight";
import { definer } from "highlightjs-solidity";

interface IProps {
  sources: any;
  activeTabIndex: number;
  breakpoints: any[];
  setBreakpoints: any;
  activeLine: number;
  selectedLine: number;
  runningTabIndex: number;
}

interface IPropsRenderer {
  rows: any;
  stylesheet: any;
  useInlineStyles: any;
}

const Sources = ({
  sources,
  activeTabIndex,
  breakpoints,
  setBreakpoints,
  activeLine,
  selectedLine,
  runningTabIndex,
}: IProps) => {
  const [sourcesWithMarkup, setSourcesWithMarkup] = useState<any[]>([]);

  const sourceComponents = sources.map((source: any, index: number) => {
    const astId = source.ast.id;
    const fileName = source.sourcePath.replace(/^.*[\\/]/, "");
    const highlightedSource: string[] = [];

    if (sourcesWithMarkup.length === 0) {
      low.registerLanguage("solidity", definer);
      const tree: any = low.highlight("solidity", source.source).value;
      const processor: any = unified().use(stringify);
      const highlightedMarkup: any = processor
        .stringify({ type: "root", children: tree })
        .toString();

      highlightedMarkup.split("\n").forEach((lineMarkup: string) => {
        highlightedSource.push(lineMarkup);
      });

      setSourcesWithMarkup(prevState => [...prevState, highlightedSource]);
    }

    return (
      <Source
        key={`contract-${astId}`}
        visible={astId === activeTabIndex}
        contractSource={
          highlightedSource.length > 0
            ? highlightedSource
            : sourcesWithMarkup[index]
        }
        activeLine={activeLine}
        selectedLine={selectedLine}
        breakpoints={breakpoints}
        setBreakpoints={setBreakpoints}
        sourceIsActive={astId === runningTabIndex}
        sourceId={source.id}
        astId={astId}
        fileName={fileName}
      />
    );
  });

  return <>{sourceComponents}</>;
};

export default Sources;
