import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/*
*
* TODO:
* Convert Fakename routes to use element
* Reimplement withRouter in App.js 
* Use copilot to fix error when copilot is fixed?
*
*/

import {Helmet} from "react-helmet";

import loader from '../media/loader.png'

export default function Fakemain(props) { 

      return (
        <div>
          <div className="container-fluid mt-5">
            <div className="row justify-content-center">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
                <div className="content mr-auto ml-auto">

                {props.loadingDescription == "Failed to connect to contracts. Please make sure you are on the Goerli testnet. Get Goerli testnet eth at https://goerli-faucet.slock.it/."
                  ? <p className="text-danger text-center">{"Failed to connect to contracts. Please make sure you are on the Goerli testnet. Get Goerli testnet eth at https://goerli-faucet.slock.it/."}</p>
                  : <div className="text-center">
                      <p>Loading...</p>
                      <img 
                        src={loader} 
                        alt="Ballot Box" 
                        width="64"
                        height="64"
                      />
                    </div>

                }
                

                </div>
              </main>
            </div>
          </div>
          <div>
            <main>
            <Routes>
              <Route path="/app" element = {
                <Helmet>
                  <title>Home </title>
                  <meta name="description" content="Create your first poll or check out some new ones!" />
                </Helmet>
              } />

              <Route path="/app/owned" element = {
                <Helmet>
                  <title>Owned Polls</title>
                  <meta name="description" content="Review the polls you created here!" />
                </Helmet>
              } />

              <Route path="/app/participated" element = {
                <Helmet>
                  <title>Polls You Participated In</title>
                  <meta name="description" content="Review the polls that you participated in!" />
                </Helmet>
              } />

              <Route path="/app/explore" element = {
                <Helmet>
                  <title>Explore</title>
                  <meta name="description" content="Explore polls that others have created!" />
                </Helmet>
              } />

              <Route path="/app/manage-vda"  element = {
                <Helmet>
                  <title>Manage your VDA</title>
                  <meta name="description" content="Purchase VDA tokens here!" />
                </Helmet>
              } />

              <Route path="/app/choose-poll-type" element = {
                <Helmet>
                  <title>Choose Your Poll Type</title>
                  <meta name="description" content="Choose the type of poll you want to create!" />
                </Helmet>
              } />

              <Route path="/app/create-poll/:type" element = {
                <Helmet>
                  <title>Create a Poll!</title>
                  <meta name="description" content="Create your own customizable poll here!" />
                </Helmet>
              } />

              <Route path="/app/polls/:tempname" element = {
                <Helmet>
                  <title>Poll Info</title>
                  <meta name="description" content="Info about this poll" />
                </Helmet>
              } />

              <Route element = { <Wrongpage/> } />
              </Routes>
            </main>
          </div>
        
        </div>
      );
}

const Wrongpage = () => {

    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">

            <p className="text-center">Unfortunately, this page does not exist.</p>
            


            </div>
          </main>
        </div>
      </div>
    )
}







