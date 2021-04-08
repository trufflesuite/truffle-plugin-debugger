import React from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";
import H3 from "../styles/H3";

import {
  Link
} from "react-router-dom";

const SettingsContainer = styled.div`
  padding: 1rem 2rem;
`;

const Settings = ({}) => {
  return (
    <SettingsContainer>
      <H3>Settings</H3>
      <p>...</p>
    </SettingsContainer>
  );
};

export default Settings;
