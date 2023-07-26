import React from 'react';

import {Helmet} from "react-helmet";

export default function Polldesc() { 

    return (

    <div>
      <Helmet>
        <title>Poll Types</title>
        <meta name="description" content="What are the different poll types and how do they work?" />
      </Helmet>
      <p>&nbsp;</p>
      <div className="row">
        <section className="jumbotron bg-primary mr-auto ml-auto" style={{ width: '1000px'}}>
          <div className="container text-center">
            <h1 className="display-4">Poll Types</h1>
            <p className="lead text-white">How does each one work?</p>
            
          </div>
        </section>
      </div>
      <div className="text-center">
        <a className="mr-auto ml-auto btn btn-primary" href="/">Home</a>
      </div>
      <div className="container-fluid mt-5" style={{ width: '800px'}}>
        
        <div className="">
          
          <main role="main" className="col-lg-12 ml-auto mr-auto">
            <div className="content mr-auto ml-auto">
              <div className="text-center">
                
                <h1>Regular Polls</h1>

                <p> Regular polls are polls in which everyone gets a set amount of votes. This could be one or more votes per person.
                   You can charge VDA tokens for these votes, which are tokens that you can manage on the home page. When charging tokens
                   for votes, you will only get the tokens that were spent on the winning option. People whose votes lost will be able to get
                   their money back.
                </p>

                <h1>Quadratic Polls</h1>

                <p> Quadratic polls are polls in which your nth vote costs n amount of tokens. For example, if you wanted to pay for two votes,
                     your first vote would cost 1 token and your second vote would cost 2 tokens, bringing the cost to a total of 3 tokens.
                     You can limit the amount of votes for all voters.
                     VDA tokens are charged for these votes, which are tokens that you can manage on the home page. When charging tokens
                     for votes, you will only get the tokens that were spent on the winning option. People whose votes lost will be able to get
                     their money back.
                </p>

                <h1>Ranked Polls</h1>

                <p> Ranked polls are polls that allow voters to rank their choices from first to last. For example, if we had three choices,
                     Bob, Sally, and Tina, the voter could rank Bob as their first choice, Sally as their second choice, and Tina as their third
                     choice. The winner would then be calculated based on the lowest choice getting cut off until an option gets 50% of the votes. 
                     For example, if we compiled everybodies first choice, and found that Bob was the lowest first choice, all the voters who had Bob
                     as their first choice would then have their second choice counted instead. In our case, Sally would be our next choice, and the votes
                     get recompiled, and if it turns out that enough people that had Bob as their first choice put Sally as their second choice, and Sally got
                     over 50% of the votes, Sally would win. If Sally did not get 50%, the poll would keep cutting off the lowest choice until Sally
                     or someone else does get 50% of the votes. People are allowed to put the same choice for all of their placements, and their next choices
                     will still be counted, although those counts probably wouldn't matter. No VDA tokens are used in this poll.
                </p>

                <p>&nbsp;</p>
                <p style={{ color: '#007bff'}}>Still need help? Ask questions in the discord below!</p>

                
              </div>
            </div>
          </main>
        </div>
      </div>
      <footer className="py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row border-bottom pb-2">
            <h5 className="ml-0 ml-md-3 mb-0"><a href="/app">App</a></h5>
            <ul className="nav justify-content-center">
              <li className="nav-item"><a className="nav-link" href="https://github.com/rokkinrob/VoteDapp">Github</a></li>
              <li className="nav-item"><a className="nav-link" href="https://discord.gg/uEeFU7n">Discord</a></li>
            </ul>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column flex-md-row mx-3 mt-3">
            <div className="d-flex mt-3 mt-md-0">
              <p className="mb-0 small text-muted">VoteDapp</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )

}