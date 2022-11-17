const express = require("express");
const router = express.Router();
const cp = require('child_process');

const Web3 = require("web3");
const contract = require("../bin/User.json");

const web3 = new Web3(process.env.wsUrl);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    data: contract.abi,
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const account = web3.eth.accounts.create();

  let  child = cp.fork(__dirname+'/../services/deploy_contract_service.js');
  child.send({
    'account': account,
    'user': req.body
  });

  return res.status(200).send({"private-key": account.privateKey});
});

module.exports = router;
