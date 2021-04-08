import React from "react";
import styled from "styled-components";
import getDecodedValue from "../utils/getDecodedValue";
import ReactJson from "react-json-view";
// import { VARIABLES_OUTPUT as variablesTheme } from "../../styles/components";
import { CHOCOLATE_200 } from "../styles/colors";

const VariablesWrapper = styled.div`
  background: ${CHOCOLATE_200};
  padding: 1rem;
  border-radius: 1rem;
  font-family: "Ubuntu Mono", monospace;
  margin-bottom: 1.25rem;
  font-size: 1em;
  * {
    background-color: inherit !important;
    font-family: "Ubuntu Mono", monospace;
  }
  ul,
  ul li {
    margin-top: 0em !important;
    paddding-top: 0em !important;
  }
  overflow-x: scroll;
  overflow-y: scroll;
`;

export interface IProps {
  variables: any;
}

const Variables = ({ variables }: IProps) => {
  const state: any = {};

  if (variables) {
    const variableKeys = Object.keys(variables);
    variableKeys.forEach(variable => {
      const value = getDecodedValue(variables[variable]);
      state[variable] = value;
    });
  }

  return (
    <VariablesWrapper>
      <ReactJson
        name={null}
        src={state}
        displayDataTypes={false}
        collapseStringsAfterLength={34}
        collapsed={1}
        // theme={variablesTheme}
      />
    </VariablesWrapper>
  );
};

export default Variables;
