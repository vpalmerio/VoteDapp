import React from 'react';

import AppPage from './AppPage'
import Button from './Button'
import BackButton from './BackButton'

import * as c from './Constants'

export default function PollName({ pollName, changePollName, changePage, talkToContractInteraction}) {

    const [pollNameInput, changePollNameInput] = React.useState(pollName)
    const [nameTaken, changeNameTaken] = React.useState(false)

    const nextPage = () => {
        changePollName(pollNameInput)
        changePage(c.CREATE_POLL_DESC)
    }

    return (
        <AppPage
        title="Create a poll!"
        description="Create your own customizable poll here!"
        >
            <p>&nbsp;</p>
            <div className="text-center style={{ maxWidth: '400px' }}">
                <p>&nbsp;</p>
                <h1> Your Poll's Name </h1>
                <p> What's the main idea? Short words are better. </p>

                {nameTaken
                    && <p className="text-left text-danger"> This poll name has already been taken. </p>
                }
                <div className="mr-sm-2">
                
                    {nameTaken
                    ?<input
                        type="text"
                        onChange={(input) => {
                            talkToContractInteraction("Storage", false, "pollNameExists", [input.target.value], "Loading...").then((result) => {
                                if (result !== nameTaken) {
                                    changeNameTaken(result)
                                }
                            })
                            changePollNameInput(input.target.value)
                        }}
                        className="form-control"
                        value={pollNameInput}
                        style={{ borderColor: 'red'}}
                        required />
                    :<input
                        type="text"
                        onChange={(input) => {
                            talkToContractInteraction("Storage", false, "pollNameExists", [input.target.value], "Loading...").then((result) => {
                                if (result !== nameTaken) {
                                    changeNameTaken(result)
                                }
                            })
                            changePollNameInput(input.target.value)
                        }}
                        className="form-control"
                        value={pollNameInput}
                        required />
                    }
                </div>

                <p>&nbsp;</p>

                {pollNameInput === ""
                    ||<div>
                    {nameTaken
                        || <Button onClick = {() => nextPage()} text="Next"></Button>
                    }
                    </div>
                }
                
                <p>&nbsp;</p>

                <BackButton/>

                <p>&nbsp;</p>
            </div>
        </AppPage>
    )
}