import React from 'react';

import AppPage from './AppPage'
import Button from './Button'
import BackButton from './BackButton'

export default function Polldesc({ changePollDescription, changePage }) {

    const [pollDescriptionInput, changePollDescriptionInput] = React.useState("")

    const nextPage = () => {
        changePollDescription(pollDescriptionInput)
        changePage("Options")
    }

    return (
        <AppPage
          title="Create a poll!"
          description="Create your own customizable poll here!"
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

          <Button text="Back" onClick={() => changePage("Name")}></Button>
          <p>&nbsp;</p>

        </AppPage>
    )
}