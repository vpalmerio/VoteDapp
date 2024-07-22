import React from 'react'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import ChoosePollType from '../pages/ChoosePollType'
import CreatePoll from './CreatePoll'
import WrongPage from '../pages/WrongPage'
import GetPollInfo from '../pages/GetPollInfo'

import AppPage from './AppPage'
import Navbar from './Navbar'
import Button from './Button'
import ballotbox from '../media/ballotbox2.png'
import Jdenticon from './Jdenticon.js'
import ReturnMoneyInfo from './ReturnMoneyInfo'
import DisplayVotes from './DisplayVotes'

import {Helmet} from "react-helmet"

import loader from '../media/loader.png'

import * as c from './Constants'
import BackButton from './BackButton'

export default function Main(props) { 

      return (
        
          <div>
            <main>
            <Navbar account={props.account} accountBalance={props.accountBalance} loadingBlockchain={props.loadingBlockchain} />
            <Routes>
              <Route path={c.APP_LINK} element = {
                <Apphome
                  contractInteraction={props.contractInteraction}
                  getRecentPolls={props.getRecentPolls}
                  homePagePolls={props.homePagePolls}
                /> 
              } />

              <Route path={c.OWNED_POLLS_LINK} element = {
                <Ownedpolls
                  pollNames={props.pollNames}
                  polls={props.polls}
                  contractInteraction={props.contractInteraction}
                  loadPollData={props.loadPollData}
                />
              } />

              <Route path={c.PARTICIPATED_POLLS_LINK} element = {
                <Participatedpolls
                  pollNames={props.pollNames}
                  polls={props.polls}
                  contractInteraction={props.contractInteraction}
                  loadPollData={props.loadPollData}
                />
              } />

              <Route path={c.EXPLORE_LINK} element = {
                <Explore
                  pollNames={props.pollNames}
                  searchPolls={props.searchPolls}
                  setPollNames={props.setPollNames}
                />
              } />

              <Route path={c.MANAGE_VDA_LINK} element = {
                <Managingvda
                  accountBalance={props.accountBalance}
                  tokenPrice={props.tokenPrice}
                  contractInteraction={props.contractInteraction}
                  buyToken={props.buyToken}
                  isAddress={props.isAddress}
                />
              } />

              <Route path={c.CHOOSE_POLL_TYPE_LINK} element = {
                <ChoosePollType/>
              } />

              <Route path={c.CREATE_POLL_TYPE_LINK + "/:type"} element = {
                <CreatePoll
                  contractInteraction={props.contractInteraction}
                  isAddress={props.isAddress}
                  account={props.account}
                  clearPollData={props.clearPollData}
              />
              } />

              <Route path={c.POLL_LINK + "/:tempname"} element = {
                <GetPollInfo
                  account={props.account}
                  contractInteraction={props.contractInteraction}
                  loadSpecificPoll={props.loadSpecificPoll}
                  vote={props.vote}
                  findCost={props.findCost}
                  accountBalance={props.accountBalance}
                />
              } />

              <Route path="*" element = {
                <WrongPage/>
              } />
              </Routes>
            </main>
          </div>
       
      );
}

const Apphome = ({ contractInteraction, getRecentPolls, homePagePolls }) => {
  
  const navigate = useNavigate()

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
    <div className="center-content">
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
            <div className='center-content'>
            <button className="btn btn-primary btn-block mr-auto ml-auto" style={{ maxWidth: '550px' }} onClick = {() => navigate("/app/choose-poll-type")}>Create Poll</button>
            </div>
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
                  <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => navigate("/app/polls/" + speciallink)}>More Info</button>
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
  
  const navigate = useNavigate()

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
    <div className="center-content">
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
                    <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => navigate("/app/polls/" + speciallink)}>More Info</button>


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
  
  const navigate = useNavigate()

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
    <div className="center-content">
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
                    <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => navigate("/app/polls/" + speciallink)}>More Info</button>


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

  const navigate = useNavigate()

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
        <div className="center-content">
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
              <div className='center-content'>
                <button className="btn btn-primary btn-block w-100" style={{ maxWidth: '500px' }} onClick = {() => {
                  //fails to update state if used twice
                  shuffle(pollNames)
                  //workaround
                  changeWorkAround(!workaround)
                }}>Randomize</button>
              </div>

              <p>&nbsp;</p>

              <div className='center-content'>
                <button className="btn btn-primary btn-block"  style={{ maxWidth: '480px' }} onClick = {() => navigate(-1)}>Back</button>
              </div>
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
                      <button className="btn btn-primary btn-block ml-auto mr-auto" style={{ maxWidth: '200px' }} onClick = {() => navigate("/app/polls/" + speciallink)}>More Info</button>
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
  
  const navigate = useNavigate()

  const [amountoftokensInput, changeAOTI] = React.useState(0)

  let tempFinalPrice = tokenPrice * amountoftokensInput

  return (

    <div className="container-fluid mt-5">
      <Helmet>
        <title>Manage your VDA</title>
        <meta name="description" content="Purchase VDA tokens here!" />
      </Helmet>
      <div className="center-content">
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
                <div className='center-content mt-4'>
                  <button type="submit" className="btn btn-primary btn-block">Buy Tokens</button>
                </div>
              </form>
            <p>&nbsp;</p>
            <div className='center-content'>
              <button className="btn btn-primary btn-block" onClick = {() => navigate(-1)}>Back</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
};