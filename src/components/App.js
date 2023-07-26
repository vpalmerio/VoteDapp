import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

import VoteDappStorage from '../abis/VoteDappStorage.json'
import VoteDappRanked from '../abis/VoteDappRanked.json'
import VoteDappQuadratic from '../abis/VoteDappQuadratic.json'
import VoteDappRegular from '../abis/VoteDappRegular.json'
import VoteDappToken from '../abis/VoteDappToken.json'
import VoteDappTokenSale from '../abis/VoteDappTokenSale.json'

import Main from './Main'
import Fakemain from './Fakemain'
import Loadbar from './loadbar'
import Home from './Home'
import Polldesc from './Polldesc'
import { withRouter } from "react-router-dom";

class App extends Component {

  async componentWillMount() {
    let path = this.props.location.pathname.substring(0, 4);
    if(path === "/app") {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }

  }

  async loadWeb3() {
    this.setState({ loading: true, 
      loadingBlockchain: true, 
      loadingDescription: "Connecting to browser extension..." 
    })
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    this.setState({ loading: true, 
      loadingBlockchain: true, 
      loadingDescription: "Connecting to blockchain... (make sure you are connected to the Goerli network!)",
      polls: null
    })



    const web3 = window.web3
    //get account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    var rankedAddr
    var quadraticAddr
    var regularAddr
    var tokenAddr
    var tokenSaleAddr
    var storageAddr

    if(await web3.eth.net.getId() === 5) {

      rankedAddr = "0xd5C89E54f2f46B62382Ef56D27557fb036b946e8"
      quadraticAddr = "0xA5217021B9044FfD758b21329F79365D02092F53"
      regularAddr = "0x8C39AF50003E3F7AEc4E17c808001f8c84d77bdd"
      tokenAddr = "0xe799c0d5869fc23576E88A62b28E568bAc0160e3"
      tokenSaleAddr = "0x58085bF7262AF30e326747897B6ffBFdE59756aB"
      storageAddr = "0x09296686004F7A83DA07e0491720bbA1d85f013C"

    } else if(await web3.eth.net.getId() === 5777) {

      rankedAddr = "0x3C0F3976bca07dA2E9A98923177204553403e1B7"
      quadraticAddr = "0x6Be2e8fE9cFED36949eE5781953b783Fb49dB8e7"
      regularAddr = "0xE605730e38ed7d2Aa2BAdC8b9BE97a830e00986D"
      tokenAddr = "0x082F359da04B35Db583181e8634C334FFB1c0c88"
      tokenSaleAddr = "0x95A60f5F5fAee9eEcB85aDB3Be05d32f6917F6a9"
      storageAddr = "0x0c58e1aD2aC9FF7924c4d3Ed6937A25bf512f4D0"

    } else {
      this.setState({ loading: true, loadingDescription:
       "Failed to connect to contracts. Please make sure you are on the Goerli testnet. Get Goerli testnet eth at https://goerli-faucet.slock.it/."
      })
      return false
    }

    const DappRanked = new web3.eth.Contract(VoteDappRanked, rankedAddr)
    const DappQuadratic = new web3.eth.Contract(VoteDappQuadratic, quadraticAddr)
    const DappRegular = new web3.eth.Contract(VoteDappRegular, regularAddr)
    const DappToken = new web3.eth.Contract(VoteDappToken, tokenAddr)
    const DappTokenSale = new web3.eth.Contract(VoteDappTokenSale, tokenSaleAddr)
    const DappStorage = new web3.eth.Contract(VoteDappStorage, storageAddr)


    DappRegular.type = "Regular"

    DappQuadratic.type = "Quadratic"

    DappRanked.type = "Ranked"


    DappRanked.abi = VoteDappRanked.abi

    DappQuadratic.abi = VoteDappQuadratic.abi

    DappRegular.abi = VoteDappRegular.abi

    DappToken.abi = VoteDappToken.abi

    DappStorage.abi = VoteDappStorage


    DappQuadratic.address = quadraticAddr
    DappRegular.address = regularAddr



    this.setState({ DappRegular, DappRanked, DappQuadratic, DappToken, DappTokenSale, DappStorage})

    const tokenPrice = await DappTokenSale.methods.tokenPrice().call()

    const accountBalance = await DappToken.methods.balanceOf(this.state.account).call()

    this.setState({ accountBalance: accountBalance.toString(), tokenPrice: tokenPrice.toString() })

    this.setState({ loading: false, loadingBlockchain: false, loadingDescription: "Loading..."})
  }

