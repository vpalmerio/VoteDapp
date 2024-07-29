import React from 'react'

import AppPage from '../components/AppPage'
import PollCards from '../components/PollCards'
import loader from '../media/loader.png'
import BackButton from '../components/BackButton'

/*
 * This page is used for people to explore different polls on the platform. 
 * It has a search function as well as a randomize function.
 * This component is used in Main.js
 */

export default function Explore ({ searchPolls, setPollNames, contractInteraction }) {

    const [pollNames, changePollNames] = React.useState([])
  
    const [searchTerm, changeSearchTerm] = React.useState("")
  
    const [searchedPollData, changeSearchedPollData] = React.useState([])
  
    const [loading, changeLoading] = React.useState(false)
  
    //Used to ensure that the page is reloaded when the shuffle button is clicked
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
        <AppPage
          title="Explore"
          description="Explore polls that others have created!"
        >
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
          <BackButton></BackButton>
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
  
          <PollCards
            pollArray={searchedPollData}
            contractInteraction={contractInteraction}
            maxWidth='500px'
          ></PollCards>
      </AppPage>
    )
  }