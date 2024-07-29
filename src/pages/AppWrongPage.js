import AppPage from '../components/AppPage'
import Button from '../components/Button'

/*
 * This is the 404 page of the "blockchain"/"web3" part of the application. It is used in Main.js
 */

export default function AppWrongPage () {

    return (
      <AppPage>
  
        <h1 className='text-center'>Uh oh!</h1>
        <h1 className='text-center'>This page doesn't exist!</h1>
        
        <p>&nbsp;</p>
        <div className='center-content'>
          <Button text='Back to Safety' path='/app'></Button>
        </div>
  
      </AppPage>
    )
  }