  async loadPollData() {

      this.setState({ loading: true, loadingDescription: "Loading polls..."})


      this.setState({ polls: [], pollNames: [] })
      
      let newlistofPolls = []

      let polls = new Map()

      //if listofPolls.length === undefined, for loop will not run


      //load regular polls
      const listofPollsReg = await this.state.DappRegular.methods.getPollList().call()

      for (let i = 0; i < listofPollsReg.length; i++) {
          
          let owner = await this.state.DappRegular.methods.getPollOwner(listofPollsReg[i]).call()

          if(owner !== this.state.nullAddress) {

            let owned

            if(owner === this.state.account) {
              owned = true
            }

            const votesUsed = await this.state.DappRegular.methods.trackTotalVotes(listofPollsReg[i], this.state.account).call()

            let participated

            if (votesUsed > 0) {
                participated = true
            }
            
            if(owned || participated) {

              newlistofPolls.push(listofPollsReg[i])

              var poll = await this.state.DappRegular.methods.Polls(listofPollsReg[i]).call()

              poll.name = listofPollsReg[i]

              poll.type = "Regular"

              poll.typeState = this.state.DappRegular

              if (owner) {

                poll.owned = true

              }

              if(participated) {
                poll.participated = true;
              }

              if (poll.open === false) {
                poll.moneyOwed = await poll.typeState.methods.checkGetYourMoney(poll.name).call()
              } else {
                poll.moneyOwed = 0
              }

              const Options = await poll.typeState.methods.requestOptions(listofPollsReg[i]).call().catch((err => {console.log("error: ", err)}))

              if(Options !== undefined) {

                poll.options = Options

                poll.displayOptions = Options.join(", ")

              } else {
                poll.options = "Could not retrieve options"
              }

              //find eligibility
              let returnEligibility = await this.checkVoteEligibility(poll)

              poll.eligibility = returnEligibility[0]

              poll.canVote = returnEligibility[1]

              if(!poll.open) {
                //find winner
                let winners = await poll.typeState.methods.requestWinner(poll.name).call()

                let concatinatedWinners = winners.join(', ')

                if(concatinatedWinners === ", " || concatinatedWinners === "") {
                  concatinatedWinners = "No one has voted yet."
                }

                poll.winner = concatinatedWinners
              }

              polls.set(listofPollsReg[i], poll)
            }
            
          }
        
      }

      //load quadratic polls
      const listofPollsQuadratic = await this.state.DappQuadratic.methods.getPollList().call()

      for (let i = 0; i < listofPollsQuadratic.length; i++) {
 
          let owner = await this.state.DappQuadratic.methods.getPollOwner(listofPollsQuadratic[i]).call()

          if(owner !== this.state.nullAddress) {

            let owned

            if(owner === this.state.account) {
              owned = true
            }

            const votesUsed = await this.state.DappQuadratic.methods.trackTotalPayments(listofPollsQuadratic[i], this.state.account).call()

            let participated

            if(votesUsed > 0) {
              participated = true
            }
          
            if(owned || participated) {

              newlistofPolls.push(listofPollsQuadratic[i])

              var poll = await this.state.DappQuadratic.methods.Polls(listofPollsQuadratic[i]).call()

              poll.name = listofPollsQuadratic[i]

              poll.type = "Quadratic"

              poll.typeState = this.state.DappQuadratic

              if (participated) {
                poll.participated = true
              }

              if (owned) {
                poll.owned = true
              }

              if (poll.open === false) {
                poll.moneyOwed = await poll.typeState.methods.checkGetYourMoney(poll.name).call()
              } else {
                poll.moneyOwed = 0
              }

              const Options = await poll.typeState.methods.requestOptions(listofPollsQuadratic[i]).call().catch((err => {}))

              if(Options !== undefined) {
                
                poll.options = Options

                poll.displayOptions = Options.join(", ")

              } else {
                poll.options = "Could not retrieve options"
              }

              let returnEligibility = await this.checkVoteEligibility(poll)

              poll.eligibility = returnEligibility[0]

              poll.canVote = returnEligibility[1]

              if(!poll.open) {
                //find winner
                let winners = await poll.typeState.methods.requestWinner(poll.name).call()

                let concatinatedWinners = winners.join(', ')

                if(concatinatedWinners === ", " || concatinatedWinners === "") {
                  concatinatedWinners = "No one has voted yet."
                }

                poll.winner = concatinatedWinners
              }

              

              polls.set(listofPollsQuadratic[i], poll)

            }
          }
        
      }

      const listofPollsRanked = await this.state.DappRanked.methods.getPollList().call()

      for (let i = 0; i < listofPollsRanked.length; i++) {

        let owner = await this.state.DappRanked.methods.getPollOwner(listofPollsRanked[i]).call()

        if(owner !== this.state.nullAddress) {

          let owned

          if(owner === this.state.account) {
            owned = true
          }

          const arrayofChoices = await this.state.DappRanked.methods.trackSpecificVotes(listofPollsRanked[i], this.state.account).call()

          let participated

          if (arrayofChoices.length > 0) {
            participated = true
          }
        
          if(owned || participated) {

            newlistofPolls.push(listofPollsRanked[i])

            var poll = await this.state.DappRanked.methods.Polls(listofPollsRanked[i]).call()

            poll.name = listofPollsRanked[i]

            poll.type = "Ranked"

            poll.typeState = this.state.DappRanked

            poll.previousVotes = arrayofChoices

            if (owned) {
              poll.owned = true
            }

            if (participated) {
              poll.participated = true
            }

            const Options = await poll.typeState.methods.requestOptions(listofPollsRanked[i]).call().catch((err => {}))

            if(Options !== undefined) {
              
              poll.options = Options

              poll.displayOptions = Options.join(", ")
              
            } else {
              poll.options = "Could not retrieve options"
            }

            let returnEligibility = await this.checkVoteEligibility(poll)

            poll.eligibility = returnEligibility[0]

            poll.canVote = returnEligibility[1]

            if(!poll.open) {
              
              let winners = await poll.typeState.methods.requestWinner(poll.name).call()

              let concatinatedWinners = winners.join(', ')

              if(concatinatedWinners === ", " || concatinatedWinners === "") {
                concatinatedWinners = "No one has voted yet."
              }

              poll.winner = concatinatedWinners
            }

            polls.set(listofPollsRanked[i], poll)

          }
        }
        
      }

      this.setState({ polls })

      this.setState({ pollNames: newlistofPolls })

      this.setState({ loading: false, loadingDescription: "Loading..." })
    }

