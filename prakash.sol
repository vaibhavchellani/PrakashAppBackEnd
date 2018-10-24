pragma solidity ^0.4.11;

contract Prakash{
    struct complaint{
        // status can be 0,1,2 => added , resolved , cancelled
        uint256 status;
        address user;
        string desc;
        string name;
        uint256 phoneNumber;
        string problem;  
        uint256 time;
    }


    address[4] public beneficiaries;
    //amount raised in total
    uint public amountRaised;
    //total amt that can be withdrawed by authorities
    uint public withdrawableAmount;
    //who contributed how much in tragedy
    mapping(address => uint256) public balanceOf;
    //city contribution how much in which city 
    mapping( uint256  => uint256) public cityContribution;
    //crowdsale can be closed by beneficiary anytime
    bool public crowdfundClosed = false;


    event FundTransfer(address backer, uint amount, bool isContribution);

    mapping(uint256 => complaint)public complaints;
    uint256 public latestComplaintNumber=0;


    // 4 beneficiaries like rescue lead, commissioner etc.
    constructor(address beneficiary1,address beneficiary2, address beneficiary3) public {
        beneficiaries[0]=msg.sender;
        beneficiaries[1]=beneficiary1;
        beneficiaries[2]=beneficiary2;
        beneficiaries[3]=beneficiary3;
    }

    
        function addComplaint (
        address _user,
        string _desc,
        string _name,
        uint256 _phoneNumber,
        string _problem
        ){
            complaint memory _complaint = complaint({
               status:0,
               user:_user,
               desc:_desc,
               name:_name,
               phoneNumber:_phoneNumber,
               problem:_problem,
               time:uint256(now)
            });
            complaints[latestComplaintNumber]=_complaint;
            latestComplaintNumber++;
            
        }
        
    function changeStatus(uint256 _id,uint256 _status){
        complaints[_id].status=_status;
                }


       
     modifier can_withdraw() {
        if (msg.sender != beneficiaries[0]||msg.sender != beneficiaries[1]||
        msg.sender != beneficiaries[2]||msg.sender != beneficiaries[3]) {
            revert();
                }
            

        _; // continue executing rest of method body
    }

    modifier isOwner() {
        if (msg.sender != beneficiaries[0]) {
            revert();
                }
            

        _; // continue executing rest of method body
    }
 


   // anyone can add donation to tragedy for fund raising
    function addDonation(uint256 city) public payable {
        require(!crowdfundClosed,"Crowdfunding is closed");
        uint amount = msg.value;
        balanceOf[msg.sender] += amount;
        cityContribution[city]+=amount;
        amountRaised += amount;
        withdrawableAmount+=amount;
        emit FundTransfer(msg.sender, amount, true);
 

    }
    
    

    //withdraw funds
    function Withdrawal(uint amt) can_withdraw public {   
        assert(withdrawableAmount<=amountRaised);
        require(withdrawableAmount>amt,"lesser funds are available");
        msg.sender.transfer(amt);
        withdrawableAmount-=amt;
        emit FundTransfer(msg.sender, amt, false);

    }

    //crowdfunding is stopped
    function stopFunding() isOwner public  {
        crowdfundClosed=true;
    }



}