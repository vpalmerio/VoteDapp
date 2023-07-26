import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Navbar from './Navbar'
import ballotbox from './ballotbox2.png'
import Jdenticon from './Jdenticon.js'

import {Helmet} from "react-helmet";

import loader from './loader.png'

export default function Main(props) { 

      return (
        <Router>  
          <div>
            <main>
            <Navbar account={props.account} accountBalance={props.accountBalance} />
            <Switch>
              <Route path="/app" exact render = {() => 
                <div>
                  
                  <Apphome

                    contractInteraction={props.contractInteraction}

                    getRecentPolls={props.getRecentPolls}

                    homePagePolls={props.homePagePolls}

                  /> 
                </div>
              } />

              <Route path="/app/owned" exact render = {() => 
                <div>
                  
                  <Ownedpolls

                    pollNames={props.pollNames}

                    polls={props.polls}

                    contractInteraction={props.contractInteraction}

                    loadPollData={props.loadPollData}

                  />
                </div>
              } />

              <Route path="/app/participated" exact render = {() => 
                <div>
                  
                  <Participatedpolls

                    pollNames={props.pollNames}

                    polls={props.polls}

                    contractInteraction={props.contractInteraction}

                    loadPollData={props.loadPollData}

                  />
                </div>
              } />

              <Route path="/app/explore" exact render = {() =>
                <div>
                   
                  <Explore

                    pollNames={props.pollNames}

                    searchPolls={props.searchPolls}

                    setPollNames={props.setPollNames}

                  />
                </div>
              } />

              <Route path="/app/manage-vda" exact render = {() => 
                <div>
                  
                  <Managingvda

                    accountBalance={props.accountBalance}

                    tokenPrice={props.tokenPrice}

                    contractInteraction={props.contractInteraction}

                    buyToken={props.buyToken}

                    isAddress={props.isAddress}

                  />
                </div>
              } />

              <Route path="/app/choose-poll-type" exact render = {() => 
                <div>
                  
                  <Choosingpolltype

                  />
                </div>
              } />

              <Route path="/app/create-poll/:type" exact render = {() => 
                <div>
                  
                  <Creatingpoll
                    
                    contractInteraction={props.contractInteraction}

                    isAddress={props.isAddress}

                    account={props.account}

                    clearPollData={props.clearPollData}

                  />
                </div>
              } />

              <Route path="/app/polls/:tempname" render = {() =>
                <div>
                   
                  <Getpollinfo

                    account={props.account}

                    contractInteraction={props.contractInteraction}

                    loadSpecificPoll={props.loadSpecificPoll}

                    vote={props.vote}

                    findCost={props.findCost}

                    accountBalance={props.accountBalance}

                  />
                </div>
              } />

              <Route render={() =>

                <Wrongpage

                />

              } />
              </Switch>
            </main>
          </div>
        </Router>
      );
}

const Wrongpage = () => {

  const history = useHistory()

    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">

            <h1 className="text-center">Uh oh!</h1>
            <h1 className="text-center">This page doesn't exist!</h1>
            
            <p>&nbsp;</p>
            <button className="btn btn-primary btn-block" onClick = {() => history.push('/app')}>Back to Safety</button>

            </div>
          </main>
        </div>
      </div>
    )
}

const Apphome = ({ contractInteraction, getRecentPolls, homePagePolls }) => {
  
  const history = useHistory()

  if(homePagePolls===null) {
    getRecentPolls()
    return (

      <div id="loader" className="text-center mt-5">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Create your first poll or check out some new ones!" />
        </Helmet>
        <p>Loading polls...</p>
        <img 
          src={loader} 
          alt="Ballot Box" 
          width="64"
          height="64"
        />
      </div>

    )
  } else {

  return (

  <div className="container-fluid mt-5">
    <Helmet>
      <title>Home </title>
      <meta name="description" content="Create your first poll or check out some new ones!" />
    </Helmet>
    <div className="row">
      <main role="main" className="ml-auto mr-auto" style={{ maxWidth: '800px' }}>
        <div className="content mr-auto ml-auto">
            <div className="text-center">
              <img 
                src={ballotbox} 
                alt="Ballot Box" 
                width="474"
                height="474"
              />
            </div>
            <p>&nbsp;</p>
            <button className="btn btn-primary btn-block mr-auto ml-auto" style={{ maxWidth: '550px' }} onClick = {() => history.push("/app/choose-poll-type")}>Create Poll</button>
          <p>&nbsp;</p>

          {homePagePolls.length > 0
            && <p className="text-center"> Recently Created Polls </p>
          }
          

          {homePagePolls.map((poll, key) => {

          var speciallink1 = poll.name.replace(/\?/g, "_question_mark_");
          var speciallink = speciallink1.replace(/\#/g, "_hashtag_");

          return(
            <div key={key} className="">
            <div className="card mb-4 bg-dark" style={{ maxWidth: '600px', maxHeight: '300px' }}>
              <div className="card-header">
                <small className="float-left mt-1 text-white">
                  <p>Name: {poll.name} &nbsp;</p>
                </small>
                
                <small className="float-right mt-1 text-white">
                  <p>Type: {poll.type}</p>
                </small>
                
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white">
                  {poll.description === ""
                    ||<p>Description: {poll.description}</p>
                  }
                  
                  
                  <p>Options: {poll.displayOptions}</p>

                  {poll.open
                    ? <div>{poll.canVote
                          || <p>You can't vote in this poll</p>
                      }</div>
                    : <p> Poll has ended. The winner was {poll.winner.replace(', ', '')}. </p>
                  }
                  <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => history.push("/app/polls/" + speciallink)}>More Info</button>
                  {poll.open
                    || <div>
                        {poll.moneyOwed > 0

                          && <button className="btn btn-primary btn-block" style={{ maxWidth: '550px' }} onClick = {() => contractInteraction
                              (poll.typeState, true, "getYourMoney", [poll.name], "Creating transaction and sending to network...")
                              }>Retrieve Spent Tokens</button>

                        }
                      </div>
                    }
                  </li>
                  <li className="list-group-item py-2 bg-dark">
                    
                    <small className="text-muted">
                      <Jdenticon size="30" value={poll.owner} />
                      <span></span>
                    {poll.owner}</small>
                  </li>
                </ul>
              </div>
              </div>
            )
          })}
          
          </div>
        </main>
      </div>
    </div>
  )
  }
};

