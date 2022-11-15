const express = require("express");
const router = express.Router();

const Web3 = require("web3");

const web3 = new Web3(process.env.wsUrl);

router.post("/",async(req, res)=>{
    let tx = req.body.signedTx;
    const receipt = await web3.eth.sendSignedTransaction(tx);
    return res.json({
        txHash: receipt.transactionHash
    });
});

module.exports = router;