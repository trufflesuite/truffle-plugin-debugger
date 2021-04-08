import styled from "styled-components";
import * as Colors from "./colors";

const borderRadius = "0.3125rem";
const borderWidth = "0.125rem";
const borderStyle = "solid";
const borderColor = Colors.MILK_CHOCOLATE;
const border = `${borderWidth} ${borderStyle} ${borderColor}`;
export const style = `
  border-top: ${border};
  border-bottom: ${border};
  border-left: ${border};
  border-right: 0px;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  &:first-child {
    border-radius: ${borderRadius} 0 0 ${borderRadius};
  }
  &:last-child {
    border-radius: 0 ${borderRadius} ${borderRadius} 0;
    border-right: ${border};
  }
  &:only-child {
    border-radius: ${borderRadius};
  }
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  font-family: "Fira Sans", sans-serif;
`;

const TabButton = styled.button`
  ${style}
  background: transparent;
  color: ${Colors.MILK_CHOCOLATE};
`;
export default TabButton;
