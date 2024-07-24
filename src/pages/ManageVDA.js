import React from 'react'

import AppPage from '../components/AppPage'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

export default function ManageVDA ({ accountBalance, tokenPrice, contractInteraction, buyToken, isAddress }) {

    const [amountoftokensInput, changeAOTI] = React.useState(0)
  
    let tempFinalPrice = tokenPrice * amountoftokensInput
  
    return (
      <AppPage
        title="Manage your VDA"
        description="Purchase VDA tokens here!"
      >
        <p>&nbsp;</p>
          <div className="text-center">
            <p>Your VDA Balance: {accountBalance}</p>
            <p>Total Price in Wei: {tempFinalPrice}</p>
          </div>
          <form onSubmit={(event) => {
            event.preventDefault()
            
            buyToken(amountoftokensInput)
          }}>
            <div className="form-group mr-sm-2">
              <input
              id="amountoftokens"
              type="number"
              onChange={(input) => { changeAOTI(input.target.value) }}
              className="form-control"
              placeholder= {"Cost per token (wei): " + tokenPrice}
              required />
            </div>
            <div className='mt-4'>
              <Button buttonType="submit" text="Buy Tokens"></Button>
            </div>
          </form>
        <p>&nbsp;</p>
        <BackButton></BackButton>
      </AppPage>
    )
  };