  async loadSpecificPoll(pollName) {

    if(await this.state.DappStorage.methods.pollNameExists(pollName).call() === false) {
      return[undefined, false]
    } else {

      let poll 

      var typeStateArray = [this.state.DappRegular, this.state.DappQuadratic, this.state.DappRanked]

      for(var i=0; i<typeStateArray.length; i++) {
        let owner = await typeStateArray[i].methods.getPollOwner(pollName).call()
        if(owner !== this.state.nullAddress) {
          poll = await typeStateArray[i].methods.Polls(pollName).call()
          poll.name = pollName
          poll.type = typeStateArray[i].type
          poll.typeState = typeStateArray[i]
          break
        }
        if (i>=typeStateArray.length - 1) {
          this.setState({ loading: true, loadingDescription: "Failed to get poll information."})
        }
      }
      
      if(poll.name !== undefined) {

        if(poll.type === "Regular") {
          const votesUsed = await poll.typeState.methods.trackTotalVotes(poll.name, this.state.account).call()

          if (votesUsed > 0) {
            poll.participated = true
          }
        } else if(poll.type === "Quadratic") {
          const votesUsed = await poll.typeState.methods.trackTotalPayments(poll.name, this.state.account).call()

          if (votesUsed > 0) {
            poll.participated = true
          }
        } else if(poll.type === "Ranked") {

          const arrayofChoices = await poll.typeState.methods.trackSpecificVotes(poll.name, this.state.account).call()

          if (arrayofChoices.length > 0) {
            poll.participated = true
          }

        }

        if (poll.owner === this.state.account) {

          poll.owned = true

        }

        if (poll.open === false) {
          if(poll.type !== "Ranked") {
            poll.moneyOwed = await poll.typeState.methods.checkGetYourMoney(poll.name).call()
          }
        } else {
          poll.moneyOwed = 0
        }

        const Options = await poll.typeState.methods.requestOptions(pollName).call().catch((err => {console.log("error: ", err)}))

        if(Options !== undefined) {

          poll.options = Options

          poll.displayOptions = Options.join(", ")

        } else {
          poll.options = "Could not retrieve options"
        }

        let extraPollData = await this.refreshSpecificPollData(poll)

        return [extraPollData, true]
      }
    }
  } 

