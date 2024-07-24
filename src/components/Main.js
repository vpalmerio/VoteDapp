import React from 'react'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import AppHome from '../pages/AppHome'
import Explore from '../pages/Explore'
import ChoosePollType from '../pages/ChoosePollType'
import CreatePoll from './CreatePoll'
import WrongPage from '../pages/WrongPage'
import GetPollInfo from '../pages/GetPollInfo'
import DisplayPolls from '../pages/DisplayPolls'

import AppPage from './AppPage'
import Navbar from './Navbar'
import Button from './Button'
import ballotbox from '../media/ballotbox.png'
import Jdenticon from './Jdenticon.js'
import ReturnMoneyInfo from './ReturnMoneyInfo'
import DisplayVotes from './DisplayVotes'
import PollCards from './PollCards'
import LoadScreen from './LoadScreen'

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
                <AppHome
                  contractInteraction={props.contractInteraction}
                  getRecentPolls={props.getRecentPolls}
                  homePagePolls={props.homePagePolls}
                /> 
              } />

              <Route path={c.OWNED_POLLS_LINK} element = {
                <DisplayPolls
                  pollNames={props.pollNames}
                  polls={props.polls}
                  contractInteraction={props.contractInteraction}
                  loadPollData={props.loadPollData}
                  pollProperty={"owned"}
                  pageTitle="Owned Polls"
                  pageDescription="Review the polls you created here!"
                  noPollDescription="You have not created any polls"
                  pollsExistDescription="Polls You Created"
                />
              } />

              <Route path={c.PARTICIPATED_POLLS_LINK} element = {
                <DisplayPolls
                  pollNames={props.pollNames}
                  polls={props.polls}
                  contractInteraction={props.contractInteraction}
                  loadPollData={props.loadPollData}
                  pollProperty={"participated"}
                  pageTitle="Polls You Participated In"
                  pageDescription="Review the polls that you participated in!"
                  noPollDescription="You have not participated in any polls"
                  pollsExistDescription="Polls You Participated In"
                />
              } />

              <Route path={c.EXPLORE_LINK} element = {
                <Explore
                  pollNames={props.pollNames}
                  searchPolls={props.searchPolls}
                  setPollNames={props.setPollNames}
                  contractInteraction={props.contractInteraction}
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