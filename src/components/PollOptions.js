import React from 'react';

import AppPage from './AppPage'
import Button from './Button'

import * as c from './Constants'

export default function PollOptions({ pollOptions, changePollOptions, changePage }) {

    const [pollOptionsInput, changePollOptionsInput] = React.useState(pollOptions)

    /*
     * This workaround is needed because React does not detect changes in arrays, and therefore
     * does not re-render the component when the array changes.
     */
    const [workaround, changeWorkAround] = React.useState(false)

    let tempOptionStorage
    return (
        <AppPage
          title="Poll Options"
          description="Create the options people can vote on"
        >
          <p>&nbsp;</p>

          <div className="text-center">
            <h1> What are the options people can vote on? </h1>
            <p> Type in an option, then press "Add option" to add it to the list. </p>
          </div>

          <form onSubmit={(event) => {
            event.preventDefault()

            if(tempOptionStorage === "" || tempOptionStorage == undefined) {
              window.alert("Please put an option in the textbox.")
            } else {

              let taken = false;
              for(let i = 0; i<pollOptionsInput.length; i++) {
                if(tempOptionStorage==pollOptionsInput[i]) {
                  taken=true;
                  window.alert("You already have the option: " + tempOptionStorage)
                  break;
                }
              }
              if(!taken) {
                let temparr = pollOptionsInput
                temparr.push(tempOptionStorage)

                changePollOptionsInput(temparr)
                
                changeWorkAround(!workaround)

                document.getElementById('Option').value = '';
              }
            }

          }}>
            <div className="form-group mr-sm-2">
              <input
                id="Option"
                type="text"
                onChange={(input) => {
                    tempOptionStorage = input.target.value
                  }
                }
                className="form-control"
                placeholder="Ex. yes"
              />
            </div>

            <p>&nbsp;</p>

            <div className='center-content'>
              <button type="submit" className="btn btn-primary btn-block">Add option</button>
            </div>

          </form>

          <p>&nbsp;</p>

          <p className='text-center'> Selectable Options: </p>
          
            {pollOptionsInput.map((option, key) => {
                return (
                <div key={key} className="text-left">

                  <div className='flex-container'>
                    <li>{option}</li>
                    
                    <button className="btn btn-link btn-sm pt-1" onClick = {() => {

                      let temparr = pollOptionsInput

                      temparr.splice(key, 1)

                      document.getElementById('Option').value = '';

                      changePollOptionsInput(temparr)

                      changeWorkAround(!workaround)

                    }}>Remove</button>
                  </div>

                </div>
                
                )
            })}


          <p>&nbsp;</p>

          {pollOptionsInput.length > 0
            &&<div> 
                <Button text='Next' onClick = {() => {
                    changePollOptions(pollOptionsInput)
                    changePage(c.CREATE_POLL_FEATURES)
                }}></Button>
              </div>

          }

          <p>&nbsp;</p>

          <Button text='Back' onClick = {() => changePage(c.CREATE_POLL_DESC)}></Button>

          <p>&nbsp;</p>

        </AppPage>
    )
}