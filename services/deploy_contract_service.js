const Web3 = require("web3");

const web3 = new Web3(process.env.wsUrl);
const contract = require("../bin/User.json");

const MailGun = require('./mailgun_service');
const mailgun = new MailGun();

process.on("message", async (data) => {
    let userContract = new web3.eth.Contract(contract.abi);

    try{
        const initialTxSign = await web3.eth.accounts.signTransaction(
            {
                to: data.account.address,
                value: "500000000000000000", // equivalent to 0.5 ether
                gas: 2000000,
            },
            process.env.fundingAccount
        );

        await web3.eth.sendSignedTransaction(
            initialTxSign.rawTransaction
        );

        const transaction = await userContract.deploy({
            data: contract.bytecode,
            arguments: [
                data.user.name,
                data.user.email,
                data.user.dob,
                data.user.country,
                data.user.mobile,
                data.user.gender,
            ],
        });

        const options = {
            data: transaction.encodeABI(),
            gas: 3000000,
        };

        const signed = await web3.eth.accounts.signTransaction(
            options,
            data.account.privateKey
        );


        const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

        await mailgun.send(
            data.user.email,
            'iBlock: Your contract has been deployed',
            'your contract address is :'+ receipt.contractAddress
        );
    }
    catch (e){
        console.error(e);
        await mailgun.send(
            data.user.email,
            'iBlock: Your contract hasn\'t been deployed',
            'Due some internal issue we failed to process your request!. Please try again later'
        );
    }

})