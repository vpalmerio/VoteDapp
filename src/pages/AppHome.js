import AppPage from '../components/AppPage'
import LoadScreen from '../components/LoadScreen'
import Button from '../components/Button'
import PollCards from '../components/PollCards'
import ballotbox from '../media/ballotbox.png'

import * as c from '../components/Constants'

/*
 * This is the home page of the "blockchain"/"web3" part of the application. It is used in Main.js
 * It is the first page the user sees when they connect their wallet. It is displayed at c.APP_LINK link.
 */

export default function AppHome ({ contractInteraction, getRecentPolls, homePagePolls }) {
  
    if(homePagePolls===null) {
      getRecentPolls()
      return (
        <LoadScreen
          title="Home"
          description="Create your first poll or check out some new ones!"
          text="Loading polls..."
        ></LoadScreen>
      )
    } else {
  
    return (
      <AppPage
        title="Home"
        description="Welcome to VoteDapp!"
      >
        <div className="text-center">
          <img 
            src={ballotbox} 
            alt="Ballot Box" 
            width="474"
            height="474"
          />
        </div>
        <p>&nbsp;</p>
        <Button text="Create Poll" path={c.CHOOSE_POLL_TYPE_LINK}></Button>
        <p>&nbsp;</p>
  
        {homePagePolls.length > 0
          && <p className="text-center"> Recently Created Polls </p>
        }
        
        <PollCards
          pollArray={homePagePolls}
          contractInteraction={contractInteraction}
        ></PollCards>
      </AppPage>
    )
  }};