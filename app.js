var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/TJSJL5u9maRXnaZrSvnv"));
}
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
    //console.log(req.params.public);
    var txHash=RegisterComplaint(req);
    res.send(txHash);
    //res.send("oh yeah");

});
app.get('/latestComplaint', function(req,res){
    ContractInstance.latestComplaintNumber(function(err,result){
        console.log(result);
        res.send(result);
    })
});
app.get('/changeStatus/:id/:status/:public/:private',function(req,res){
    console.log(req.params);
    var txHash=ChangeStatus(req.params.id,req.params.status,req.params.public,req.params.private);
    res.send(txHash);
});
app.get('/getComplaint/:id',function(req,res){
    ContractInstance.complaints(req.params.id,function(err,result){
        if(!err)
            res.send(result);
        else
            console.log(err);
    })
});
function ChangeStatus(id,status,public,private){
    var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);
    var gasLimitHex = web3.toHex(300000);
    var nonce =  web3.eth.getTransactionCount(public) ;


    var rawTransaction = {
        "from": public,
        "nonce": web3.toHex(nonce),
        "gasLimit": gasLimitHex,
        "gasPrice": gasPriceHex,
        "to": ContractAddress,
        "value": "0x0",
        "data": ContractInstance.changeStatus.getData(id,status,{from: public}),
        "chainId": 0x03
    };

    var tx = new Tx(rawTransaction);

    tx.sign(new Buffer(private, 'hex'));

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Transaction hash: ' + hash);
        return hash;
    });
}



function RegisterComplaint(req){
    console.log(req);
    var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);
    var gasLimitHex = web3.toHex(300000);
    var nonce =  web3.eth.getTransactionCount(req.params.public) ;


    var rawTransaction = {
        "from": req.params.public,
        "nonce": web3.toHex(nonce),
        "gasLimit": gasLimitHex,
        "gasPrice": gasPriceHex,
        "to": ContractAddress,
        "value": "0x0",
        "data": ContractInstance.addComplaint.getData(req.params.public,req.params.desc,req.params.name,req.params.phone,req.params.problem,{from: req.params.public}),
        "chainId": 0x03
    };

    var tx = new Tx(rawTransaction);

    tx.sign(new Buffer(req.params.private, 'hex'));

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Transaction hash: ' + hash);
        return hash;
    });

}
app.listen(3000);
