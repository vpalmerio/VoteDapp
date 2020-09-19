//struct for voter data, store votes in there
//an array for all the voters in that poll
//a struct for poll data including the above
//a function that can sort the results of 50 voters max each time the function is called
//only first choice would count, but if the first choice does not have more than %50, then get rid of looser in everybodies first choice and try again
//maybe store choices as numbers for easy use



//maybe to find winners, put different choices into temporary arrays, and the "looser's array" will be reset to find second choices
//maybe put peoples choices into arrays (check to make sure they are valid first)

//To do:
//figure out what to do with ties of winner and ties of loosers (reorganizeing a tie of loosers)
//change amountofvotes and looservotes to something to do with id's
//TEST EVERYTHING

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "./VoteDappStorageV2.sol";


contract VoteDappRanked {
    
    //stores voter data
    struct _voterData {
        string[] choices;
        bool allowedToVote;
    }
    
    
    struct pollData {
        address owner;
        string description;
        bool exists; //used for getter functions
        bool open; //used to close and open poll
        bool privatePoll; //used as option to restrict which people can vote
        string[] arrOptions; //an array of options
        mapping(string => uint256) optionId;
        
        mapping(address => _voterData) voterData; //stores the choices of the user in order using array ([0] is first, [1] is second, etc)
        
        //mapping(address => bool) pollVoterData; //could be used to check people who can vote...
        
        address[] voters; //people who voted, needed for requestWinner
        
    }
    
    event pollModified(
        string indexed _pollName,
        string modified,
        address _owner
    );
    
    event pollVoted(
        string indexed _pollName,
        string _option,
        address _voter
    );

    //storage
    mapping(string => pollData) public Polls; //address refers to who ever started the poll
    
    string [] public listofPolls; //allows people to look up Polls
    
    VoteDappStorage nameStorage;
    
    
    constructor (address _storage) {
        nameStorage = VoteDappStorage(_storage); //used to check if name exists across any of the "suite" of "poll contracts"
    }
    

    function createPoll(
        string memory pollName, string memory description, string[] memory toptions, bool privatePoll, 
        address[] memory allowedVoters
        ) external {
        require(!Polls[pollName].exists, "Another poll already has that name."); //makes sure name doesn't already exist
        
        require(toptions.length <= 99, "You can only have 99 options.");
        
        require(nameStorage.addName(pollName), "Name reservation failed.");
        
        if(privatePoll) {
            require(allowedVoters.length > 0, "Can't be private and allow no one");
            
            Polls[pollName].privatePoll = true;
            
            for(uint256 a = 0; a<allowedVoters.length; a++) {
                Polls[pollName].voterData[allowedVoters[a]].allowedToVote = true;
            }
            
        } else {
            require(allowedVoters.length == 0, "Can't be public and restrict voters.");
        }
        
        
        Polls[pollName].owner = msg.sender;
        
        if(keccak256(abi.encodePacked(description)) != keccak256(abi.encodePacked(""))) {
            Polls[pollName].description = description;
        }
        
        Polls[pollName].exists = true;
    
        // toptions = temporary options
        Polls[pollName].arrOptions = toptions;
        
        for (uint256 b = 0; b<toptions.length; b++) {
            Polls[pollName].optionId[toptions[b]] = b;
        }
        
        for(uint256 a = 0; a<allowedVoters.length; a++) {
            Polls[pollName].voterData[allowedVoters[a]].allowedToVote = true;
        }
        
        listofPolls.push(pollName); //pushes pollName to a list of all polls
        
        Polls[pollName].open = true;
        
        emit pollModified(pollName, "Created", msg.sender);
    }
    
    
    
    function vote(string memory pollName, string[] memory orderofoptions) external {
        
        require(Polls[pollName].open, "Poll does not exist or poll is not open."); //checks if poll exists and if its open
        
        require(Polls[pollName].voterData[msg.sender].choices.length == 0, "You already voted.");
        
        require(orderofoptions.length > 0, "Cannot vote for no one.");
        
        if(Polls[pollName].privatePoll) {
            require(Polls[pollName].voterData[msg.sender].allowedToVote, "You are not allowed to vote.");
        }
        
        string [] memory arrOptions = Polls[pollName].arrOptions;
        
        for(uint256 x = 0; x<arrOptions.length; x++) {
            
            for (uint256 i=0; i<orderofoptions.length; i++) {
            
                if (keccak256(abi.encodePacked(arrOptions[x])) == keccak256(abi.encodePacked(orderofoptions[i]))) {
                    break;
                }
                if (i==orderofoptions.length - 1) {

                    revert("One of your options is invalid.");
                }
            }
        }
        
        //store voters choices
        Polls[pollName].voterData[msg.sender].choices = orderofoptions;
        
        //push voter to list of people that voted
        Polls[pollName].voters.push(msg.sender);
        
    }
    
    function endPoll(string memory pollName) external {
        
        require(Polls[pollName].exists, "Poll does not exist.");
        require(Polls[pollName].open, "Poll already closed.");
        require(Polls[pollName].owner==msg.sender, "You are not the owner of this poll.");
        Polls[pollName].open = false;
        
        emit pollModified(pollName, "Ended", msg.sender);
        
    }
    
    //view functions for web3
    
    function requestOptions(string memory pollName) view external returns (string [] memory) {
        require(Polls[pollName].exists, "Poll does not exist."); //checks if poll exists
        
        return Polls[pollName].arrOptions; //returns all elements in the array of people who voted for specific option
    }
    
    function getPollList() view external returns (string [] memory) {
        return listofPolls;
    }
    
    function trackSpecificVotes(string memory pollName, address voter) view external returns (string [] memory) {
        require(Polls[pollName].exists, "Poll does not exist."); //checks if poll exists
        
        return Polls[pollName].voterData[voter].choices;
    }
    
    function isAllowedToVote(string memory pollName, address voter) view external returns (bool) {
        require(Polls[pollName].privatePoll, "This poll is not restricted.");
        
        return Polls[pollName].voterData[voter].allowedToVote;
    }
    
    
    //find out how much gas this costs
    //test this
    //fix ties of two or more
    function requestWinner(string memory pollName) view public returns (string [] memory) {
        
        //cheap workaround
        //there is an error with not specifying space so, set a limit of 99 options (like would anyone use that much?)
        
        uint256[99][] memory voterChoices = new uint256[99][] (Polls[pollName].voters.length); //(Polls[pollName].arrOptions.length) (Polls[pollName].voters.length);
        
        //array where first [] is the options (identified by numbers)
        //second [] is where voters are identified by numbers
        
        //arrays work differently in solidity, so in order to find or set a value, we have to write backwards, such as:
        //voteCount[1][2] where 1 is now the voter and 2 is now the option
        
        //  1, 2, 3 (place of options)
        //1 id id id 
        //2
        //3
        //(addresses)
        
        //Note:
        //technically, solidity uses "arrays of arrays" instead of the matrices, but the two dimensional
        //array could still be seen as a matrice
        
        //i is the voters and j is the options
        
        //sorts through all the voters
        for (uint256 i = 0; i<Polls[pollName].voters.length; i++) {
            
            //sorts through all the choices and puts them into array
            
           
            for (uint256 j = 0; j<Polls[pollName].voterData[Polls[pollName].voters[i]].choices.length; j++) {
                //finds id of the choice of the voter and puts it into array
                
                                                                                        ///Polls[pollName].voters[i]
                                                                ///Polls[pollName].choices[][j]
                voterChoices[i][j] = Polls[pollName].optionId[Polls[pollName].voterData[Polls[pollName].voters[i]].choices[j]];
                
            }
        }
        
                
        
        
        //keeps track of which choice becomes your first choice, if your first choice is looser (used later in code)
        //placement is based on "id" of voter (id as in placement in voter array in pollData struct)
        
        //each placement holds a number of how many times the voters next choice was counted as looser in order to find
        //the voters next choice
        uint256[] memory timesChanged = new uint256[] (Polls[pollName].voters.length);
        
        
        //sort through all the data to find the winner, then figure out how to remove or move second place options to first place
        //start of large for loop
        for (uint256 k = 0; k<Polls[pollName].arrOptions.length; k++) {
            
            
            //start of finding largest amonut of votes
            
            //array for finding winner (finds winner by finding largest number in array)
            uint256[] memory voteCount = new uint256[] (Polls[pollName].arrOptions.length);
            //sort through voters to get voters first choice/new first choice and place them into array
            for (uint256 l = 0; l<Polls[pollName].voters.length; l++) {
                
                //the placements are the ids in the array and we increment the elements in the placements
                //if we find an id in the first spot
                
                          //voterChoices[l][0]; (is the first choice's id)
                
                voteCount[voterChoices[l][0]]++;
            }
            
            //find the biggest element in the array
            //array is used in case two people get 50% of votes
            uint256 largestamountofvotes;
            for (uint256 m=0; m<voteCount.length; m++) {
                if(largestamountofvotes < voteCount[m]) {
                    //amount of votes is equal to the placement of the element of the array
                    largestamountofvotes = voteCount[m];
                    
                    //check for if two people get 50% of votes
                }
            }
            
            //array to store and return winners
            string [] memory winners = new string[] (2);
            
            
            
            //if there are zero votes, return nothing
            if(largestamountofvotes == 0) {
                return winners;
            }
            
            //check if elements are over 50% of the voters, if so return winner
            //if largestamountofvotes has over 50% of votes, return winners
            
            uint256 fiftypercent = Polls[pollName].voters.length / 2;
            if(largestamountofvotes >= fiftypercent) {
                //sort through all options and return the option with the winner id
                
                //increment variable for each time an option is found with same amount of votes
                //as largestamountofvotes
                uint256 v = 0;
                
                
                for (uint256 n = 0; n<Polls[pollName].arrOptions.length; n++) {
                        
                    if (voteCount[n] == largestamountofvotes) {
                        winners[v] = Polls[pollName].arrOptions[n];
                        v++;
                    }
                    
                }

                return winners;
            //if not over 50%, reorgainze array and try again
            
            } else {
                
                 //number for finding the lowest amount of votes
                uint256 lowestamountofvotes = 0;
                
                
                    for (uint256 o=0; o<voteCount.length; o++) {
                    
                        if(lowestamountofvotes > voteCount[o]) {
                            
                            lowestamountofvotes = o;
                        }
                    }
                
                
                uint256 [] memory looserIds = new uint256[] (Polls[pollName].arrOptions.length);
               
                //increment variable for each time an option is found with same amount of votes
                //as largestamountofvotes
                uint256 x = 0;
                
                for (uint256 u = 0; u<voteCount.length; u++) {
                    if (voteCount[u] == lowestamountofvotes) {
                        //store looserIds into array
                        looserIds[x] = u;
                        x++;
                    }
                }
                
                
                //uses timesChanged in order to track which choice needs to be "put as first choice" next for each voter, 
                //and then loops around to find winner
                for (uint256 p = 0; p<Polls[pollName].voters.length; p++) {
                
                    //for loop used for going through all the voters and removing loosers
                    for (uint256 r = 0; r<looserIds.length; r++) {
                        //check if voter's first choice has looser id
                        if (voterChoices[p][0] == looserIds[r]) {
                                                            //sets the first variable of voter's array to the next choice
                            voterChoices[p][0] = voterChoices[p][timesChanged[p]+1];
                            
                           //p is considered the "voter id"
                            timesChanged[p]++;
                        }
                    }
                    
                
                }
                
                //does not work 
                    //use the k variable of the "mother for-loop" in order to determine what choice needs to be "moved up"
                    //if (winnerNumbers[0][p] == looservotes) {
                    //    winnerNumbers[0][p] = winnerNumbers[k+1][p];
                    //}
                    //above does not work because if somebody voted for someone originally in second place, 
                    //and then a second for loop went through and the second place person was looser, then there first
                    //choice would be set to a third choice without regard for their second choice
                
                
            }
        
        }
        
    }   
    
}
