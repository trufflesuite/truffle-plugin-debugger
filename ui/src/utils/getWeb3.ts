import Web3 from "web3";

const getWeb3 = async (port: any) => {

  const provider = new Web3.providers.WebsocketProvider(
    `ws://127.0.0.1:${port}`,
    {
      headers: {
        Origin: "some_meaningful_name"
      }
    }
  );
  const web3 = await new Web3(provider);
  return web3;
}

export default getWeb3;
