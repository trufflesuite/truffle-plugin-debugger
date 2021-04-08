import React from "react";
import styled from "styled-components";
import { radius } from "../styles/MetaWrapper";
import * as Colors from "../styles/colors";

const Wrapper = styled.div`
  grid-template-columns: 3.5fr 1.5fr;
  display: grid;
`;

const StatusContainer = styled.div`
  background: ${Colors.RED_100};
  border: solid 1px ${Colors.RED_600};
  color: ${Colors.RED_600};
  padding: 1rem 1rem;
  margin-top: 1rem;
  border-radius: ${radius};
  font-family: "Ubuntu Mono", monospace;
  font-size: 1rem;

  > * {
    &:not(:last-child) {
      margin: 0 0.2rem 0 0;
    }
  }
`;

interface IProps {
  returnValue: any;
}

const StatusMessage = ({ returnValue }: IProps) => {
  let statusDescription: any | null;
  let statusMessage: any | null;

  if (returnValue?.length > 0) {
    switch (returnValue[0].kind) {
      case "revert":
        statusDescription = `VM Exception while processing transaction`;
        statusMessage = `${returnValue[0].kind} -- ${returnValue[0].arguments[0].value.value.asString}`;
        break;
      case "selfdestruct":
      case "return":
      default:
        return <></>;
        break;
    }
  }

  return (
    <>
      {returnValue ? (
        <Wrapper>
          <StatusContainer>
            {`${statusDescription}: ${statusMessage}`}
          </StatusContainer>
        </Wrapper>
      ) : null}
    </>
  );
};

export default StatusMessage;
