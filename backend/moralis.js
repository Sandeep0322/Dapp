const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');

const runApp = async () => {
  await Moralis.start({
    apiKey: "Tm5hv88SRDf6toAnQnHzXYiu7fQmfReZIUTPN6zNcuHmfiwFmnXQInTWXQycUpSt",
  });
  
  const address = '0xB8C6CdDa4A10f3d8730597F846E53f4681037F32';

  const chain = "0x5";

  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });
  
  console.log(response.toJSON());
}

runApp();