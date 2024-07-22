import React from 'react';

import AppPage from '../components/AppPage'
import LoadScreen from '../components/LoadScreen'
import PollCards from '../components/PollCards'

export default function Participatedpolls ({ pollNames, polls, contractInteraction, loadPollData }) {
  
    const [hasParticipated, changeHasParticipated] = React.useState(false)
    const [workaround, changeWorkAround] = React.useState(false)
    const [pollArray, changePollArray] = React.useState([])
  
    if (polls !== null && polls.length !== 0 && pollArray.length === 0) {
      var array = []
      for(let i = 0; i < pollNames.length; i++) {
        let poll = polls.get(pollNames[i])
        if(poll.participated === true) {
          array.push(poll)
          if (!hasParticipated) {
            changeHasParticipated(true)
          }
        }
      }
      changePollArray(array)
      changeWorkAround(!workaround)
    }
     
    if(polls===null) {
      loadPollData()
      return (
        <LoadScreen
          name = "Polls You Participated In"
          description = "Review the polls that you participated in!"
          text = "Loading polls..."
        ></LoadScreen>
      )
    } else {
  
      return (
        <AppPage
          title='Polls You Participated In'
          description='Review the polls that you participated in!'
          maxWidth='800px'
        >
          {hasParticipated
            ? <div>
                <div className="text-center">
                  <p>&nbsp;</p>
                  <p className="">Polls You Participated In</p>
                </div>
                <PollCards
                  pollArray={pollArray}
                  contractInteraction={contractInteraction}
                  maxWidth='500px'
                ></PollCards>
              </div>
            : <p className="text-center">You have not participated in any polls</p>
          }
          <p>&nbsp;</p>
        </AppPage>
      )
    }
};