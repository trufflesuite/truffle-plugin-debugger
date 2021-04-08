import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Colors from "../styles/colors";
import H3 from "../styles/H3";
import getWeb3 from "../utils/getWeb3";


import {
  Link
} from "react-router-dom";

const HomeContainer = styled.div`
  padding: 1rem 2rem;
`;

const Home = ({}) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  const getPendingTransactions = async () => {

    const web3 = await getWeb3();
    const subscription = web3.eth.subscribe('pendingTransactions');

    subscription.subscribe((error: any, result: any) => {
      if (error) console.log(error)
    })
    .on('data', async (txHash: any) => {

      try {
        const txn = await web3.eth.getTransaction(txHash)

        const transaction: any = (
          <li key={Date.now()}><Link to={`/${txn.hash}`}>{txn.hash}</Link></li>
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
      <p>Transactions will be listed below as they are created...</p>
      <ul>
        {transactions.length ? 
          transactions.filter((v,i) => {
            if (i%2) {
              return v; // uber hack to only display even (given the subscription returning dupes)
            }
          }) 
        : (<li>Transactions will show here</li>) }
      </ul>
    </HomeContainer>
  );
};

export default Home;
