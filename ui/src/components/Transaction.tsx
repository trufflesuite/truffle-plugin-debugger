import React from "react";
import styled from "styled-components";
import { CHOCOLATE_200, CHOCOLATE_800 } from "../styles/colors";

import {
  Link
} from "react-router-dom";

const TransactionWrapper = styled.div`
  background: ${CHOCOLATE_200};
  padding: 1rem;
  border-radius: 1rem;
  font-family: "Ubuntu Mono", monospace;
  margin-bottom: 1.25rem;
  font-size: 1em;
  overflow-x: scroll;
  overflow-y: scroll;
  a {
    text-decoration: none;
    color: ${CHOCOLATE_800};
  }
`;

const Transaction = ({ transaction, port }: any) => {

  return (
    <TransactionWrapper>
      <Link to={`/${transaction.hash}/${port}`}>
        <strong>{`Block ${transaction.blockNumber}: `}</strong>
        {transaction.hash}
      </Link>
    </TransactionWrapper>
  );
};

export default Transaction;
