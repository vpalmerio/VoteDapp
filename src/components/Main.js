import React from 'react'

import { Route, Routes } from "react-router-dom"

import AppHome from '../pages/AppHome'
import Explore from '../pages/Explore'
import ChoosePollType from '../pages/ChoosePollType'
import CreatePoll from './CreatePoll'
import AppWrongPage from '../pages/AppWrongPage'
import GetPollInfo from '../pages/GetPollInfo'
import DisplayPolls from '../pages/DisplayPolls'
import ManageVDA from '../pages/ManageVDA'

import Navbar from './Navbar'

import * as c from './Constants'

/*
 * This component is used by App.js to render the main content of the app. 
 * It contains the routing for different pages of the app as well as the Navbar component for the whole app.
 */

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
                <ManageVDA
                  accountBalance={props.accountBalance}
                  tokenPrice={props.tokenPrice}
                  contractInteraction={props.contractInteraction}
                  buyToken={props.buyToken}
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
                <AppWrongPage/>
              } />
              </Routes>
            </main>
          </div>
       
      );
}