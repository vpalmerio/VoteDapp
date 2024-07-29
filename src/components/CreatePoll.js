import React from 'react';

import PollName from '../pages/PollName'
import PollDesc from '../pages/PollDesc'
import PollOptions from '../pages/PollOptions'
import PollFeatures from '../pages/PollFeatures'
import PollCompletion from '../pages/PollCompletion'

import WrongPage from '../pages/AppWrongPage'
import * as c from './Constants'

import { useParams } from "react-router-dom"

/*
 * This component handles the creation of a poll. 
 * It is used to navigate between the different "pages" of the poll creation process, and 
 * keeps track of the user's input when moving between pages.
 */

export default function CreatePoll ({ contractInteraction, isAddress, account, clearPollData }) {

    const { type } = useParams()
  
    const talkToContractInteraction = async (typeState, sendBool, functionName, argumentArray, loadingDescription) => {
      let returndata = await contractInteraction(typeState, sendBool, functionName, argumentArray, loadingDescription)
      return returndata
    }
  
    const [page, changePage] = React.useState("Name")
  
    const [pollName, changePollName] = React.useState("")
  
    const [pollDescription, changePollDescription] = React.useState("")
  
    const [pollOptions, changePollOptions] = React.useState([])
  
    const [pollPrivatePollInput, privatePollBool] = React.useState(false)
    const [pollRestrictedVotersArrayInput, changeRestrictedVotersArray] = React.useState([])
  
    const [pollMaxVotesInput, changePollMaxVotesInput] = React.useState(1)
  
    const [costsMoney, costsMoneyBool] = React.useState(false)
    const [pollRecipientInput, changePollRecipientInput] = React.useState(account)
    const [pollVoteCostInput, changeVoteCostInput] = React.useState(0)
    const [returnMoneyOnCompletionInput, changeRMOCI] = React.useState(true)
    const [sendFundsToMe, changeSendFundsToMe] = React.useState(true)
  
    const [showManagedOwnedPolls, changeShowManagedOwnedPolls] = React.useState(false)
  
    if(sendFundsToMe) {
      if(pollRecipientInput !== account) {
        changePollRecipientInput(account)
      }
    }
  
    if(type !== c.REGULAR_POLL_TYPE && type !== c.QUADRATIC_POLL_TYPE && type !== c.RANKED_POLL_TYPE) {
      return (
  
        <WrongPage />
  
      )
    } else {
    
      if(page === c.CREATE_POLL_NAME) {
        return (
          <PollName 
            pollName={pollName}
            changePollName={changePollName}
            changePage={changePage}
            talkToContractInteraction={talkToContractInteraction}
          ></PollName>
        )
      } else if(page === c.CREATE_POLL_DESC) {
        return (
          <PollDesc
            changePage={changePage}
            changePollDescription={changePollDescription}
            pollDescription={pollDescription}
          ></PollDesc>
        )
      } else if(page === c.CREATE_POLL_OPTIONS) {
  
        return (
          <PollOptions
            changePage={changePage}
            changePollOptions={changePollOptions}
            pollOptions={pollOptions}
          ></PollOptions>
          
        )
      } else if(page === c.CREATE_POLL_FEATURES) {
  
        let tempAddressStorage
  
        return (
          <PollFeatures
            type={type}
            changePage={changePage}
            pollMaxVotesInput={pollMaxVotesInput}
            changePollMaxVotesInput={changePollMaxVotesInput}
            costsMoney={costsMoney}
            costsMoneyBool={costsMoneyBool}
            pollVoteCostInput={pollVoteCostInput}
            changeVoteCostInput={changeVoteCostInput}
            returnMoneyOnCompletionInput={returnMoneyOnCompletionInput}
            changeRMOCI={changeRMOCI}
            pollRecipientInput={pollRecipientInput}
            changePollRecipientInput={changePollRecipientInput}
            sendFundsToMe={sendFundsToMe}
            changeSendFundsToMe={changeSendFundsToMe}
            pollPrivatePollInput={pollPrivatePollInput}
            privatePollBool={privatePollBool}
            tempAddressStorage={tempAddressStorage}
            changeRestrictedVotersArray={changeRestrictedVotersArray}
            pollRestrictedVotersArrayInput={pollRestrictedVotersArrayInput}
            isAddress={isAddress}
            account={account}
          ></PollFeatures>
        )
      } else if(page === c.CREATE_POLL_COMPLETION) {
        return (
         <PollCompletion
          pollName={pollName}
          pollDescription={pollDescription}
          pollOptions={pollOptions}
          pollPrivatePollInput={pollPrivatePollInput}
          pollRestrictedVotersArrayInput={pollRestrictedVotersArrayInput}
          pollMaxVotesInput={pollMaxVotesInput}
          costsMoney={costsMoney}
          pollVoteCostInput={pollVoteCostInput}
          returnMoneyOnCompletionInput={returnMoneyOnCompletionInput}
          pollRecipientInput={pollRecipientInput}
          sendFundsToMe={sendFundsToMe}
          contractInteraction={contractInteraction}
          changeShowManagedOwnedPolls={changeShowManagedOwnedPolls}
          showManagedOwnedPolls={showManagedOwnedPolls}
          clearPollData={clearPollData}
          changePage={changePage}
          talkToContractInteraction={talkToContractInteraction}
          account={account}
          type={type}
         ></PollCompletion>
        )
      } else {
        return (
          <WrongPage />
        )
      }
    }
  };