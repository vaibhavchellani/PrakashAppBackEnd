var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
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
var ContractAddress='0xeb3d71cbf09ed84ed2026dd6d5cf1badaa71d1d9';

var ContractInstance= ContractABI.at(ContractAddress);


app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
    console.log("dsd");

   res.send("Hello world!");
});
app.get('/complain/:public/:desc/:name/:phone/:problem/:private',function(req,res){
    console.log(res.params.public);
    //RegisterComplaint(res);
    res.send("oh yeah");

});



function RegisterComplaint(res){
    console.log(res.client.params);
    var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);
    var gasLimitHex = web3.toHex(300000);
    var nonce =  web3.eth.getTransactionCount(res.params.public) ;


    var rawTransaction = {
        "from": res.params.public,
        "nonce": web3.toHex(nonce),
        "gasLimit": gasLimitHex,
        "gasPrice": gasPriceHex,
        "to": ContractAddress,
        "value": "0x0",
        "data": ContractInstance.addComplaint.getData(res.params.public,res.params.desc,res.params.name,res.params.phone,res.params.problem,{from: publickey}),
        "chainId": 0x03
    };

    var tx = new Tx(rawTransaction);

    tx.sign(new Buffer(res.params.private, 'hex'));

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Transaction hash: ' + hash);
    });

}
app.listen(3000);
