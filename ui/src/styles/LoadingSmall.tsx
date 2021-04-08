import React from "react";
import styled, { keyframes } from "styled-components";
import Icon from "./Icon";

interface IProps {
  className?: string;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledIcon = styled(Icon)`
  animation: ${rotate} 2s linear infinite;
`;

export default ({ className = "" }: IProps) => (
  <StyledIcon className={`fal fa-spinner ${className}`} />
);
