import React from 'react';

import createpoll1 from '../media/createpoll1.gif'
import createpoll2 from '../media/createpoll2.gif'
import createpoll3 from '../media/createpoll3.gif'

export default function Home() {

	return(

	<div className="container-fluid">
    
      <p></p>
    
      <section className="jumbotron card bg-primary">
        <div className="container text-center py-2">
          <h1 className="display-4">VoteDapp (Goerli Testnet)</h1>
          <p className="lead text-white">Decentralized, free, open. VoteDapp is an easy to use poll interface on the ethereum network for anyone, anywhere.</p>
        </div>
      </section>
      	<div className="text-center py-4">
    		<a className="btn btn-primary" href="/app">Head to the App</a>
    	</div>

      <section className="py-5">
        <div className="container">
          <h2 className="mb-5 text-center">Some of our awesome features</h2>
          <div className="row">
            <div className="col-md-3 mb-4">
              <h3>Fully Decentralized</h3>
              <p>All polls are stored on the Ethereum network. <b>No email or password needed.</b> Nobody can censor your polls for any political reason.</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3>Easily Manageable</h3>
              <p>Easily manage the polls you own and check on the polls you participated in to see their results.</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3>No Profit for the Developer</h3>
              <p>The developer of this project makes no profit from it whatsoever, and doesn't plan to in the future.</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3>Great Customizability</h3>
              <p>Control who can vote in your poll, how many votes are equally allocated to everyone, and much, much more!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <h3 className="mb-3">Three Different Poll Types</h3>
          <div className="row mb-3">
            <div className="col-md-4 p-2 py-3">
              <h3 className="my-4">Regular Voting</h3>
              <p>Each voter gets a set amount of votes. You can charge voters VDA for each vote as a fee.</p>
            </div>
            <div className="col-md-4 p-2 py-3">
              <h3 className="my-4">Quadratic Voting</h3>
              <p>The price of each vote is equal to the amount of votes you buy. For example, your first vote will cost 1 VDA, your second will cost 2 VDA. For 2 votes, you would be paying 3 VDA.</p>
            </div>
            <div className="col-md-4 p-2 py-3">
              <h3 className="my-4">Ranked Choice Voting</h3>
              <p>Rank your votes from first to last, allowing you to express your opinion more cleary and effectively.</p>
            </div>
          </div>
          <a className="btn btn-primary" href="/polldesc">Learn more</a>
        </div>
      </section>
    
      <section className="py-5">
        <div className="container text-center">
          <h3 className="mb-4">Create a poll on VoteDapp!</h3>
          <p className="lead mb-5">We've made it super easy to customize your own poll for your own needs!</p>
          <div>
            <div className="row align-items-center text-md-left mb-5">
              <div className="col-md-6 order-1 order-md-0">
              	<img className="img-fluid" src={createpoll1} alt="Create a Poll 01" loading="lazy" width="800" height="500"/>
              </div>
              <div className="col-md-6 mb-4 mb-md-0">
                <span className="display-3 mb-2">01</span>
                <h4 className="mb-4">Choose your poll type</h4>
                <p>Head to the <a href="/app">web3 application</a> and press "Create a poll". Choose a poll type that best suits your needs.</p>
              </div>
            </div>
            <div className="row align-items-center text-md-right mb-5">
              <div className="col-md-6 order-1">
              	<img className="img-fluid" src={createpoll2} alt="Create a Poll 02" loading="lazy" width="800" height="500"/>
              </div>
              <div className="col-md-6 mb-4 mb-md-0 order-0">
                <span className="display-3 mb-2">02</span>
                <h4 className="mb-4">Configure your poll</h4>
                <p>Configure the poll's basic needs, such as it's name, description, options, and whether you would like to charge VDA for votes or make a "invite-only" poll</p>
              </div>
            </div>
            <div className="row align-items-center text-md-left mb-5">
              <div className="col-md-6 order-1 order-md-0">
	            <img className="img-fluid" src={createpoll3} alt="Create a Poll 03" loading="lazy" width="800" height="500"/>
              </div>
              <div className="col-md-6 mb-4 mb-md-0">
                <span className="display-3 mb-2">03</span>
                <h4 className="mb-4">Double check your poll settings</h4>
                <p>Review the poll options you have set at the Finish page. If something isn't quite right, you can always go back and change your poll settings before sending your transaction to the Ethereum network.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    
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