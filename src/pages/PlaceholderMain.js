import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import {Helmet} from "react-helmet"

import loader from '../media/loader.png'
import AppPage from '../components/AppPage'

export default function PlaceholderMain(props) { 

      return (
        <div>
          <AppPage>
            {props.failedToLoad
              ? <p className="text-danger text-center">{props.loadingDescription}</p>
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
          </AppPage>
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

              <Route path="*" element = {
                <Wrongpage changeLoadingBlockchain={props.changeLoadingBlockchain}/>
              } />
              </Routes>
            </main>
          </div>
        
        </div>
      );
}

const Wrongpage = ({changeLoadingBlockchain}) => {

    changeLoadingBlockchain(false)
    return (
      <div>
      </div>
    )
}







