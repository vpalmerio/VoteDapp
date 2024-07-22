
export default function ReturnMoneyInfo({ returnMoneyOnCompletion, recipient}) {
    return (
        <div> 
            {returnMoneyOnCompletion
            ?<p className='text-center'> All money spent can be retrieved by voters after completion of the poll. </p>
            :<div className='center-content '>
                <p className='text-center w-50' > Only money spent on the winning option will be sent to the poll's recipient address.
                    The rest can be retrieved after the poll is over.
                </p>
                <p> Poll's recipient address:  
                <a href={"https://etherscan.io/address/" + recipient}>{" " + recipient}</a> 
                </p>  
            </div>
            }
        </div>
    )
}