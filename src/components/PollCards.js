
import Button from './Button'
import Jdenticon from './Jdenticon.js'

import * as c from './Constants'

export default function PollCards({ pollArray, contractInteraction}) {
    return (
        <>
            {pollArray.map((poll, key) => {

                var speciallink1 = poll.name.replace(/\?/g, "_question_mark_");
                var speciallink = speciallink1.replace(/\#/g, "_hashtag_");

                return(
                <div key={key}>
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
                                <Button text="More Info" path={c.POLL_LINK + "/" + speciallink}></Button>

                                {poll.open
                                || <div>
                                    {poll.moneyOwed > 0
                                        && <Button text="Retrieve Spent Tokens" onClick = {() => 
                                                contractInteraction(
                                                    poll.typeState, true, "getYourMoney", [poll.name], 
                                                    "Creating transaction and sending to network..."
                                                )}
                                            ></Button>
                                    }
                                    </div>
                                }
                            </li>

                            <li className="list-group-item py-2 bg-dark">
                                <small className="text-white">
                                    <Jdenticon size="30" value={poll.owner} />
                                    <span></span>
                                    {poll.owner}
                                </small>
                            </li>
                        </ul>
                    </div>
                </div>
                )}
            )}
        </>
    )
}