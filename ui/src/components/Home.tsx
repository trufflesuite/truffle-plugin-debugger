import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";
import H3 from "../styles/H3";
import Transaction from "./Transaction";
import getWeb3 from "../utils/getWeb3";

const HomeContainer = styled.div`
  padding: 1rem 2rem;
`;

const Home = ({port}: any) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  const getPendingTransactions = async () => {

    const web3 = await getWeb3(port);
    const subscription = web3.eth.subscribe('pendingTransactions');

    subscription.subscribe((error: any, result: any) => {
      if (error) console.log(error)
    })
    .on('data', async (txHash: any) => {

      try {
        const txn = await web3.eth.getTransaction(txHash)

        const transaction: any = (
          <Transaction transaction={txn} port={port} key={Date.now()} />
        );
       
        await setTransactions((prev: any) => {
          return [...prev, transaction];
        });

        return function cleanup() {
          subscription.unsubscribe();
        };
      }
      catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getPendingTransactions();
  }, []);

  return (
    <HomeContainer>
      <H3>Transactions</H3>
      <p>Transactions will be listed below as they are created.</p>
        {transactions.length ? 
          transactions.filter((v,i) => {
            if (i%2) {
              return v; // uber hack to only display even (given the subscription is returning dupes)
            }
          }) 
        : (<p>Transactions will show here</p>) }
    </HomeContainer>
  );
};

export default Home;
