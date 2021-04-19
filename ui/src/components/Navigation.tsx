import React from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";

import {
  Link
} from "react-router-dom";

const NavBarContainer = styled.div`
  width: 100%;
  background-color: #EFE5DC;
`;

const NavBar = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0.8rem 0;
  border-bottom: solid 1px ${Colors.GRAY_300};
  li {
    display: inline;
    padding: 1rem;
  }
  a {
    font-weight: 500;
    text-decoration: none;
    color: ${Colors.DARK_CHOCOLATE};
  }
`;

const Navigation = ({}) => {
  return (
    <NavBarContainer>
      <NavBar>
        <li><span className="fa fa-bug" style={{color: Colors.MINT_400}} /></li>
        <li><Link to="/">Transactions</Link></li>
        <li><Link to="/accounts">Accounts</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </NavBar>
    </NavBarContainer>
  );
};

export default Navigation;
