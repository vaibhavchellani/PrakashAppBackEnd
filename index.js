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


var ContractInstance= ContractABI.at('0x8cdaf0cd259887258bc13a92c0a6da92698644c0');
// ContractInstance.addComplaint("0x627306090abaB3A6e1400e9345bC60c78a8BEf57","dsds","dsdssds",434343,"sdsds",function(err,res){
//     if(!err)
//         console.log(res);
//     else
//         console.log(err);
// })
ContractInstance.latestComplaintNumber(function(err,res){
    console.log(err+res);
})

