import React from 'react'

import { useNavigate, useParams } from "react-router-dom"
import {Helmet} from "react-helmet"

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import AppPage from '../components/AppPage'
import Button from '../components/Button'
import ReturnMoneyInfo from '../components/ReturnMoneyInfo'
import DisplayVotes from '../components/DisplayVotes'
import BackButton from '../components/BackButton'

import loader from '../media/loader.png'

import * as c from '../components/Constants'


export default function Getpollinfo ({ account, contractInteraction, loadSpecificPoll, vote, findCost, accountBalance }) {

    const navigate = useNavigate()
  
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
  
      if (poll.type === c.REGULAR_POLL_TYPE) {
        finalPrice = thisamountofvotesInput * Number(poll.cost)
  
      } else if(poll.type === c.QUADRATIC_POLL_TYPE) {
  
        finalPrice = await findCost(pollName, thisamountofvotesInput)
  
      } else if (poll.type === c.RANKED_POLL_TYPE) {
        finalPrice = 0
      }
  
      changeFinalPrice(finalPrice.toString())
    }
  
    const [selectedOptionsArray, changeSelectedOptionsArray] = React.useState([])
  
    const [selectedOption, changeSelectedOption] = React.useState("Choose an option")
    
    console.log(poll)
  
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
          <AppPage
            title={name}
            description={"Info about: '" + name + "'"}
            maxWidth='800px'
          >
            <p>&nbsp;</p>
  
            <div className='center-content'>
              <div className="card col-6 text-center text-white bg-dark" style={{ maxWidth: '500px'}}>
  
                <p>&nbsp;</p>
                <p> Elgibility: {poll.eligibility} </p>
  
                  {poll.canVote
  
                    && <div>{poll.type === c.RANKED_POLL_TYPE
  
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
                          <Button buttonType='submit' buttonText='Cast Vote'></Button>
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
                          <div className='center-content'>
                            <div className="form-group" style={{ maxWidth: '200px'}}>
                              <p> Cost for votes (in VDA): {finalPrice} </p>
                              {poll.maxVotes < amountofvotesInput
                                ?<p className="text-danger">Too many votes than allowed</p>
                                : <div>
                                    {finalPrice > accountBalance
                                      &&<div>
                                          <p className="text-danger">Not enough VDA in your account </p>
                                          <Button text='Purchase VDA' path={c.MANAGE_VDA_LINK}></Button>
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
                          </div>
                          <p>&nbsp;</p>
                          <Button buttonType='submit' text='Cast Vote'></Button>
                          </form>
                        </div>
                    }
                    </div>
                  }
                <p>&nbsp;</p>
              </div>
            </div>
  
            <p>&nbsp;</p>
  
            <div className="card mb-4 bg-dark text-white text-center" >
              <p>&nbsp;</p>
              <p> {"Name: " + poll.name} </p>
              <p> Owner: <a href={"https://etherscan.io/address/" + poll.owner}>{poll.owner}</a></p>
              <p> {"Type: " + poll.type}
                <button className="btn btn-link btn-sm pt-0" onClick = {() => navigate("/polldesc")}>What's this?</button>
              </p>
              <p> {"Options: " + poll.displayOptions} </p>
              
              {poll.type === c.RANKED_POLL_TYPE
                || <div>
  
                  <p> {"Maximum Votes: " + poll.maxVotes} </p>
  
                  {poll.type === c.REGULAR_POLL_TYPE
                    && <div>
                        <p> {"Vote Cost: " + poll.cost} </p>
                        </div>
                  }
  
                </div>
  
              }
              
              {poll.previousVotes.length > 0
                && <div>
                  {poll.type === c.RANKED_POLL_TYPE
                    ? <p> {"Order of options you voted for: " + poll.previousVotes} </p>
  
                    : <DisplayVotes
                      votes={poll.previousVotes}
                      options={poll.options}
                    ></DisplayVotes>
  
                  }
                </div>
              }
  
              {poll.type === c.RANKED_POLL_TYPE
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
                    && <DisplayVotes
                      votes={poll.currentResults}
                      options={poll.options}
                    ></DisplayVotes>
                  }
                </div>
              } 
  
              <p> {"Status: " + 
              (poll.open
                ? "Open"
                : "Closed")
              } 
              </p>
  
              {poll.type === c.RANKED_POLL_TYPE
                || <div>
                    {poll.type===c.REGULAR_POLL_TYPE
                      ? <div>
                          {poll.cost > 0
                            && <ReturnMoneyInfo 
                              returnMoneyOnCompletion={poll.returnMoneyOnCompletion}
                              recipient={poll.recipient}
                            ></ReturnMoneyInfo>
                          }
                        </div>
                      : <ReturnMoneyInfo 
                        returnMoneyOnCompletion={poll.returnMoneyOnCompletion}
                        recipient={poll.recipient}
                      ></ReturnMoneyInfo>
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
                        <Button text='End Poll' onClick = {() => contractInteraction
                          (poll.typeState, true, "endPoll", [poll.name], "Creating transaction and sending to network...")
                        }>End Poll</Button>
  
                      </div>
                }
  
                {poll.participated
                  ? poll.open
                    ? null
  
                    : poll.moneyOwed > 0
                      ? <div>
                          <p className="text-center">Poll has ended. You can reclaim {poll.moneyOwed} token(s).</p> 
                          <Button text='Get Money' style={{ maxWidth: '200px' }} onClick = {() => contractInteraction
                            (poll.typeState, true, "getYourMoney", [poll.name], "Creating transaction and sending to network...")
                          }></Button>
                        </div>
                      : null
                  : null
                }
                <p>&nbsp;</p>
            </div>
  
            <p>&nbsp;</p>
            <BackButton></BackButton>
            <p>&nbsp;</p>
          </AppPage>
        )
      }
  }