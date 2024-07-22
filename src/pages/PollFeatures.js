import React from 'react';

import AppPage from '../components/AppPage'
import Button from '../components/Button'
import ReturnMoneyWeb from '../components/ReturnMoneyWeb';

import * as c from '../components/Constants'

export default function PollFeatures({ 
    type, costsMoney, costsMoneyBool, pollVoteCostInput, changeVoteCostInput, 
    returnMoneyOnCompletionInput, changeRMOCI, pollRecipientInput, changePollRecipientInput, 
    sendFundsToMe, changeSendFundsToMe, pollPrivatePollInput, privatePollBool, 
    pollRestrictedVotersArrayInput, changeRestrictedVotersArray, changePage, 
    pollMaxVotesInput, changePollMaxVotesInput, account, isAddress
}) {
   
    let tempAddressStorage

    return (
        <AppPage
          title="More Features"
          description="Select more features for your poll"
        >
          <p>&nbsp;</p>
          <div className="text-center">
            <h1> More Features </h1>
            <p> Charge money for votes (regular and quadratic only) and/or only allow certain people to vote </p>
          </div>

          {type === c.REGULAR_POLL_TYPE
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
                        <ReturnMoneyWeb
                            account={account}
                            returnMoneyOnCompletionInput={returnMoneyOnCompletionInput}
                            changeRMOCI={changeRMOCI}
                            pollRecipientInput={pollRecipientInput}
                            changePollRecipientInput={changePollRecipientInput}
                            sendFundsToMe={sendFundsToMe}
                            changeSendFundsToMe={changeSendFundsToMe}
                        ></ReturnMoneyWeb>
                    </div>
                }
            </div>
          }

          {type === c.QUADRATIC_POLL_TYPE
          && <div>
              <div className="form-group mr-sm-2 text-center">
                <label> Maximum amount of votes for each voter </label>
                <input
                  type="number"
                  onChange={(input) => {
                    changePollMaxVotesInput(input.target.value)
                  }}
                  className="form-control"
                  value={pollMaxVotesInput}
                  required 
                />
              </div>
              <ReturnMoneyWeb
                account={account}
                returnMoneyOnCompletionInput={returnMoneyOnCompletionInput}
                changeRMOCI={changeRMOCI}
                pollRecipientInput={pollRecipientInput}
                changePollRecipientInput={changePollRecipientInput}
                sendFundsToMe={sendFundsToMe}
                changeSendFundsToMe={changeSendFundsToMe}
              ></ReturnMoneyWeb>
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
                    if(temparr.length === 0) {
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
                        onChange={(input) => {tempAddressStorage = input.target.value}}
                        className="form-control"
                        placeholder="Allowed voters separated by comma and space (ex. 0x01, 0x02, 0x03)"
                        required />
                    </div>
                    <p></p>
                    <Button buttonType="submit" text="Add Addresses"></Button>
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

            <Button text="Next" onClick = {() => {

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
                            changePage(c.CREATE_POLL_COMPLETION)
                          }
                      } else {
                          changePage(c.CREATE_POLL_COMPLETION)
                      }
                    }
                }
            
            }}></Button>

            <p>&nbsp;</p>

            <Button text="Back" onClick = {() => changePage(c.CREATE_POLL_OPTIONS)}>Back</Button>

            <p>&nbsp;</p>

        </AppPage>
    )
}