import { useNavigate } from "react-router-dom";

import AppPage from '../components/AppPage'
import Button from '../components/Button'
import BackButton from "../components/BackButton";
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
          <Button path={c.CREATE_POLL_TYPE_LINK_REGULAR} text = "Regular Voting"/>
    
          <p>&nbsp;</p>
          <Button path={c.CREATE_POLL_TYPE_LINK_QUADRATIC} text = "Quadratic Voting"/>
    
          <p>&nbsp;</p>
          <Button path={c.CREATE_POLL_TYPE_LINK_RANKED} text = "Ranked Choice Voting"/>
    
          <p>&nbsp;</p>
          <div className="text-center">
            <button className="btn btn-link btn-sm pt-0" onClick = {() => navigate(c.POLL_DESC_LINK)}>What are these?</button>
          </div>
    
          <p>&nbsp;</p>
          <BackButton/>
          <p>&nbsp;</p>
        </AppPage>
      )
}