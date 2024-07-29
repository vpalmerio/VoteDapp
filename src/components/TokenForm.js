import React from 'react'

import Button from '../components/Button'

/*
 * This component is used in the ManageVDA page to allow the user to input the amount of tokens they want to buy or sell.
 */ 

export default function TokenForm({ tokenFunction, action, placeholder, tokenPrice, buttonText  }) {

    const [amountOfTokensInput, changeAOTI] = React.useState(0)

    //convert final price to Gwei
    let tempFinalPrice = ((tokenPrice * amountOfTokensInput) / 1000000000)


    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            
            tokenFunction(amountOfTokensInput)
          }}>
            <div className='text-center mt-5'>
              <p>Total Value of VDA you want to {action} in Gwei: {tempFinalPrice}</p>
            </div>
            <div className="form-group mr-sm-2">
              <input
              id={action}
              type="number"
              onChange={(input) => { changeAOTI(input.target.value) }}
              className="form-control"
              placeholder={placeholder}
              required />
            </div>
            <div className='mt-4'>
              <Button buttonType="submit" text={buttonText}></Button>
            </div>
        </form>
    )
}