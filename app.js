//http://localhost:3000/complain/0x579B5D46470b501D9Aa3765B00ac86C07B5c5fB7/dsdsd/dsdsd/77777/ass/cf39d15b3f9bb5e776a97060f81ad6ea949459c0fb9e412f2cf61f2ee99e1153
// http://localhost:3000/changeStatus/5/2/0x579B5D46470b501D9Aa3765B00ac86C07B5c5fB7/cf39d15b3f9bb5e776a97060f81ad6ea949459c0fb9e412f2cf61f2ee99e1153
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "backer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "isContribution",
				"type": "bool"
			}
		],
		"name": "FundTransfer",
		"type": "event"
	},
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
				"name": "city",
				"type": "uint256"
			}
		],
		"name": "addDonation",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
		"constant": false,
		"inputs": [],
		"name": "stopFunding",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amt",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "beneficiary1",
				"type": "address"
			},
			{
				"name": "beneficiary2",
				"type": "address"
			},
			{
				"name": "beneficiary3",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amountRaised",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "beneficiaries",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "cityContribution",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "crowdfundClosed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
	},
	{
		"constant": true,
		"inputs": [],
		"name": "withdrawableAmount",
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
]
	);
var ContractAddress='0x07d47c0e09ab55ef5ffc19ed6089c0839aa8b44e';

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
	RegisterComplaint(req,res);
    //res.send("oh yeah");

});
app.get('/latestComplaint', function(req,res){
    ContractInstance.latestComplaintNumber(function(err,result){
        console.log(result);
        res.send(result);
    })
});
app.get('/crowdFundingClosed', function(req,res){
    ContractInstance.crowdfundClosed(function(err,result){
        console.log(result);
        res.send(result);
    })
});


app.get('/withdrawableAmount', function(req,res){
    ContractInstance.withdrawableAmount(function(err,result){
        console.log(result);
        res.send(result);
    })
});



app.get('/amountRaised', function(req,res){
    ContractInstance.amountRaised(function(err,result){
        console.log(result);
        res.send(result);
    })
});

app.get('/changeStatus/:id/:status/:public/:private',function(req,res){
    console.log(req.params);
    ChangeStatus(req.params.id,req.params.status,req.params.public,req.params.private);
    
});

app.get('/addDonation/:city/:amount/:public/:private',function(req,res){
    console.log(req.params);
    AddDonation(req.params.city,req.params.amount,req.params.public,req.params.private);
    
});

app.get('/withdraw/:amount/:public/:private',function(req,res){
    console.log(req.params);
    WithDraw(req.params.amount,req.params.public,req.params.private);
    
});


app.get('/stopFunding/:public/:private',function(req,res){
    console.log(req.params);
    StopFunding(req.params.public,req.params.private);
    
});


app.get('/getComplaint/:id',function(req,res){
    ContractInstance.complaints(req.params.id,function(err,result){
        if(!err)
            res.send(result);
        else
            console.log(err);
    })
});

app.get('/balanceOf/:public',function(req,res){
    ContractInstance.balanceOf(req.params.public,function(err,result){
        if(!err)
            res.send(result);
        else
            console.log(err);
    })
});

app.get('/cityContribution/:city',function(req,res){
    ContractInstance.cityContribution(req.params.city,function(err,result){
        if(!err)
            res.send(result);
        else
            console.log(err);
    })
});


app.get('/getbalance/:public',function(req,res){
	web3.eth.getBalance(req.params.public.toString(),function(err,result){
		if(!err){
			res.send(result.toString());
		}
		else{
			console.log(err);
		}
	})
	
});

function AddDonation(city, amount, public, private, res) {
 var gasPrice = web3.eth.gasPrice;
 var gasPriceHex = web3.toHex(gasPrice);
 var gasLimitHex = web3.toHex(300000);
 var nonce = web3.eth.getTransactionCount(public);
 console.log( parseInt(amount));
 var amt = (parseInt(amount));
 
 var rawTransaction = {
   from: public,
   nonce: web3.toHex(nonce),
   gasLimit: gasLimitHex,
   gasPrice: gasPriceHex,
   to: ContractAddress,
   value: amt,
   data: ContractInstance.addDonation.getData(city, { from: public }),
   chainId: 0x03
 };

 var tx = new Tx(rawTransaction);

 tx.sign(new Buffer(private, "hex"));

 var serializedTx = tx.serialize();

 web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"), function(
   err,
   hash
 ) {
   if (err) {
     console.log(err);
     return;
   }
   console.log("Transaction hash: " + hash);
   res.send(hash);
 });
}


function StopFunding(public,private,res){
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
        "data": ContractInstance.stopFunding.getData({from: public}),
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
		res.send(hash);
		
		
    });
}


function WithDraw( amount, public, private, res) {
	var gasPrice = web3.eth.gasPrice;
	var gasPriceHex = web3.toHex(gasPrice);
	var gasLimitHex = web3.toHex(300000);
	var nonce = web3.eth.getTransactionCount(public);
	console.log(typeof parseInt(amount));
	var amt =(amount);
   
	var rawTransaction = {
	  from: public,
	  nonce: web3.toHex(nonce),
	  gasLimit: gasLimitHex,
	  gasPrice: gasPriceHex,
	  to: ContractAddress,
	  value: "0x0",
	  data: ContractInstance.WithDrawal.getData(amt,{from: public}),
	  chainId: 0x03
	};
   
	var tx = new Tx(rawTransaction);
   
	tx.sign(new Buffer(private, "hex"));
   
	var serializedTx = tx.serialize();
   
	web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"), function(
	  err,
	  hash
	) {
	  if (err) {
		console.log(err);
		return;
	  }
	  console.log("Transaction hash: " + hash);
	  res.send(hash);
	});
   }
   



function ChangeStatus(id,status,public,private,res){
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
		res.send(hash);
		
		
    });
}



function RegisterComplaint(req,res){
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
		res.send(hash);

        return hash;
    });

}
app.listen(3000);
