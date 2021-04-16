import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";
import H3 from "../styles/H3";
import Transaction from "./Transaction";
import getWeb3 from "../utils/getWeb3";

const AccountsContainer = styled.div`
  padding: 1rem 2rem;
`;

const AccountsBox = styled.div`
  background: ${Colors.CHOCOLATE_200};
  padding: 1rem;
  border-radius: 1rem;
  font-family: "Ubuntu Mono", monospace;
  margin-bottom: 1.25rem;
  font-size: 1em;
`;

const Account = styled.div`
  padding: 0.2rem 0.2rem;
`;

const Accounts = ({port}: any) => {
  const [accounts, setAccounts] = useState<any[]>([]);

  const getAccounts = async () => {

    const web3 = await getWeb3(port);
    const list = (await web3.eth.getAccounts()).map((a: any, i: any) => {
      return (<Account>{`[${i}] ${a}`}</Account>)
    })

    setAccounts(list);
  }

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <AccountsContainer>
      <H3>Accounts</H3>
      <p>The following accounts are currently available.</p>
      <AccountsBox>
        {accounts.length ? 
          accounts
        : (<p>No accounts available</p>) }
      </AccountsBox>
    </AccountsContainer>
  );
};

export default Accounts;
