var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var ContractAddress='0xeb3d71cbf09ed84ed2026dd6d5cf1badaa71d1d9';
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/TJSJL5u9maRXnaZrSvnv"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];
var ContractABI = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "_desc",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_phoneNumber",
				"type": "uint256"
			},
			{
				"name": "_problem",
				"type": "string"
			}
		],
		"name": "addComplaint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_status",
				"type": "uint256"
			}
		],
		"name": "changeStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "complaints",
		"outputs": [
			{
				"name": "status",
				"type": "uint256"
			},
			{
				"name": "user",
				"type": "address"
			},
			{
				"name": "desc",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "phoneNumber",
				"type": "uint256"
			},
			{
				"name": "problem",
				"type": "string"
			},
			{
				"name": "time",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "latestComplaintNumber",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);


var ContractInstance= ContractABI.at(ContractAddress);

var privatekey = 'cf39d15b3f9bb5e776a97060f81ad6ea949459c0fb9e412f2cf61f2ee99e1153';
var publickey = '0x579B5D46470b501D9Aa3765B00ac86C07B5c5fB7';

var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);
    var gasLimitHex = web3.toHex(300000);
    var nonce =  web3.eth.getTransactionCount(publickey) ;


    var rawTransaction = {
        "from": publickey,
        "nonce": web3.toHex(nonce),
        "gasLimit": gasLimitHex,
        "gasPrice": gasPriceHex,
        "to": ContractAddress,
        "value": "0x0",
        "data": ContractInstance.addComplaint.getData("0x627306090abaB3A6e1400e9345bC60c78a8BEf57","dsds","dsdssds",434343,"sdsds",{from: publickey}),
        "chainId": 0x03
    };

    var tx = new Tx(rawTransaction);

    tx.sign(new Buffer(privatekey, 'hex'));

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Transaction hash: ' + hash);
    });

ContractInstance.latestComplaintNumber(function(err,res){
    console.log(res);
})

