import AppPage from "../components/AppPage"
import Button from "../components/Button"

import * as c from "../components/Constants"

/*
 * This page is part of the poll creation process. It is the final page where the user can review the 
 * details of the poll they are about to create. It is used in CreatePoll.js
 */

export default function PollCompletion({ 
    pollName, pollDescription, pollOptions, pollMaxVotesInput, pollVoteCostInput, 
    returnMoneyOnCompletionInput, pollPrivatePollInput, pollRestrictedVotersArrayInput, 
    pollRecipientInput, costsMoney, sendFundsToMe, account, type, talkToContractInteraction, 
    clearPollData, changeShowManagedOwnedPolls, showManagedOwnedPolls, changePage 
}) {
    return (

        <AppPage
            title="Finalize the Poll"
            description="Complete the creation of your poll"
        >
            <p>&nbsp;</p>
            <form onSubmit={(event) => {
                event.preventDefault()
                let arrOfArguments = []

                arrOfArguments.push(pollName)
                arrOfArguments.push(pollDescription)
                arrOfArguments.push(pollOptions)
                
                if (type !== c.RANKED_POLL_TYPE) {

                    arrOfArguments.push(pollMaxVotesInput)

                if (type === c.REGULAR_POLL_TYPE) {

                    if(costsMoney) {
                        arrOfArguments.push(pollVoteCostInput)
                    } else if (!costsMoney) {
                        arrOfArguments.push(0)
                    }
                }
                    arrOfArguments.push(returnMoneyOnCompletionInput)
                }

                arrOfArguments.push(pollPrivatePollInput)
                
                if (pollPrivatePollInput) {
                    arrOfArguments.push(pollRestrictedVotersArrayInput)
                } else if (!pollPrivatePollInput) {
                    arrOfArguments.push([])
                }

                if (type !== c.RANKED_POLL_TYPE) {
                    if (returnMoneyOnCompletionInput) {
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
                
                <p> {"Poll Name: " + pollName} </p>
                <p> {"Description: " + pollDescription} </p>
                <p> {"Selectable Options: " + pollOptions} </p>
                {type === c.RANKED_POLL_TYPE
                    || <div>
                        <p> {"Maximum amount of votes per voter: " + pollMaxVotesInput} </p>
                        {type === c.REGULAR_POLL_TYPE
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
                <Button buttonType='submit' text="Create Poll"></Button>
            </form>

            {showManagedOwnedPolls
                &&<div>
                    <p>&nbsp;</p>
                    <Button path={c.OWNED_POLLS_LINK} text="Managed Owned Polls"></Button>
                </div>
            }

            <p>&nbsp;</p>

            <Button text="Back" onClick = {() => changePage(c.CREATE_POLL_FEATURES)}></Button>

            <p>&nbsp;</p>

        </AppPage>
    )
}