  async getRecentPolls() {

    const listofPollsQuadratic = await this.state.DappQuadratic.methods.getPollList().call()
    const listofPollsRegular = await this.state.DappRegular.methods.getPollList().call()
    const listofPollsRanked = await this.state.DappRanked.methods.getPollList().call()

    var arr = []
    
    arr.push(listofPollsRegular[listofPollsRegular.length-1])
    
    arr.push(listofPollsQuadratic[listofPollsQuadratic.length-1])
  
    arr.push(listofPollsRanked[listofPollsRanked.length-1])
    
    var arrPolls = []


    
    for(let i = 0; i<arr.length; i++) {
      if(arr[i] !== undefined) {
        let gotInfo = await this.loadSpecificPoll(arr[i])
        arrPolls[i] = gotInfo[0]
      }
    }
    
    this.setState({ homePagePolls: arrPolls })

  }

  async contractInteraction(typeState, sendBool, functionName, argumentArray, loadingDescription) {

    if(sendBool) {
      this.setState({ loading: true, loadingDescription })
    }

    let self = this

    if(typeState === "Regular") {
      typeState = this.state.DappRegular
    } else if (typeState === "Quadratic") {
      typeState = this.state.DappQuadratic
    } else if (typeState === "Ranked") {
      typeState = this.state.DappRanked
    } else if (typeState === "Storage") {
      typeState = this.state.DappStorage
    } else if (typeState === "Token") {
      typeState = this.state.DappToken
    }

    if(sendBool) {
      typeState.methods[functionName](...argumentArray).send({ from: self.state.account })
      .once('sending', function(payload){ 
        self.setState({ loading: true, loadingDescription: "Sending to network..."})
      })
      .once('transactionHash', function(hash){
        self.setState({ loading: false, loadingDescription: "Loading..."})
      })
      .on('error', function(error) {
        self.setState({ loading: false, loadingDescription: "Loading..."})
      })

    } else {
      let returnValue = await typeState.methods[functionName](...argumentArray).call()
      return returnValue
    }
    
  }

  async setPollNames() {
    let listofPollsQuadratic = await this.state.DappQuadratic.methods.getPollList().call()
    let listofPollsRegular = await this.state.DappRegular.methods.getPollList().call()
    let listofPollsRanked = await this.state.DappRanked.methods.getPollList().call()

    let pollNames = []

    pollNames = pollNames.concat(listofPollsRegular, listofPollsRanked, listofPollsQuadratic)

    return pollNames

  }

  async searchPolls(arrPollNames) {

    var arrPollData = []

    for(let u = 0; u<arrPollNames.length; u++) {
      
      let pollName = arrPollNames[u]

      if(await this.state.DappStorage.methods.pollNameExists(pollName).call() === false) {
        return[undefined, false]
      } else {

        var typeStateArray = [this.state.DappRegular, this.state.DappQuadratic, this.state.DappRanked]

        for(var i=0; i<typeStateArray.length; i++) {
          let owner = await typeStateArray[i].methods.getPollOwner(pollName).call()
          if(owner !== this.state.nullAddress) {
            let poll = {}
            poll.name = pollName
            poll.owner = owner
            poll.type = typeStateArray[i].type
            poll.typeState = typeStateArray[i]

            poll.description = await poll.typeState.methods.getPollDescription(pollName).call()

            const Options = await poll.typeState.methods.requestOptions(pollName).call().catch((err => {console.log("error: ", err)}))
            poll.displayOptions = Options.join(", ")

            arrPollData.push(poll)

            break
          }
        }
      }
    }

    return arrPollData

  }