const Ownedpolls = ({ pollNames, polls, contractInteraction, loadPollData }) => {
  
  const history = useHistory()

  const [oldUser, oldUserBool] = React.useState(false)

  if(polls===null) {
    loadPollData()
    return (

      <div id="loader" className="text-white text-center mt-5">
        <Helmet>
          <title>Owned Polls</title>
          <meta name="description" content="Review the polls you created here!" />
          
        </Helmet>
        <p>Loading polls...</p>
        <img 
          src={loader} 
          alt="Ballot Box" 
          width="64"
          height="64"
        />
      </div>

    )
  } else {

  return (

  <div className="container-fluid mt-5">
    <Helmet>
      <title>Owned Polls</title>
      <meta name="description" content="Review the polls you created here!" />
      
    </Helmet>
    <div className="row">
      <main role="main" className="mr-auto ml-auto content" style = {{ maxWidth: '800px'}}>
        <div>

          {oldUser
            ? <div className="text-center">
                <p>&nbsp;</p>
                <p className="">Polls You Created</p>
              </div>
            : <p className="text-center">You have not created any polls</p>
          }

          {pollNames.map((pollName, key) => {

            let poll = polls.get(pollName)

            if (poll.owned === true) {

              if(!oldUser) {
                oldUserBool(true)
              }

            var speciallink1 = poll.name.replace(/\?/g, "_question_mark_");
            var speciallink = speciallink1.replace(/\#/g, "_hashtag_");

            return(
              <div key={key} className="float-left move-right-little">
              <div className="card mb-4 bg-dark" style={{ maxWidth: '800px', maxHeight: '300px' }}>
                <div className="card-header">
                  <small className="float-left mt-1 text-white">
                    <p>Name: {poll.name} &nbsp;</p>
                  </small>
                  
                  <small className="float-right mt-1 text-white">
                    <p>Type: {poll.type}</p>
                  </small>
                  
                </div>
                <ul id="pollList" className="list-group list-group-flush">
                  <li className="list-group-item bg-dark text-white">
                    {poll.description === ""
                      ||<p>Description: {poll.description}</p>
                    }
                    
                    <p>Options: {poll.displayOptions}</p>

                    {poll.open
                      ? <div>
                          {poll.canVote
                            || <p>You can't vote in this poll</p>
                          }
                        </div>
                      :<div> 
                        {poll.winner === "No one has voted yet."
                          ?<p> The poll ended, but no one voted. </p>
                          :<p> Poll has ended. The winner was {poll.winner.replace(', ', '')}. </p>
                        }
                      </div>
                    }
                    <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => history.push("/app/polls/" + speciallink)}>More Info</button>


                    {poll.open
                      || <div>
                          {poll.moneyOwed > 0

                            && <button className="btn btn-primary btn-block" style={{ maxWidth: '200px' }} onClick = {() => contractInteraction
                                (poll.typeState, true, "getYourMoney", [poll.name], "Creating transaction and sending to network...")
                                }>Retrieve Spent Tokens</button>

                          }
                        </div>
                    }
                  </li>
                </ul>
              </div>
              </div>
            )}
          })}

          <p>&nbsp;</p>
          
          </div>
        </main>
      </div>
    </div>
  )
  }
};

const Participatedpolls = ({ pollNames, polls, contractInteraction, loadPollData }) => {
  
  const history = useHistory()

  const [oldUser, oldUserBool] = React.useState(false)

  if(polls===null) {
    loadPollData()
    return (

      <div id="loader" className="text-white text-center mt-5">
        <Helmet>
          <title>Polls You Participated In</title>
          <meta name="description" content="Review the polls that you participated in!" />
          
        </Helmet>
        <p>Loading polls...</p>
        <img 
          src={loader} 
          alt="Ballot Box" 
          width="64"
          height="64"
        />
      </div>

    )
  } else {

  return (

  <div className="container-fluid mt-5">
    <Helmet>
      <title>Polls You Participated In</title>
      <meta name="description" content="Review the polls that you participated in!" />
      
    </Helmet>
    <div className="row">
      <main role="main" className="col-lg-12 mr-auto ml-auto content" style = {{ maxWidth: '800px'}}>
        <div>

          {oldUser
            ? <div className="text-center">
                <p>&nbsp;</p>
                <p className="">Polls You Participated In</p>
              </div>
            : <p className="text-center">You have not participated in any polls</p>
          }

          {pollNames.map((pollName, key) => {

            let poll = polls.get(pollName)

            if (poll.participated === true) {

              if(!oldUser) {
                oldUserBool(true)
              }

            var speciallink1 = poll.name.replace(/\?/g, "_question_mark_");
            var speciallink = speciallink1.replace(/\#/g, "_hashtag_");

            return(
              <div key={key} className="float-left move-right-little">
              <div className="card mb-4 bg-dark" style={{ maxWidth: '800px', maxHeight: '300px' }}>
                <div className="card-header">
                  <small className="float-left mt-1 text-white">
                    <p>Name: {poll.name} &nbsp;</p>
                  </small>
                  
                  <small className="float-right mt-1 text-white">
                    <p>Type: {poll.type}</p>
                  </small>
                  
                </div>
                <ul id="pollList" className="list-group list-group-flush">
                  <li className="list-group-item bg-dark text-white">
                    {poll.description === ""
                      ||<p>Description: {poll.description}</p>
                    }
                    
                    <p>Options: {poll.displayOptions}</p>

                    {poll.open
                      ? <div>
                          {poll.canVote
                            || <p>You can't vote in this poll</p>
                          }
                        </div>
                      :<div> 
                        {poll.winner === "No one has voted yet."
                          ?<p> The poll ended, but no one voted. </p>
                          :<p> Poll has ended. The winner was {poll.winner.replace(', ', '')}. </p>
                        }
                      </div>
                    }
                    <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => history.push("/app/polls/" + speciallink)}>More Info</button>


                    {poll.open
                      || <div>
                          {poll.moneyOwed > 0

                            && <button className="btn btn-primary btn-block" style={{ maxWidth: '200px' }} onClick = {() => contractInteraction
                                (poll.typeState, true, "getYourMoney", [poll.name], "Creating transaction and sending to network...")
                                }>Retrieve Spent Tokens</button>

                          }
                        </div>
                    }
                  </li>

                  <li className="list-group-item py-2 bg-dark">
                    <small className="text-muted">
                      <Jdenticon size="30" value={poll.owner} />
                      <span></span>
                    {poll.owner}</small>
                    
                  </li>
                </ul>
              </div>
              </div>
            )}
          })}

          <p>&nbsp;</p>
          
          </div>
        </main>
      </div>
    </div>
  )
  }
};

