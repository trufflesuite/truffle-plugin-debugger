import React from "react";
import styled from "styled-components";
import StyledTab from "../styles/Tab";
import Tooltip from "../styles/Tooltip";
import * as Colors from "../styles/colors";

interface IIndexProps {
  activeTabIndex: number;
  index: number;
}

const TabButton = styled(StyledTab)`
  background: ${({ activeTabIndex, index }: IIndexProps) =>
    activeTabIndex === index ? `${Colors.TEAL_2}` : `${Colors.WHITE}`};
  border-color: ${Colors.TEAL_1} !important;
  color: inherit;
  text-transform: none;

  &:hover {
    background: ${Colors.TEAL_1};
    color: ${Colors.WHITE};
    * {
      color: ${Colors.WHITE};
    }
  }

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-basis: auto;
  position: relative;
`;

const ActiveIcon = styled.div`
  color: ${Colors.ORANGE_400};
  font-size: 0.6em;
  vertical-align: middle;
  position: absolute;
  right: 0.6rem;
  top: 0.9rem;
`;

interface IProps {
  index: number;
  tabName: string;
  activeTabIndex: number;
  setActiveTabIndex: any;
  tabIsRunning: boolean;
}

const Tab = ({
  index,
  tabName,
  activeTabIndex,
  setActiveTabIndex,
  tabIsRunning,
}: IProps) => {
  return (
    // <Tooltip placement="top" overlay={<span>{tabName}</span>}>
    <>
      <TabButton
        onClick={() => setActiveTabIndex(index)}
        selected={activeTabIndex === index}
        activeTabIndex={activeTabIndex}
        index={index}
      >
        {tabName}{" "}
        {tabIsRunning ? <ActiveIcon className="fas fa-dot-circle" /> : null}
      </TabButton>
    </>
    // </Tooltip>
  );
};

export default Tab;
