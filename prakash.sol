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
    mapping(uint256 => complaint)public complaints;
    uint256 public latestComplaintNumber=0;
    
    function addComplaint(
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
}