const Explore = ({ searchPolls, setPollNames }) => {

  const history = useHistory()

  const [pollNames, changePollNames] = React.useState([])

  const [searchTerm, changeSearchTerm] = React.useState("")

  const [searchedPollData, changeSearchedPollData] = React.useState([])

  const [loading, changeLoading] = React.useState(false)

  const [workaround, changeWorkAround] = React.useState(false) 

  const searchData = (searchPollName) => {
    let searchedPollNames = []
    if(searchPollName !== "") {
      for(let i = 0; i<pollNames.length; i++) {
        let newStr = pollNames[i].substr(0, searchPollName.length)
        let lowCaseNewStr = newStr.toLowerCase()
        let lowCaseSearchPollName = searchPollName.toLowerCase()
        if (lowCaseNewStr === lowCaseSearchPollName) {
          searchedPollNames.push(pollNames[i])
        }
      }
      getPollData(searchedPollNames)
    }
  }

  const getPollData = async (arrPollNames) => {
    
    let finalPollData = await searchPolls(arrPollNames)

    changeSearchedPollData(finalPollData)
    changeLoading(false)
  }

  const getPollNames = async () => {
    
    let finalPollNames = await setPollNames()

    changePollNames(finalPollNames)
  }

  const shuffle = (array) => {
    // taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    getPollData(array);
  }

  if(pollNames.length === 0) {
    getPollNames()
  }

  if(loading) {

    searchData(searchTerm)
    
  }

    return (
      <div className="container-fluid mt-5">
        <Helmet>
          <title>Explore</title>
          <meta name="description" content="Explore polls that others have created!" />
        </Helmet>
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              
              <div className="mr-sm-2">
                <input
                  
                  type="text"
                  onChange={(input) => { 
                    changeSearchTerm(input.target.value)
                    if(input.target.value !== "") {
                      changeLoading(true)
                    }
                  }}
                  className="form-control"
                  placeholder="Name of poll"
                  required />
              </div>

              <p>&nbsp;</p>

              <button className="btn btn-primary btn-block" onClick = {() => {
                //fails to update state if used twice
                shuffle(pollNames)
                //workaround
                changeWorkAround(!workaround)
              }}>Randomize</button>

              <p>&nbsp;</p>

              <button className="btn btn-primary btn-block" onClick = {() => history.goBack()}>Back</button>

              <p>&nbsp;</p>

              {loading
                && <div className="text-center">
                    <p>Loading...</p>
                    <img 
                      src={loader} 
                      alt="Ballot Box" 
                      width="64"
                      height="64"
                    />
                  </div>
              }

              {searchedPollData.map((poll, key) => {

              var speciallink1 = poll.name.replace(/\?/g, "_question_mark_");
              var speciallink = speciallink1.replace(/\#/g, "_hashtag_");

              return(
                <div className="card mb-4 bg-dark" key={key}>
                  <div className="card-header">
                    <small className="float-left mt-1 text-white">
                      <p>Name: {poll.name}</p>
                    </small>
                    
                    <small className="float-right mt-1 text-white">
                      <p>Type: {poll.type}</p>
                    </small>
                    
                  </div>
                  <ul id="pollList" className="list-group list-group-flush">
                    <li className="list-group-item bg-dark text-white">
                      {poll.description === ""
                        ||<p>Description: {poll.description}</p>
                      }

                      <p>Options: {poll.displayOptions}</p>
                      <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => history.push("/app/polls/" + speciallink)}>More Info</button>
                    </li>
                    <li className="list-group-item py-2 bg-dark">
                      <small className="text-muted">
                        <Jdenticon size="30" value={poll.owner} />
                        <span></span>
                      {poll.owner}</small>
                    </li>
                  </ul>
                </div>
                )
              })}


            </div>
          </main>
        </div>
      </div>
    )
}

const Managingvda = ({ accountBalance, tokenPrice, contractInteraction, buyToken, isAddress }) => {
  
  const history = useHistory()

  const [amountoftokensInput, changeAOTI] = React.useState(0)

  let tempFinalPrice = tokenPrice * amountoftokensInput

  return (

    <div className="container-fluid mt-5">
      <Helmet>
        <title>Manage your VDA</title>
        <meta name="description" content="Purchase VDA tokens here!" />
      </Helmet>
      <div className="row">
        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
              <div className="text-center">
                <p>Your VDA Balance: {accountBalance}</p>
                <p>Total Price in Wei: {tempFinalPrice}</p>
              </div>
              <form onSubmit={(event) => {
                event.preventDefault()
                
                buyToken(amountoftokensInput)
              }}>
                <div className="form-group mr-sm-2">
                  <input
                  id="amountoftokens"
                  type="number"
                  onChange={(input) => { changeAOTI(input.target.value) }}
                  className="form-control"
                  placeholder= {"Cost per token (wei): " + tokenPrice}
                  required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Buy Tokens</button>
              </form>
              <p>&nbsp;</p>
            <p>&nbsp;</p>
            <button className="btn btn-primary btn-block" onClick = {() => history.goBack()}>Back</button>
          </div>
        </main>
      </div>
    </div>
  )
};

