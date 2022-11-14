const express = require("express");
const router = express.Router();

const Web3 = require("web3");

const web3 = new Web3(process.env.wsUrl);
const contract = require("../bin/User.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    data: contract.abi,
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let userContract = new web3.eth.Contract(contract.abi);

  const fundingAccount = web3.eth.accounts.privateKeyToAccount(
    process.env.fundingAccount
  );

  const account = web3.eth.accounts.create();

  console.log(account.privateKey);
  console.log(account.address);
  console.log(fundingAccount.address);

  // await web3.eth.sendTransaction({
  //   from: fundingAccount.address,
  //   to: account.address,
  //   value: 10000000000000000000, // 10**19 equivalent to 10 ether
  // });

  const initialTxSign = await web3.eth.accounts.signTransaction(
    {
      to: account.address,
      value: "500000000000000000", // equivalent to 0.5 ether
      gas: 2000000,
    },
    process.env.fundingAccount
  );
  console.log(initialTxSign);
  const initialRecipt = await web3.eth.sendSignedTransaction(
    initialTxSign.rawTransaction
  );

  console.log(initialRecipt);

  const transaction = await userContract.deploy({
    data: contract.bytecode,
    arguments: [
      req.body.name,
      req.body.email,
      req.body.dob,
      req.body.country,
      req.body.mobile,
      req.body.gender,
    ],
  });

  const options = {
    data: transaction.encodeABI(),
    gas: 3000000,
  };

  const signed = await web3.eth.accounts.signTransaction(
    options,
    account.privateKey
  );

  console.log(signed);

  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log(receipt.contractAddress);

  return res.status(200).json({
    "private-key": account.privateKey,
    "contract-address": receipt.contractAddress,
  });
});

module.exports = router;
