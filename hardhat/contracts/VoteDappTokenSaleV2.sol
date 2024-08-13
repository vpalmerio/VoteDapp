pragma solidity ^0.8.26;
pragma abicoder v2;

contract VoteDappToken {

    string  public name = "VoteDapp Token";
    string  public symbol = "VDA";
    string  public standard = "NOT AN ERC20 STANDARD TOKEN";

    address admin;

    uint256 public tokenPrice;
    uint256 public tokensSold;
    uint256 public tokensInCirculation;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    event Sell(address _buyer, uint256 _amount);

    event Return(address _buyer, uint256 _amount);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor (uint256 _tokenPrice) {

        admin = msg.sender;

        tokenPrice = _tokenPrice;

    }


    function buyTokens(uint256 amount) external payable {
        require(msg.value == (amount * tokenPrice), "You did not send the correct amount of ether.");

        balanceOf[msg.sender] = balanceOf[msg.sender] + amount;

        tokensSold = tokensSold + amount;

        tokensInCirculation = tokensInCirculation + amount;

        emit Sell(msg.sender, amount);
    }

    //return token
    function returnTokens(uint256 amount) external returns (bool) {

        require(balanceOf[msg.sender] >= amount, "You do not have that much tokens.");

        balanceOf[msg.sender] = balanceOf[msg.sender] - amount;

        //tranfers in units of wei
        payable(msg.sender).transfer(amount * tokenPrice);

        tokensInCirculation = tokensInCirculation - amount;

        return true;

    }

    //for poeple who want to transfer their own coins
    function transfer(address _to, uint256 _value) external returns (bool) {

        require(balanceOf[msg.sender] >= _value, "You don't have enough tokens.");


        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    //WARNING: Approve function does not check if owner has the actual amount of VDA TOKENS that are approved
    function approve(address _spender, uint256 _value) external returns (bool) {
        allowance[msg.sender][_spender] = _value; //allows a contract or person to spend on behalf of an address

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    //for people who are not the owners of the coins.
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        require(_value <= balanceOf[_from]); //checks if source has enough money
        require(_value <= allowance[_from][msg.sender]); //checks if spender is allowed to spend this amount

        balanceOf[_from] = balanceOf[_from] - _value; //takes money away from source
        balanceOf[_to] = balanceOf[_to] + _value; //gives money to address

        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value; //takes away the allowance from the spender

        emit Transfer(_from, _to, _value);

        return true;
    }
}