  async buyToken(amount) {

    this.setState({ loading: true, loadingDescription: "Creating transaction and sending to network..." })


    const price = await this.state.DappTokenSale.methods.tokenPrice().call()

    let self = this

    this.state.DappTokenSale.methods.buyTokens(amount).send({ from: this.state.account, value: amount * price })
      .on('transactionHash', function(hash) { 
      self.loadBlockchainData();
      
    })
  }

  async vote(poll, option, votes) {
    
    this.setState({ loading: true })

    //prevents error "this.setState is not a function"
    let self = this

    if (poll.type === "Regular") {
      let payment = poll.cost * votes
      if (payment > 0) {
        this.setState({ loadingDescription: "Sending approve transaction..." })
                                            //make sure this address thing works
        this.state.DappToken.methods.approve(this.state.DappRegular.address, payment).send({ from: this.state.account })
        .once('transactionHash', function(hash){
          self.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..." })
          self.state.DappRegular.methods.vote(poll.name, option, votes).send({ from: self.state.account })
          .once('sending', function(payload){ 
            self.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..."})
          })
          .once('transactionHash', function(hash){
            self.loadBlockchainData()
          })
          .on('error', function(error) {
            self.setState({ loading: false, loadingDescription: "Loading..."})
          })
        })
        .on('error', function(error) {
        self.setState({ loading: false, loadingDescription: "Loading..."})
        })
      } else {

        this.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..." })

        this.state.DappRegular.methods.vote(poll.name, option, votes).send({ from: this.state.account })
        .once('sending', function(payload){ 
          self.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..."})
        })
        .once('transactionHash', function(hash){
          self.loadBlockchainData()
        })
        .on('error', function(error) {
          self.setState({ loading: false, loadingDescription: "Loading..."})
        })

      }
    } else if (poll.type === "Quadratic") {

        this.setState({ loadingDescription: "Sending approve transaction..." })

        let totalPayments = await this.state.DappQuadratic.methods.trackTotalPayments(poll.name, this.state.account).call()

        let totalPastVotes = await this.state.DappQuadratic.methods.findVotes(totalPayments).call()

        let finalPayment = await this.state.DappQuadratic.methods.findCost(votes, totalPastVotes).call()

                                            //make sure this address thing works
        this.state.DappToken.methods.approve(this.state.DappQuadratic.address, finalPayment).send({ from: this.state.account })
        .once('transactionHash', function(hash){
          self.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..." })
          self.state.DappQuadratic.methods.vote(poll.name, option, votes).send({ from: self.state.account })
          .once('sending', function(payload){ 
            self.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..."})
          })
          .once('transactionHash', function(hash){
            self.loadBlockchainData()
          })
          .on('error', function(error) {
            self.setState({ loading: false, loadingDescription: "Loading..."})
          })
        })
        .on('error', function(error) {
        self.setState({ loading: false, loadingDescription: "Loading..."})
        })
    } else if (poll.type === "Ranked") {

      this.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..." })

      this.state.DappRanked.methods.vote(poll.name, option).send({ from: this.state.account })
      .once('sending', function(payload){ 
        self.setState({ loadingDescription: "Creating transaction (to vote) and sending to network..."})
      })
      .once('transactionHash', function(hash){
        self.loadBlockchainData()
      })
      .on('error', function(error) {
        self.setState({ loading: false, loadingDescription: "Loading..."})
      })

    }
  }

