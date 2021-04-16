import React from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";
import H3 from "../styles/H3";

import {
  Link,
} from "react-router-dom";

const SettingsContainer = styled.div`
  padding: 1rem 2rem;
`;

const Settings = ({port, setPort}: any) => {
  return (
    <SettingsContainer>
      <H3>Settings</H3>
      <p><strong>Port: </strong>{port}</p>
      <p>Note that this is hardcoded for now, ability to choose port coming shortly.</p>
    </SettingsContainer>
  );
};

export default Settings;
