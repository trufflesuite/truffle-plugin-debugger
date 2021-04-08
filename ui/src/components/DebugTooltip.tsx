import React from "react";
import Tooltip from "../styles/Tooltip";
import * as Colors from "../styles/colors";

interface IProps {
  title: string;
  children?: React.ReactElement;
}

const overlayStyle = {
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  background: `${Colors.GRAY_600}`,
  opacity: 1,
  maxHeight: "15rem",
  overflow: "auto",
};

const DebugTooltip = ({ title, children }: IProps) => {
  return (
    // <Tooltip placement="top" overlay={<span>{title}</span>} trigger={["hover"]} overlayStyle={overlayStyle}>
    <>
      {children}
    </>
    // </Tooltip>
  );
};

export default DebugTooltip;
