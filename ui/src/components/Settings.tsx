import React, { useState } from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";
import H3 from "../styles/H3";

import {
  Link,
} from "react-router-dom";

const SettingsContainer = styled.div`
  padding: 1rem 2rem;
`;

const SettingsForm = styled.form`
  label {
    margin: 0.4rem 0;
    display: block;

  }
  label input {
    display: ;
    margin: 0.4rem ;
  }
  input[type=submit] {
    display: block;
  }
`;

const Settings = ({port, setPort, rpc, setRpc}: any) => {
  const [newPort, setNewPort] = useState(port);
  const [newRpc, setNewRpc] = useState(rpc);

  const save: any = (e:any) => {
    e.preventDefault();
    setPort(newPort);
    setRpc(newRpc);
    // TODO display toast 
  };

  return (
    <SettingsContainer>
      <H3>Settings</H3>
      <SettingsForm onSubmit={save}>
        <label>
          Port
          <input type="text" value={newPort} onChange={(e: any) => setNewPort(e.target.value)} />
        </label>
        <label>
          RPC
          <input type="text" value={newRpc} onChange={(e: any) => setNewRpc(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </SettingsForm>
    </SettingsContainer>
  );
};

export default Settings;
