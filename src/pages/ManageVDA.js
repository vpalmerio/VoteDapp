import React from 'react'

import AppPage from '../components/AppPage'
import BackButton from '../components/BackButton'
import TokenForm from '../components/TokenForm'

/*
 * This page is where people can buy and sell their VDA tokens for Ether. The component is used in Main.js
 */

export default function ManageVDA ({ accountBalance, tokenPrice, contractInteraction, buyToken}) {

    const sellToken = (amountOfTokens) => {
      contractInteraction(
        "Token", true, "returnTokens", [amountOfTokens], 
        "Creating transaction and sending to network...", true
      )
    }

    return (
      <AppPage
        title="Manage your VDA"
        description="Purchase VDA tokens here!"
      >
        <p>&nbsp;</p>
          <div className="text-center">
            <p>Your VDA Balance: {accountBalance}</p>
            <p>Value of a single VDA token in Wei: {tokenPrice}</p>
          </div>
          <TokenForm
            tokenFunction={buyToken}
            action="buy"
            placeholder="Amount of VDA to buy"
            tokenPrice={tokenPrice}
            buttonText="Buy Tokens"
          />

          <TokenForm
            tokenFunction={sellToken}
            action="sell"
            placeholder="Amount of VDA to sell"
            tokenPrice={tokenPrice}
            buttonText="Sell Tokens"
          />
        <p>&nbsp;</p>
        <BackButton/>
      </AppPage>
    )
  };