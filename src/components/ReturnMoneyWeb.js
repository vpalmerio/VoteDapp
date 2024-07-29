/*
 * This component provides a form where the user can input the recipient of funds spent on a poll. 
 * It is used more than once in PollFeatures.js
 */

export default function ReturnMoneyWeb({ 
    returnMoneyOnCompletionInput, changeRMOCI, pollRecipientInput, changePollRecipientInput, 
    sendFundsToMe, changeSendFundsToMe, account 
}) {
    return (
        <div>
            <div className="form-check">
                <input
                type="checkbox"
                checked={returnMoneyOnCompletionInput}
                onChange= {() => changeRMOCI(!returnMoneyOnCompletionInput)}
                className="form-check-input"
                    />
                <label> Return money to voters upon completion of poll </label>
            </div>
            {returnMoneyOnCompletionInput
                || <div>
                    <div className="form-group mr-sm-2 text-center">
                        <label> Recipient of funds spent on winning option </label>
                        <input
                            onChange={(input) => changePollRecipientInput(input.target.value)}
                            className="form-control"
                            value={sendFundsToMe ? account : pollRecipientInput}
                            disabled={sendFundsToMe}
                            required={!sendFundsToMe}
                        />
                        <div className="form-check">
                            <input
                                type="checkbox"
                                checked={sendFundsToMe}
                                onChange={() => {
                                    changeSendFundsToMe(!sendFundsToMe)
                                }}
                                className="form-check-input"
                            />
                            <label className=""> Send funds to me </label>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}