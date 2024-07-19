import { useNavigate } from "react-router-dom";

import AppPage from '../components/AppPage'
import Button from '../components/Button'
import * as c from '../components/Constants';

export default function ChoosePollType() {

    const navigate = useNavigate();

    return (
        <AppPage 
          title="Choose Your Poll Type"
          description="Choose the type of poll you want to create!"
        >
          <h1 className="text-center mt-5">Choose a Poll Type</h1>
                
          <p>&nbsp;</p>
          <Button path={c.CREATE_POLL_TYPE_LINK_REGULAR} name = "Regular Voting"/>
    
          <p>&nbsp;</p>
          <Button path={c.CREATE_POLL_TYPE_LINK_QUADRATIC} name = "Quadratic Voting"/>
    
          <p>&nbsp;</p>
          <Button path={c.CREATE_POLL_TYPE_LINK_RANKED} name = "Ranked Choice Voting"/>
    
          <p>&nbsp;</p>
          <div className="text-center">
            <button className="btn btn-link btn-sm pt-0" onClick = {() => navigate("/polldesc")}>What are these?</button>
          </div>
    
          <p>&nbsp;</p>
          <Button path={-1} name = "Back"/>
          <p>&nbsp;</p>
        </AppPage>
      )
}