const Choosingpolltype = () => {
  
  const history = useHistory()

  return (

    <div className="container-fluid mt-5">
      <Helmet>
        <title>Choose Your Poll Type</title>
        <meta name="description" content="Choose the type of poll you want to create!" />
        
      </Helmet>
      <div className="row">
        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
          <div className="content mr-auto ml-auto">

            <p>&nbsp;</p>
            <button className="btn btn-primary btn-block" onClick = {() => history.push("/app/create-poll/Regular")}>Regular Voting</button>
            
            <p>&nbsp;</p>
            <button className="btn btn-primary btn-block" onClick = {() => history.push("/app/create-poll/Quadratic")}>Quadratic Voting</button>

            <p>&nbsp;</p>
            <button className="btn btn-primary btn-block" onClick = {() => history.push("/app/create-poll/Ranked")}>Ranked Choice Voting</button>
            
            <p>&nbsp;</p>
            <div className="text-center">
              <button className="btn btn-link btn-sm pt-0" onClick = {() => history.push("/polldesc")}>What are these?</button>
            </div>

            <p>&nbsp;</p>
            <button className="btn btn-primary btn-block" onClick = {() => history.goBack()}>Back</button>
            <p>&nbsp;</p>
          </div>
        </main>
      </div>
    </div>
  )
};

