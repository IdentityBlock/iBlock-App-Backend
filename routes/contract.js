const express = require('express');
const router = express.Router();

const Web3 = require('web3');

const web3 = new Web3(process.env.wsUrl);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res)=>{
  let contractAbi = require('../bin/User.abi.json');
  let ethereumAddress = req.body.ethaddress;
  console.log(req.body);
  let userContract = new web3.eth.Contract(contractAbi);

  userContract.deploy({
    data: process.env.contractByteCode,
    arguments: [req.body.name, req.body.email, req.body.dob, req.body.country, req.body.mobile, req.body.gender]
  })
      .send({
        from: ethereumAddress,
        gas: 1500000,
        gasPrice: '300000000000'
      })
      .then((contractInstance) =>{
        res.status(200).json({
          "contract-address": contractInstance.options.address
        });
      })
      .catch((err)=>{
        console.log(err);
      });

});

module.exports = router;
