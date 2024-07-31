/*
 * This component is used in GetPollInfo.js to display the previous votes of the user and the total votes for each option.
 */

export default function DisplayVotes({ votes, options, title }) {
    return (
        <div className='center-content' >
                    
            <div className="card mb-4 bg-dark col-6 border border-white" style={{ maxWidth: '400px' }} >
                <div className="card-header">
                <p className='text-white'>{title}</p>
                </div>

            {votes.map((previousOptionVotes, key) => {

            let option = options[key]

            return (
                <div key={key} className="ml-auto mr-auto">
                    <p className='text-white'>{option + ": " + previousOptionVotes}</p>
                </div>
            )

            })}
            </div>
        
        </div>
    )
}