const Creatingpoll = ({ contractInteraction, isAddress, account, clearPollData }) => {

  const history = useHistory()

  const { type } = useParams()

  const [page, changePage] = React.useState("Name")

  const [pollNameInput, changePollName] = React.useState("")
  const [nameTaken, changeCIReturnData] = React.useState(false)

  const talkToContractInteraction = async (typeState, sendBool, functionName, argumentArray, loadingDescription) => {
    let returndata = await contractInteraction(typeState, sendBool, functionName, argumentArray, loadingDescription)
    changeCIReturnData(returndata)
  }

  
  const [pollDescriptionInput, changePollDescriptionInput] = React.useState("")

  const [pollOptionsInput, changePollOptionsInput] = React.useState([])

  const [pollPrivatePollInput, privatePollBool] = React.useState(false)
  const [pollRestrictedVotersArrayInput, changeRestrictedVotersArray] = React.useState([])

  const [pollMaxVotesInput, changePollMaxVotesInput] = React.useState(1)

  const [costsMoney, costsMoneyBool] = React.useState(false)
  const [pollRecipientInput, changePollRecipientInput] = React.useState(account)
  const [pollVoteCostInput, changeVoteCostInput] = React.useState(0)
  const [returnMoneyOnCompletionInput, changeRMOCI] = React.useState(true)
  const [sendFundsToMe, sendFundsToMeBool] = React.useState(true)

  const [workaround, changeWorkAround] = React.useState(false)

  const [showManagedOwnedPolls, changeShowManagedOwnedPolls] = React.useState(false)

  if(sendFundsToMe) {
    if(pollRecipientInput !== account) {
      changePollRecipientInput(account)
    }
  }

  if(type !== "Regular" && type !== "Quadratic" && type !== "Ranked") {
    return (

      <Wrongpage />

    )
  } else {
  
    if(page === "Name") {
      return (

        <div className="container-fluid mt-5">
          <Helmet>
            <title>Create a Poll!</title>
            <meta name="description" content="Create your own customizable poll here!" />
            
          </Helmet>
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>
                <div className="text-center style={{ maxWidth: '400px' }}">
                  <p>&nbsp;</p>
                  <h1> Your Poll's Name </h1>
                  <p> What's the main idea? Short words are better. </p>

                  {nameTaken
                    && <p className="text-left text-danger"> This poll name has already been taken. </p>
                  }
                  <div className="mr-sm-2">
                    
                    {nameTaken

                      ?<input
                        type="text"
                        onChange={(input) => {
                          talkToContractInteraction("Storage", false, "pollNameExists", [input.target.value], "Loading...")

                          changePollName(input.target.value)

                          }
                        }
                        className="form-control"
                        value={pollNameInput}
                        style={{ borderColor: 'red'}}
                        required />

                    
                      :<input
                        type="text"
                        onChange={(input) => {
                          talkToContractInteraction("Storage", false, "pollNameExists", [input.target.value], "Loading...")

                          changePollName(input.target.value)

                          }
                        }
                        className="form-control"
                        value={pollNameInput}
                        required />
                    }
                  </div>

                  <p>&nbsp;</p>

                  {pollNameInput === ""
                    ||<div>
                      {nameTaken
                        || <button className="btn btn-primary btn-block" onClick = {() => changePage("Description")}>Next</button>
                      }
                      </div>
                  }
                  

                  <p>&nbsp;</p>

                  <button className="btn btn-primary btn-block" onClick = {() => history.goBack()}>Back</button>

                  <p>&nbsp;</p>
                  </div>
                </div>
            </main>
          </div>
        </div>
      )
    } else if(page === "Description") {
      return (

        <div className="container-fluid mt-5">
          <Helmet>
            <title>Create a Poll!</title>
            <meta name="description" content="Create your own customizable poll here!" />
            
          </Helmet>
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content text-center">
                <p>&nbsp;</p>
                
                <h1> What is your poll for? </h1>
                <p> Extra details, recipient/target of poll, etc. </p>
                <p> You can skip this to save gas </p>
                <div className="mr-sm-2">
                  <form>
                    <input

                      type="text"
                      onChange={(input) => {
                          changePollDescriptionInput(input.target.value)

                        }
                      }
                      className="form-control"
                      value={pollDescriptionInput}
                    />
                  </form>
                </div> 

                <p>&nbsp;</p>

                {pollDescriptionInput === ""
                  ?<button className="btn btn-primary btn-block" onClick = {() => {
                    changePollDescriptionInput("")
                    changePage("Options")
                  }}>Skip</button>
                  :<button className="btn btn-primary btn-block" onClick = {() => changePage("Options")}>Next</button>
                }
                
                <p>&nbsp;</p>

                <button className="btn btn-primary btn-block" onClick = {() => changePage("Name")}>Back</button>

                <p>&nbsp;</p>

                </div>
            </main>
          </div>
        </div>
      )
    } else if(page === "Options") {

      let tempOptionStorage

      return (
        <div className="container-fluid mt-5">
          <Helmet>
            <title>Create a Poll!</title>
            <meta name="description" content="Create your own customizable poll here!" />
            
          </Helmet>
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content text-center">
                <p>&nbsp;</p>

                <h1> What are the options people can vote on? </h1>
                <p> Type in an option, then press "Add option" to add it to the list. </p>


                <form onSubmit={(event) => {
                  event.preventDefault()

                  if(tempOptionStorage === "" || tempOptionStorage == undefined) {
                    window.alert("Please put an option in the textbox.")
                  } else {

                    let taken = false;
                    for(let i = 0; i<pollOptionsInput.length; i++) {
                      if(tempOptionStorage==pollOptionsInput[i]) {
                        taken=true;
                        window.alert("You already have the option: " + tempOptionStorage)
                        break;
                      }
                    }
                    if(!taken) {
                      let temparr = pollOptionsInput
                      temparr.push(tempOptionStorage)

                      changePollOptionsInput(temparr)
                      
                      changeWorkAround(!workaround)

                      document.getElementById('Option').value = '';
                    }
                  }

                }}>
                  <div className="form-group mr-sm-2">
                    <input
                      id="Option"
                      type="text"
                      onChange={(input) => {
                          tempOptionStorage = input.target.value
                        }
                      }
                      className="form-control"
                      placeholder="Ex. yes"
                    />
                  </div>

                  <p>&nbsp;</p>

                  <button type="submit" className="btn btn-primary btn-block">Add option</button>

                </form>

                <p>&nbsp;</p>

                <p> Selectable Options: </p>
                
                  {pollOptionsInput.map((option, key) => {
                      return (
                      <div key={key} className="text-left">
                        <li>{option}</li>
                        <button className="btn btn-link btn-sm pt-0" onClick = {() => {

                          let temparr = pollOptionsInput

                          temparr.splice(key, 1)

                          document.getElementById('Option').value = '';

                          changePollOptionsInput(temparr)

                          changeWorkAround(!workaround)

                        }}>Remove</button>
                      </div>
                      )
                  })}


                <p>&nbsp;</p>

                {pollOptionsInput.length > 0
                  &&<div> 
                      <button className="btn btn-primary btn-block" onClick = {() => changePage("More options")}>Next</button>
                    </div>

                }

                <p>&nbsp;</p>

                <button className="btn btn-primary btn-block" onClick = {() => changePage("Description")}>Back</button>

                <p>&nbsp;</p>

                </div>
            </main>
          </div>
        </div>
      )
    } else if(page === "More options") {

      let tempAddressStorage

      return (

        <div className="container-fluid mt-5">
          <Helmet>
            <title>Create a Poll!</title>
            <meta name="description" content="Create your own customizable poll here!" />
            
          </Helmet>
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>
                <div className="text-center">
                  <h1> More options </h1>
                  <p> Charge money for votes (regular and quadratic only) and/or only allow certain people to vote </p>
                </div>

                {type === "Regular"
                  &&
                    <div>
                      <div className="form-group mr-sm-2 text-center">
                        <label> Maximum amount of votes for each voter </label>
                        <input
                          type="number"
                          onChange={(input) => {
                            changePollMaxVotesInput(input.target.value)
                              
                            }
                          }
                          className="form-control"
                          value={pollMaxVotesInput}
                          required 
                        />
                      </div>
                      <div className="form-check ml-auto mr-auto">
                        <input
                          type="checkbox"
                          checked={costsMoney}
                          onChange= {() => costsMoneyBool(!costsMoney)}
                          className="form-check-input"
                           />
                          <label className=""> Charge money for votes </label>
                      </div>
                      {costsMoney
                        && <div className="mr-sm-2 ml-auto mr-auto ">
                            <div className="form-group text-center">
                              <label> Cost in VDA tokens </label>
                              <input
                                type="number"
                                onChange={(input) => changeVoteCostInput(input.target.value)}
                                className="form-control"
                                value={pollVoteCostInput}
                                required />
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                checked={returnMoneyOnCompletionInput}
                                onChange= {() => changeRMOCI(!returnMoneyOnCompletionInput)}
                                className="form-check-input"
                                 />
                                <label> Return money to voters upon completion of poll </label>
                            </div>
                            {returnMoneyOnCompletionInput
                              || <div>
                                   <div className="form-group mr-sm-2 text-center">
                                      <label> Recipient of funds spent on winning option </label>
                                      {sendFundsToMe
                                        ? <input
                                            onChange={(input) => changePollRecipientInput(input.target.value)}
                                            className="form-control"
                                            value={account}
                                            disabled={true}
                                          />
                                        : <input
                                            onChange={(input) => changePollRecipientInput(input.target.value)}
                                            className="form-control"
                                            value={pollRecipientInput}
                                            required 
                                          />
                                      }
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        checked={sendFundsToMe}
                                        onChange={() => {
                                          sendFundsToMeBool(!sendFundsToMe)
                                        }}
                                        className="form-check-input"
                                         />
                                        <label className=""> Send funds to me </label>
                                    </div>
                                </div>
                              </div>
                            }
                          </div>
                        }
                    </div>
                }

                {type === "Quadratic"
                && <div>
                    <div className="form-group mr-sm-2 text-center">
                      <label> Maximum amount of votes for each voter </label>
                      <input
                        type="number"
                        onChange={(input) => {
                          changePollMaxVotesInput(input.target.value)
                            
                          }
                        }
                        className="form-control"
                        value={pollMaxVotesInput}
                        required 
                      />
                    </div>
                    <div className="form-check mr-auto ml-auto ">
                        <input
                          type="checkbox"
                          checked={returnMoneyOnCompletionInput}
                          onChange= {() => changeRMOCI(!returnMoneyOnCompletionInput)}
                          className="form-check-input"
                           />
                        <label> Return money upon completion of poll </label>
                        </div>
                        {returnMoneyOnCompletionInput
                          || <div>
                               <div className="form-group mr-sm-2 text-center">
                                  <label> Recipient of funds spent on winning option </label>
                                  {sendFundsToMe
                                    ? <input
                                        type="text"
                                        onChange={(input) => changePollRecipientInput(input.target.value)}
                                        className="form-control"
                                        value={account}
                                        disabled={true}
                                      />
                                    : <input
                                        onChange={(input) => changePollRecipientInput(input.target.value)}
                                        className="form-control"
                                        value={pollRecipientInput}
                                        required 
                                      />
                                  }
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    checked={sendFundsToMe}
                                    onChange={() => {
                                      sendFundsToMeBool(!sendFundsToMe)
                                    }}
                                    className="form-check-input"
                                     />
                                    <label className=""> Send funds to me </label>
                                </div>
                            </div>
                          </div>
                        }
                    </div>
                }
                

                <p>&nbsp;</p>

                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={pollPrivatePollInput}
                    onChange= {() => privatePollBool(!pollPrivatePollInput)}
                    className="form-check-input"
                     />
                    <label className=""> Private poll </label>
                </div>

              

              {pollPrivatePollInput
                  && <div className="">
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      var temparr = tempAddressStorage
                      var newtemparr
                      if(temparr === []) {
                        newtemparr = []
                      } else {
                        temparr = temparr.split(", ")

                        let checkAddrs = isAddress(temparr)

                        if(!checkAddrs[1]) {
                          window.alert("Invalid address detected: " + checkAddrs[0])
                        } else if(checkAddrs[1]) {
                          newtemparr = pollRestrictedVotersArrayInput.concat(temparr)
                          changeRestrictedVotersArray(newtemparr)
                        }
                        
                        
                      }
                      
                    }}>
                      <div className="form-group mr-sm-2">
                        <input
                          type="text"
                          onChange={(input) => {
                            tempAddressStorage = input.target.value

                            }
                          }
                          className="form-control"
                          placeholder="Allowed voters separated by comma and space (ex. 0x01, 0x02, 0x03)"
                          required />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">Add addresses</button>
                    </form>
                    <p>&nbsp;</p>
                    <p> Allowed Addresses </p>
                      {pollRestrictedVotersArrayInput.map((address, key) => {
                        return (
                        
                          <li key={key}>{address}</li>

                        )
                      })}
                   
                  </div>
                }

              <p>&nbsp;</p>

                <p>&nbsp;</p>

                <button className="btn btn-primary btn-block" onClick = {() => {

                  if(pollMaxVotesInput <= 0) {
                    window.alert("You cannot have 0 maximum votes.")
                  } else {

                    if(costsMoney && pollVoteCostInput <= 0) {
                      window.alert("The cost per vote must be greater than 0, or you can uncheck 'Charge money for votes' for free voting.")
                    } else {

                      if (!returnMoneyOnCompletionInput && costsMoney) {
                        let tempRecipientArr = [pollRecipientInput]
                        
                        let checkAddrs = isAddress(tempRecipientArr)

                        if(!checkAddrs[1]) {
                          window.alert("Invalid address detected: " + checkAddrs[0])
                        } else if(checkAddrs[1]) {
                          changePage("Finish")
                        }
                      } else {
                        changePage("Finish")
                      }
                    }
                  }
                  

                }}>Next</button>

                <p>&nbsp;</p>

                <button className="btn btn-primary btn-block" onClick = {() => changePage("Options")}>Back</button>

                <p>&nbsp;</p>

                </div>
            </main>
          </div>
        </div>
      )
    } else if(page === "Finish") {
      return (

        <div className="container-fluid mt-5">
          <Helmet>
            <title>Create a Poll!</title>
            <meta name="description" content="Create your own customizable poll here!" />
            
          </Helmet>
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  let arrOfArguments = []

                  arrOfArguments.push(pollNameInput)
                  arrOfArguments.push(pollDescriptionInput)
                  arrOfArguments.push(pollOptionsInput)
                  
                  if(type !== "Ranked") {

                    arrOfArguments.push(pollMaxVotesInput)

                    if(type === "Regular") {

                      if(costsMoney) {
                        arrOfArguments.push(pollVoteCostInput)
                      } else if (!costsMoney) {
                        arrOfArguments.push(0)
                      }
                    }
                    arrOfArguments.push(returnMoneyOnCompletionInput)
                  }

                  arrOfArguments.push(pollPrivatePollInput)
                  if(pollPrivatePollInput) {
                    arrOfArguments.push(pollRestrictedVotersArrayInput)
                  } else if(!pollPrivatePollInput) {
                    arrOfArguments.push([])
                  }

                  if(type !== "Ranked") {
                    if(returnMoneyOnCompletionInput) {
                      arrOfArguments.push("0x0000000000000000000000000000000000000000")
                    } else if (!returnMoneyOnCompletionInput) {
                      if(sendFundsToMe) {
                        arrOfArguments.push(account)
                      } else if (!sendFundsToMe) {
                        arrOfArguments.push(pollRecipientInput)
                      }
                      
                    }
                    
                  }
                  talkToContractInteraction(type, true, "createPoll", arrOfArguments, "Creating transaction and sending to network...")
                  clearPollData()
                  changeShowManagedOwnedPolls(true)
                  
                }}>
                  <h1 className="text-center"> Let's Double Check! </h1>

                  <div className="card mb-4 text-center">
                    
                    <p> {"Poll Name: " + pollNameInput} </p>
                    <p> {"Description: " + pollDescriptionInput} </p>
                    <p> {"Selectable Options: " + pollOptionsInput} </p>
                    {type === "Ranked"
                      || <div>
                          <p> {"Maximum amount of votes per voter: " + pollMaxVotesInput} </p>
                          {type === "Regular"
                            ? <div>
                                  {costsMoney
                                    ? <div>
                                        <p>{"Cost per vote in VDA: " + pollVoteCostInput}</p>
                                        {returnMoneyOnCompletionInput
                                          ? <p> {"Return money to voters when poll ends: " + returnMoneyOnCompletionInput} </p>
                                          : <div>
                                              <p> {"Return money to voters when poll ends: " + returnMoneyOnCompletionInput} </p>
                                              {sendFundsToMe
                                                ? <p> {"Recipient of VDA spent on winning option: " + account} </p>
                                                : <p> {"Recipient of VDA spent on winning option: " + pollRecipientInput} </p>
                                              }
                                            </div>

                                        }
                                      </div>
                                    : <p> Cost per vote in VDA: 0 </p>
                                  }
                               </div>
                            : <div>
                                {returnMoneyOnCompletionInput
                                  ? <p> {"Return money to voters when poll ends: " + returnMoneyOnCompletionInput} </p>
                                  : <div>
                                      <p> {"Return money to voters when poll ends: " + returnMoneyOnCompletionInput} </p>
                                      {sendFundsToMe
                                        ? <p> {"Recipient of VDA spent on winning option: " + account} </p>
                                        : <p> {"Recipient of VDA spent on winning option: " + pollRecipientInput} </p>
                                      }
                                    </div>

                                }
                              </div>
                          }
                          
                          

                         </div>

                    }

                    {pollPrivatePollInput
                      ? <div>
                          <p> People allowed to vote in this poll: </p>
                          {pollRestrictedVotersArrayInput.map((address, key) => {
                            return (
                            
                              <li key={key}>{address}</li>

                            )
                          })}
                        </div>
                      : <p> Anyone can vote in this poll. </p>
                    }
                  

                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-block">Create Poll</button>
                  
                  

                </form>

                

                {showManagedOwnedPolls
                  &&<div>
                      <p>&nbsp;</p>
                      <button className="btn btn-primary btn-block" onClick = {() => history.push("/app/owned")}>Managed Owned Polls</button>
                    </div>
                }

                <p>&nbsp;</p>

                <button className="btn btn-primary btn-block" onClick = {() => changePage("More options")}>Back</button>

                <p>&nbsp;</p>
              </div>
            </main>
          </div>
        </div>
       
      )
    }
  }
};