  async checkVoteEligibility(poll) {

    if (!poll.publicPoll) {

      let boolAllowed = await poll.typeState.methods.isAllowedToVote(poll.name, this.state.account).call()
      .catch((err => {return ["Failure to check eligibility", false]}))

      if (boolAllowed === false) {

        return ["Not permitted to vote in this poll", false]

      }

    }
    
    if (poll.type === "Regular") {

      let votesUsed = await this.state.DappRegular.methods.trackTotalVotes(poll.name, this.state.account).call()

      votesUsed = votesUsed * 1

      let votesAvailable = poll.maxVotes * 1

      if (votesAvailable <= votesUsed) {
        
        return ["Not eligible to vote/no more votes left", false]

      } 

      let _votesAvailable = votesAvailable - votesUsed

      let votePrice = poll.cost

      if (votePrice == 0) {
        return ["You have " + _votesAvailable + " vote(s) left.", true]
      } else {

        let voterBalance = this.state.accountBalance

        let eligibleVotesCanPay = Math.floor(voterBalance / votePrice)

        if (isNaN(eligibleVotesCanPay) || eligibleVotesCanPay === 0) {
          return ["You cannot pay for any of your votes (" + _votesAvailable + " vote available). Purchase VDA at 'Manage VDA' in the Sidebar.", false]
        }

        if (_votesAvailable <= eligibleVotesCanPay) {
          return ["You have " + _votesAvailable + " vote(s) left and can pay for all of them!" , true]
        } else {
          return ["You have " + _votesAvailable + " vote(s) left and can pay for " + eligibleVotesCanPay + " vote(s).", true]
        }
      }

    } else if (poll.type === "Quadratic") {

      let totalPayments = await this.state.DappQuadratic.methods.trackTotalPayments(poll.name, this.state.account).call()

      let votesUsed = await this.state.DappQuadratic.methods.findVotes(totalPayments).call()

      votesUsed = votesUsed * 1

      let votesAvailable = poll.maxVotes * 1

      if (votesAvailable <= votesUsed) {
        return ["Not eligible to vote/no more votes left", false]
      } 
      
      let _votesAvailable = votesAvailable - votesUsed

      let voterBalance = await this.state.accountBalance

      if (voterBalance == 0) {
        return ["You cannot pay for any of your votes (" + _votesAvailable + " vote available). Purchase VDA at 'Manage VDA' in the Sidebar.", false]
      }

      let amountOfPossibleVotes = 0

      for(let i = voterBalance; i > 0; i--) {
        amountOfPossibleVotes = await this.state.DappQuadratic.methods.findVotes(i).call()

        if(amountOfPossibleVotes != 0) {
          break;
        }
      }

      if (amountOfPossibleVotes >= _votesAvailable) {
        return ["You have " + _votesAvailable + " vote(s) left and can pay for all of them!", true]
      } else if (amountOfPossibleVotes <_votesAvailable) {
        return ["You have " + _votesAvailable + " vote(s) left and can pay for " + amountOfPossibleVotes + " vote(s).", true]
      }

      return ["Failure to check eligibility", false]
      
    } else if (poll.type === "Ranked") {

      if (poll.participated) {
        return ["You already voted and are not allowed to vote again.", false]
      } else if (!poll.participated) {
        return ["You are eligible to vote once.", true]
      }

    }
  }

  async findCost(pollName, votes) {

    if(votes === "") {
      return 0
    }

    let totalPayments = await this.state.DappQuadratic.methods.trackTotalPayments(pollName, this.state.account).call()

    let votesUsed = await this.state.DappQuadratic.methods.findVotes(totalPayments).call()

    let finalPrice = await this.state.DappQuadratic.methods.findCost(votes, votesUsed).call()
    
    
    return finalPrice
  }

  async refreshSpecificPollData(poll) {

    //find previousVotes
    poll.previousVotes = []

    if(poll.type === "Regular") {

      for(let u = 0; u<poll.options.length; u++) {

        const optionVotes = await poll.typeState.methods.trackSpecificVotes(poll.name, poll.options[u], this.state.account).call()

        poll.previousVotes.push(optionVotes.toString())

      }

    } else if (poll.type === "Quadratic") {

      for(let u = 0; u<poll.options.length; u++) {

        const optionPayments = await poll.typeState.methods.trackSpecificPayments(poll.name, poll.options[u], this.state.account).call()

        const optionVotes = await poll.typeState.methods.findVotes(optionPayments).call()

        poll.previousVotes.push(optionVotes.toString())

      }
    } else if (poll.type === "Ranked") {
        poll.previousVotes = await poll.typeState.methods.trackSpecificVotes(poll.name, this.state.account).call()
    }
    

    poll.currentResults = []

    if(poll.type === "Regular" || poll.type === "Quadratic") {

      for(let u = 0; u<poll.options.length; u++) {

        const optionVotes = await poll.typeState.methods.requestOptionVotes(poll.name, poll.options[u]).call()

        poll.currentResults.push(optionVotes.toString())

      }

    } else if (poll.type === "Ranked") {

      for(let u = 0; u<poll.options.length; u++) {

        const optionVotes = await poll.typeState.methods.requestOptionVotes(poll.name, poll.options[u]).call()

        poll.currentResults.push(optionVotes.toString())

      }
    }

    //find eligibility
    let returnEligibility = await this.checkVoteEligibility(poll)

    poll.eligibility = returnEligibility[0]

    poll.canVote = returnEligibility[1]

    //find winner
    let winners = await poll.typeState.methods.requestWinner(poll.name).call()

    let concatinatedWinners = winners.join(', ')

    if(concatinatedWinners === ", " || concatinatedWinners === "") {
      concatinatedWinners = "No one has voted yet."
    }

    poll.winner = concatinatedWinners

    return poll
  }

