pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;


contract VoteDappStorage {
    
    address admin;
    
    address [] public addrsOfPollsTypes; //list of types of polls
    
    mapping(address => bool) public pollTypeExists; //types of polls and their addresses, such as quadratic contract and regular voting contract
    
    mapping(string => bool) public pollNameExists; //storage of Polls and their settings
    
    
    
    
    // allows admin to set voting price, on deployment of contract
    constructor() {
        admin = msg.sender; //sets deployer to admin
    }
    
    function addPollType(address pollAddr) external {
        require(msg.sender == admin, "You are not allowed to do this.");
        
        pollTypeExists[pollAddr] = true;
    }
    
    function removePollType(address pollAddr) external {
        require(msg.sender == admin, "You are not allowed to do this.");
        
        pollTypeExists[pollAddr] = false;
    }
    
    function addName(string memory pollName) external returns (bool) {
        require(pollTypeExists[msg.sender], "You can't do this.");
        
        require(!pollNameExists[pollName], "Name already taken.");
        
        pollNameExists[pollName] = true;
        
        return true;
    }
    
    function checkName(string memory pollName) view external returns(bool) {
        return pollNameExists[pollName];
    }
    
    function getPollTypeAddrs() view external returns (address [] memory) {
        return addrsOfPollsTypes;
    }
    
    
    
}
