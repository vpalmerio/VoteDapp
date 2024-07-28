import React from 'react';

import AppPage from '../components/AppPage'
import LoadScreen from '../components/LoadScreen'
import PollCards from '../components/PollCards'

export default function DisplayPolls ({ 
    pollNames, polls, contractInteraction, loadPollData, 
    pollProperty, pageTitle, pageDescription,
    noPollDescription, pollsExistDescription 
}) {
  
    /* Workaround is used to update state because react doesn't detect changes in arrays */
    const [loadedPolls, changeLoadedPolls] = React.useState(false)
    const [pollArray, changePollArray] = React.useState([])
  
    if (polls !== null && polls.length !== 0 && 
      pollArray.length === 0 && loadedPolls === false
    ) {
      var array = []
      for(let i = 0; i < pollNames.length; i++) {
        let poll = polls.get(pollNames[i])
        if(poll[pollProperty] === true) {
          array.push(poll)
        }
      }
      changePollArray(array)
      changeLoadedPolls(true)
    }
     
    if(polls===null) {
      loadPollData()
      return (
        <LoadScreen
          name = {pageTitle}
          description = {pageDescription}
          text = "Loading polls..."
        ></LoadScreen>
      )
    } else {
  
      return (
        <AppPage
          title= {pageTitle}
          description={pageDescription}
          maxWidth='800px'
        >
          {pollArray.length > 0
            ? <div>
                <div className="text-center">
                  <p>&nbsp;</p>
                  <p>{pollsExistDescription}</p>
                </div>
                <PollCards
                  pollArray={pollArray}
                  contractInteraction={contractInteraction}
                  maxWidth='500px'
                ></PollCards>
              </div>
            : <p className="text-center">{noPollDescription}</p>
          }
          <p>&nbsp;</p>
        </AppPage>
      )
    }
};