  isAddress(arrAddrs) {
    for(let i = 0; i<arrAddrs.length; i++) {
      
      if(!window.web3.utils.isAddress(arrAddrs[i])) {
        return [arrAddrs[i], false]
      }
      if(arrAddrs[i] === this.state.nullAddress) {
        return [arrAddrs[i], false]
      }
    }
    return ["Good", true]
  }

  clearPollData() {
    this.setState({ polls: null })
  }

  constructor(props) {
    super(props)
    this.state = {
      nullAddress: '0x0000000000000000000000000000000000000000',
      account: '',
      accountBalance: '',
      tokenPrice: '0',

      DappRanked: null,
      DappRegular: null,
      DappQuadratic: null,
      DappToken: null,
      DappStorage: null,
      
      polls: null,
      pollNames: [],
      homePagePolls: null,

      loading: false,
      loadingDescription: "Connecting to browser extension...",
      loadingBlockchain: false,
    }

    this.isAddress = this.isAddress.bind(this)

    this.findCost = this.findCost.bind(this)
    
    this.buyToken = this.buyToken.bind(this)

    this.contractInteraction = this.contractInteraction.bind(this)
    
    this.refreshSpecificPollData = this.refreshSpecificPollData.bind(this)
    
    this.loadPollData = this.loadPollData.bind(this)

    this.loadSpecificPoll = this.loadSpecificPoll.bind(this)

    this.clearPollData = this.clearPollData.bind(this)

    this.setPollNames = this.setPollNames.bind(this)

    this.searchPolls = this.searchPolls.bind(this)

    this.getRecentPolls = this.getRecentPolls.bind(this)

    this.vote = this.vote.bind(this)
  }

  render() {
    let path = this.props.location.pathname.substring(0, 4);
    
    if(this.props.location.pathname === "/") {
      return (
        <Home />
      )
    } else if(this.props.location.pathname === "/polldesc") {
      return (
        <Polldesc />
      )
    } else if(this.state.loadingBlockchain) {
      return(
        <div>
          <Fakemain 
            loadingDescription={this.state.loadingDescription}
          />
          <Loadbar
            loadingDescription={this.state.loadingDescription}
          />
          <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
            <div className="text-white col-sm-1 col-md-1 mr-0">
              <small >
              <a
                className="navbar-brand"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >VoteDapp</a></small>
            </div>
          </nav>
        </div>
      )
    } else if(path === "/app") {
      return (
        <div>
          {this.state.loading
            && <div id="loader" className="text-center mt-5">
                <Loadbar
                  loadingDescription={this.state.loadingDescription}
                />
              </div>
          }
             <div>

                <Main

                  polls={this.state.polls}
                  pollNames={this.state.pollNames}
                  homePagePolls={this.state.homePagePolls}

                  loading={this.state.loading}

                  tokenPrice = {this.state.tokenPrice}

                  account={this.state.account}
                  accountBalance = {this.state.accountBalance}

                  isAddress={this.isAddress}

                  loadPollData = {this.loadPollData}
                  clearPollData = {this.clearPollData}
                  contractInteraction={this.contractInteraction}
                  findCost={this.findCost}
                  buyToken={this.buyToken}
                  vote={this.vote}
                  loadSpecificPoll={this.loadSpecificPoll}
                  setPollNames={this.setPollNames}
                  searchPolls={this.searchPolls}
                  getRecentPolls={this.getRecentPolls}
                  
                />
              </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <p></p>
          <section className="jumbotron bg-primary">
            <div className="container text-center">
              <h1 className="display-4">Uh Oh!</h1>
              <p className="lead text-white">Looks like this page doesn't exist...</p>
              
            </div>

          </section>
          <div className="text-center">
            <a className="btn btn-primary" href="/">Home</a>
          </div>
        </div>
      )
    }
  }
}
        

export default withRouter(App);
