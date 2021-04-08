import styled from "styled-components";
import { style as TabButtonStyle } from "./TabButton";
import * as Colors from "./colors";

export interface IProps {
  selected?: boolean;
}

const Tab = styled.div`
  ${TabButtonStyle}
  /* To make sure padding works in <a> tag */
  display: inline-block;
  background: ${({ selected }: IProps) =>
    selected ? Colors.MILK_CHOCOLATE : "transparent"};
  color: ${({ selected }: IProps) =>
    selected ? "white" : Colors.MILK_CHOCOLATE};
`;

export default Tab;