const Getpollinfo = ({ account, contractInteraction, loadSpecificPoll, vote, findCost, accountBalance }) => {

  const history = useHistory()

  const { tempname } = useParams()

  var name1 = tempname.replace(/_question_mark_/g, "?")
  var name = name1.replace(/_hashtag_/g, "#")

  const [poll, changePollData] = React.useState(undefined)

  const refreshData = async (pollName) => {
    let newPollData = await loadSpecificPoll(pollName)
    
    if(newPollData !== undefined && newPollData[1] === true) {
      changePollData(newPollData[0])
    } else if(newPollData[1] === false) {
      changePollData(false)
    }
    
  }

  const [amountofvotesInput, changeAOVI] = React.useState(0)

  const [finalPrice, changeFinalPrice] = React.useState('0')

  const changePrice = async (pollName, thisamountofvotesInput) => {
    changeAOVI(thisamountofvotesInput)

    let finalPrice

    if (poll.type === "Regular") {
      finalPrice = thisamountofvotesInput * poll.cost

    } else if(poll.type === "Quadratic") {

      finalPrice = await findCost(pollName, thisamountofvotesInput)

    } else if (poll.type === "Ranked") {
      finalPrice = 0
    }

    changeFinalPrice(finalPrice.toString())
  }

  const [selectedOptionsArray, changeSelectedOptionsArray] = React.useState([])

  const [selectedOption, changeSelectedOption] = React.useState("Choose an option")
  

    if(poll === undefined) {

      refreshData(name)

      return(

        <div id="loader" className="text-center mt-5">
          <Helmet>
            <title>{name}</title>
            <meta name="description" content={"Info about: '" + name + "'"} />
            
          </Helmet>
          <p>Loading poll...</p>
          <img 
            src={loader} 
            alt="Ballot Box" 
            width="64"
            height="64"
          />
        </div>

      )
    } else if(poll === false) {
      return(

        <div id="loader" className="text-center mt-5">
          <Helmet>
            <title>{name}</title>
            <meta name="description" content={"Info about: '" + name + "'"} />
            
          </Helmet>
          <p className="text-danger">{"The poll '" + name + "' does not exist."}
        </p></div>

      )
    } else if(poll.name == name){

      if(selectedOptionsArray.length < 1) {
        changeSelectedOptionsArray(poll.options)

        changeSelectedOption(poll.options[0])
      }

      return (
        <div className="container-fluid mt-5">
          <Helmet>
            <title>{name}</title>
            <meta name="description" content={"Info about: '" + name + "'"} />
            
          </Helmet>
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>

                <div className="card ml-auto mr-auto text-center text-white bg-dark" style={{ maxWidth: '500px'}}>

                  <p>&nbsp;</p>
                  <p> Elgibility: {poll.eligibility} </p>

                    {poll.canVote

                      && <div>{poll.type === "Ranked"

                        ? <div>

                            <form onSubmit={(event) => {
                              event.preventDefault()
                              const options = selectedOptionsArray
                              const amountofvotes = 0
                              vote(poll, options, amountofvotes)
                              
                            }}>
                            <p>Note: Option 1 is the same as your first option, option 2 is you second option, etc.
                                Order your options based on your favorite option being first, second favorite being second, so on.
                                You are allowed to put the same option for first, second, and so on.
                            </p>

                            <p>&nbsp;</p>

                            <p className="move-right-little float-left"> Order of options: </p>
                            {poll.options.map((option, key) => {
                              
                              let optionNumber = key + 1
                              return (
                                <div key={key} className="move-right-little float-left">
                                  
                                  <DropdownButton 
                                    
                                    title={"Option " + optionNumber + ": " + selectedOptionsArray[key]}
                                    onSelect={(input) => {
                                      var array = selectedOptionsArray.slice()
                                      
                                      array[key] = input.toString()
                                      changeSelectedOptionsArray(array)
                                    }}
                                      >
                                      {poll.options.map((option, key) => {

                                        return (
                                          <Dropdown.Item eventKey={option} key={key}>{option}</Dropdown.Item>
                                        )
                                        
                                      })}
                                  </DropdownButton>
                                </div>
                              )
                            })}
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>

                            <button type="submit" className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px'}} >Cast Vote</button>
                            </form>


                          </div>


                        : <div>
                        
                            <form onSubmit={(event) => {
                              event.preventDefault()
                              const option = selectedOption
                              const amountofvotes = amountofvotesInput
                              vote(poll, option, amountofvotes)
                            }}>
                            <p> Select Option: </p>
                            <DropdownButton
                              
                              title={"Option: " + selectedOption}
                              onSelect={(input) => changeSelectedOption(input)}
                              >
                                {poll.options.map((option, key) => {
                                  return (
                                      <Dropdown.Item eventKey={option} key={key}>{option}</Dropdown.Item>
                                  )
                              
                                })}
                            </DropdownButton>
                            <p>&nbsp;</p>
                            <div className="form-group ml-auto mr-auto" style={{ maxWidth: '200px'}}>
                              <p> Cost for votes (in VDA): {finalPrice} </p>
                              {poll.maxVotes < amountofvotesInput
                                ?<p className="text-danger">Too many votes than allowed</p>
                                : <div>
                                    {finalPrice > accountBalance
                                      &&<div>
                                          <p className="text-danger">Not enough VDA in your account </p>
                                          <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => history.push("/app/manage-vda")}>Purchase VDA</button>
                                          <p>&nbsp;</p>
                                        </div>
                                    }
                                  </div>

                              }
                              <input
                              type="number"
                              onChange={(e) => changePrice(poll.name, e.target.value)}
                              className="form-control"
                              placeholder= {"Maximum Votes: " + poll.maxVotes}
                              required />
                            </div>

                              

                            
                        
                            <button type="submit" className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} >Cast Vote</button>
                            </form>
                          </div>
                      }
                      </div>
                    }
                  <p>&nbsp;</p>
                </div>

                <p>&nbsp;</p>

                <div className=" card mb-4 bg-dark text-white text-center" >
                  <p>&nbsp;</p>
                  <p> {"Name: " + poll.name} </p>
                  <p> Owner: <a href={"https://etherscan.io/address/" + poll.owner}>{poll.owner}</a></p>
                  <p> {"Type: " + poll.type}
                    <button className="btn btn-link btn-sm pt-0" onClick = {() => history.push("/polldesc")}>What's this?</button>
                  </p>
                  <p> {"Options: " + poll.displayOptions} </p>
                  
                  {poll.type === "Ranked"
                    || <div>

                      <p> {"Maximum Votes: " + poll.maxVotes} </p>

                      {poll.type === "Regular"
                        && <div>
                            <p> {"Vote Cost: " + poll.cost} </p>
                            </div>
                      }

                    </div>

                  }
                  
                  {poll.previousVotes.length > 0
                    && <div>
                      {poll.type === "Ranked"
                        ? <p> {"Order of options you voted for: " + poll.previousVotes} </p>

                        : <div>
                          
                            <div className="card mb-4 bg-dark  ml-auto mr-auto" style={{ maxWidth: '400px' }} >
                                <div className="card-header">
                                  <p> Your votes: </p>
                                </div>


                            {poll.previousVotes.map((previousOptionVotes, key) => {

                            let option = poll.options[key]

                            return (
                              <div key={key} className="ml-auto mr-auto">
                                <p>{option + ": " + previousOptionVotes}</p>
                              </div>
                            )

                            })}
                            </div>
                        
                          </div>

                      }
                    </div>
                  }

                  {poll.type === "Ranked"
                    ?<div className="table-wrapper text-center ml-auto mr-auto">
                      <table>
                        <thead>
                          <tr>
                            <th>Place</th>
                            {poll.options.map((option, key) => {

                              let newKey = key + 1

                              return(
                                <th key={key}>{newKey}</th>
                              )
                              
                            })}
                          </tr>
                        </thead>
                        <tbody>
                        
                          {poll.options.map((option, key) => {

                            let specificVotes = poll.currentResults[key].split(",")

                            return(
                              <tr key={key}>
                                <td>{option}</td>

                                {specificVotes.map((specificOptionsVotes, key) => {
                                   
                                  return(
                                    <td key={key}>{specificOptionsVotes}</td>
                                  )
                                  
                                })}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                      <p>&nbsp;</p>
                    </div>

                    :<div>
                      {poll.currentResults.length > 0
                        && <div>
                              <div className="card mb-4 bg-dark ml-auto mr-auto" style={{ maxWidth: '400px' }} >
                                <div className="card-header">
                                  <p> Total votes: </p>
                                </div>

                                {poll.currentResults.map((specificOptionVotes, key) => {

                                  let option = poll.options[key]

                                  return (
                                    <div key={key} className="ml-auto mr-auto">
                                      <p>{option + ": " + specificOptionVotes}</p>
                                    </div>
                                  )

                                })}
                              </div>
                          </div>
                      }
                    </div>
                  }
                    

                  <p> {"Status: " + 
                  (poll.open
                    ? "Open"
                    : "Closed")
                  } 
                  </p>


                  {poll.type === "Ranked"
                    || <div>
                        {poll.type==="Regular"
                          ? <div>
                              {poll.cost > 0
                                && <div> 
                                    {poll.returnMoneyOnCompletion
                                      ?<p> All money spent can be retrieved by voters after completion of the poll. </p>
                                      :<div>
                                        <p className="mr-auto ml-auto" style={{ maxWidth: '500px'}}> Only money spent on the winning option will be sent to the poll's recipient address.
                                           The rest can be retrieved after the poll is over.
                                        </p>
                                        <p> Poll's recipient address:  
                                          <a href={"https://etherscan.io/address/" + poll.recipient}>{" " + poll.recipient}</a> 
                                        </p>  
                                      </div>
                                    }
                                  </div>
                              }
                            </div>
                          : <div>
                              {poll.returnMoneyOnCompletion
                                ?<p> All money spent can be retrieved by voters after completion of the poll. </p>
                                :<div>
                                  <p className="mr-auto ml-auto" style={{ maxWidth: '500px'}}> Only money spent on the winning option will be sent to the poll's recipient address.
                                     The rest can be retrieved after the poll is over.
                                  </p>
                                  <p> Poll's recipient address:  
                                    <a href={"https://etherscan.io/address/" + poll.recipient}>{" " + poll.recipient}</a> 
                                  </p>
                                </div>

                              }
                            </div>
                        }
                      </div>
                  }

                  {poll.open
                    ? <p> {"Current Winner(s): " + poll.winner} </p>
                    : <p> {"Final Winner(s): " + poll.winner} </p>
                  }
                  
                   {poll.owner === account
                      && poll.open
                        
                        && <div>
                            <p className="text-center "> Owner Controls </p>
                            <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => contractInteraction
                              (poll.typeState, true, "endPoll", [poll.name], "Creating transaction and sending to network...")
                            }>End Poll</button>

                          </div>
                    }

                    {poll.participated
                      ? poll.open
                        ? null

                        : poll.moneyOwed > 0
                          ? <div>
                              <p className="text-center">Poll has ended. You can reclaim {poll.moneyOwed} token(s).</p> 
                              <button className="btn btn-primary btn-block text-center ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => contractInteraction
                                (poll.typeState, true, "getYourMoney", [poll.name], "Creating transaction and sending to network...")
                              }>Get Money</button>
                            </div>
                          : null
                      : null
                    }
                    <p>&nbsp;</p>
                </div>

                <p>&nbsp;</p>
                <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '400px' }} onClick = {() => history.goBack()}>Back</button>
                <p>&nbsp;</p>

              </div>
            </main>
          </div>
        </div>
      )
    }
}
