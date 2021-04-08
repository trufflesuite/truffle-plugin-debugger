import React from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";
import H3 from "../styles/H3";

import {
  Link
} from "react-router-dom";

const HomeContainer = styled.div`
  padding: 1rem 2rem;
`;

const Home = ({}) => {
  return (
    <HomeContainer>
      <H3>Transactions</H3>
      <p>Transactions will be listed below as they are created (via web3 polling to instance)...</p>
      <ul>
        <li><Link to="/0x5ca065c1613fa410e463a9ae9e2b6e400dd7f7e40f33eb69f48af4129e997547">0x5ca065c1613fa410e463a9ae9e2b6e400dd7f7e40f33eb69f48af4129e997547</Link></li>
        <li><Link to="/0x2f96c3182d4bf6793846206768a95ed091dc09ac5c57c8836708a055116000e2">0x2f96c3182d4bf6793846206768a95ed091dc09ac5c57c8836708a055116000e2</Link></li>
      </ul>
    </HomeContainer>
  );
};

export default Home;
