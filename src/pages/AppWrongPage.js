import AppPage from '../components/AppPage'
import Button from '../components/Button'

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