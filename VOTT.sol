pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


// does not meet ERC20 standard


// allow for more than two options, different options when creating polls

// what does 'memory' do?
//difference between memory and storage

//maybe make api to change price to keep vote cost low


library StringUtils {
    /// @dev Does a byte-by-byte lexicographical comparison of two strings.
    /// @return a negative number if `_a` is smaller, zero if they are equal
    /// and a positive numbe if `_b` is smaller.
    function compare(string memory _a, string memory _b) internal pure returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string memory _a, string memory _b) pure public returns (bool) {
        return compare(_a, _b) == 0;
    }
}



contract VoteDapp {
    string public name = "Vote Dapp";
    string public symbol = "VOTT";
    string public description = "Create polls and vote! v0.1";
    // uint256 public totalSupply; //no total supply

    // for selling
    address admin;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    
    event Sell(
        address indexed _buyer, 
        uint256 _amount
    );
    
    struct Options {
        string option; //option
        address[] voters; //people who voted for specific option
    }
    
    struct pollData {
        address owner;
        string pollDescription;
        Options[] options;
        address[] voters; //people who voted
        bool exists; //used to check if poll actually exists
        
    }

    struct voterData { // voter and voter's opiton
        bool voted; //checks if person voted
        string option;
    }

    //storage
    mapping(address => uint256) public balanceOf; //keeps track of who owns how much, is public so anyone can view
    
    mapping(string => pollData) public Polls; //address refers to who ever started the poll
    
    mapping(string => mapping(address => voterData)) public pollVoterData; //voters and their data
    
    mapping(string => mapping(string => uint256)) public pollResults; //results
    

    // allows admin to set voting price, on deployment of contract
    constructor(uint256 _tokenPrice) public {
        admin = msg.sender; //sets deployer to admin
        tokenPrice = _tokenPrice; // price of token
    }

    //from SafeMath
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        //must pay in "wei"
        require(msg.value == mul(_numberOfTokens, tokenPrice)); //ensures correct price is paid
        
        //find way to get money back..?
        
        balanceOf[msg.sender] += _numberOfTokens; // puts coins in buyers wallet
        //assert(tokenContract.balanceOf[_to] += _value); // puts coins in buyers wallet
        //work around by creating separate function "balanceOf" and separate map "mapbalanceOf", will use up gas
        //this is a bug^^^

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }
    // could be turned into a separate contract
    // in the future: allow for more than two options
    
    
    
    function startPole(string memory pollName, string memory pollDescription, string[] memory options) public {
        //address owner = msg.sender; //person who started the poll
        //bool exists = true; //sets polls existence to true
        address[] memory voters;
         //array for all voters in a poll
        
    // Does not work due to inability to convert Options[] memory to Options[] storage :({
        //Options[] memory choices;//initializes array
        //for (uint256 i=0; i<=options.length; i++) {
        //    choices[i] = Options(options[i], voters); //adds options to array
        //}
        //pollData memory data = pollData(owner, pollDescription, choices, voters, exists); //places all data into a struct
    
        //Polls[pollName] = data; //places struct into mapping
    //}
        
        //workaround
        
        //temporary fix for string arrays not working in function arguments (separate problem)
        //string[] memory options1;
        //options1[0] = option1;
        //options1[1] = option2;
        
        
        //workaround:
        Polls[pollName].owner = msg.sender;
        
        Polls[pollName].pollDescription = pollDescription;
        
        //Polls[pollName].options.push();
        //Polls[pollName].options[0] = option1;
        //Polls[pollName].options.push();
        //Polls[pollName].options[1] = option2;
        
        for (uint256 i=0; i<options.length; i++) {
            Polls[pollName].options.push();
            Polls[pollName].options[i] = Options(options[i], voters); //adds options to array
        }
        
        Polls[pollName].voters = voters;
        Polls[pollName].exists = true;
        
    }
    
    function vote(string memory pollName, string memory option) public {
        require(Polls[pollName].exists); //checks if poll exists
        require(!pollVoterData[pollName][msg.sender].voted); //checks if voter already
        pollVoterData[pollName][msg.sender].voted = true; //creates msg.sender's data and sets their vote status to true
        pollVoterData[pollName][msg.sender].option = option; //sets voters option
        pollResults[pollName][option] += 1; //increases vote count for voter
        Polls[pollName].voters.push(msg.sender);//adds voter to list of voters
        for(uint256 i=0; i<Polls[pollName].options.length; i++) {
            
            if (StringUtils.equal(option, Polls[pollName].options[i].option)) {
                Polls[pollName].options[i].voters.push(msg.sender);
                //Polls[pollName].options[i].voters[Polls[pollName].options[i].voters.length] = msg.sender;
            }
        }
        
    }
    
    function requestVoters(string memory pollName) view public returns (address [] memory) {
        require(Polls[pollName].exists); //checks if poll exists
        
        return Polls[pollName].voters; //returns all elements in the array of people who voted for specific option
    }
    
    function requestWinner(string memory pollName) view public returns (string memory) {
        require(Polls[pollName].exists); //checks if poll exists
        
        //temporary workaround
        //uint256 option1 = pollResults[pollName][Polls[pollName].options[0]];
        //uint256 option2 = pollResults[pollName][Polls[pollName].options[1]];
        
        uint256[] memory values = new uint256[] (Polls[pollName].options.length);
        for (uint256 i=0; i<Polls[pollName].options.length; i++) {
            values[i] = Polls[pollName].options[i].voters.length;
        }
        uint256[] memory findamountofvotes = values;
        for (uint256 i=0; i<findamountofvotes.length; i++) {
           if(findamountofvotes[0] < findamountofvotes[i]) {
               findamountofvotes[0] = findamountofvotes[i];
            }
        }
        uint256 amountofvotes = findamountofvotes[0];
        for (uint256 i=0; i<Polls[pollName].options.length; i++) {
            if(amountofvotes == Polls[pollName].options[i].voters.length) {
                return Polls[pollName].options[i].option;
            }
        }
        return "failed";
        
        //temporary workaround
        //if(option1 > option2) {
        //    return Polls[pollName].options[0];
        //} else {
        //    Polls[pollName].options[1];
        //}
        
    }

}
