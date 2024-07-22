import React from 'react';

import AppPage from './AppPage'
import Button from './Button'

import * as c from './Constants'

export default function Polldesc({ pollDescription, changePollDescription, changePage }) {

    const [pollDescriptionInput, changePollDescriptionInput] = React.useState(pollDescription)

    const nextPage = () => {
        changePollDescription(pollDescriptionInput)
        changePage(c.CREATE_POLL_OPTIONS)
    }

    return (
        <AppPage
          title="Write a short description"
          description="Write a short description for your poll"
        >
          <p>&nbsp;</p>
          <div className='text-center'>
            <h1> What is your poll for? </h1>
            <p> Extra details, recipient/target of poll, etc. </p>
            <p> You can skip this step to save gas </p>
          </div>
          <div className="mr-sm-2">
            <form>
              <input

                type="text"
                onChange={(input) => {
                    changePollDescriptionInput(input.target.value)
                  }
                }
                className="form-control"
                value={pollDescriptionInput}
              />
            </form>
          </div> 

          <p>&nbsp;</p>

          {pollDescriptionInput === ""
            ?<Button text="Skip" onClick = {() => {
              changePollDescriptionInput("")
              changePollDescription("")
              changePage("Options")
            }}></Button>
            : <Button text = "Next" onClick={() => nextPage()}></Button>
          }
          
          <p>&nbsp;</p>

          <Button text="Back" onClick={() => changePage(c.CREATE_POLL_NAME)}></Button>
          <p>&nbsp;</p>

        </AppPage>
    )
}