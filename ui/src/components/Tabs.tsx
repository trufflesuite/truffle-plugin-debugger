import React from "react";
import Tab from "./Tab";
import styled from "styled-components";

interface IProps {
  sources: any;
  setActiveTabIndex: any;
  activeTabIndex: number;
  runningTabIndex: number;
}

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const Tabs = ({
  sources,
  setActiveTabIndex,
  activeTabIndex,
  runningTabIndex,
}: IProps) => {
  const tabs = sources.map((source: any) => {
    const fileName = source.sourcePath.replace(/^.*[\\/]/, "");
    const astId = source.ast.id;
    return (
      <Tab
        key={`contract-${astId}`}
        index={astId}
        tabName={fileName}
        setActiveTabIndex={setActiveTabIndex}
        activeTabIndex={activeTabIndex}
        tabIsRunning={astId === runningTabIndex}
      />
    );
  });

  return <TabsWrapper>{tabs}</TabsWrapper>;
};

export default Tabs;
