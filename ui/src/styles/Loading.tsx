import React from "react";
import RingLoader from "react-spinners/RingLoader";
import styled from "styled-components";
import * as Colors from "./colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Loading = (props: any) => (
  <Wrapper {...props}>
    <RingLoader color={Colors.DARK_CHOCOLATE} />
  </Wrapper>
);
export default Loading;
