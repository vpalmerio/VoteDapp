import loader from '../media/loader.png'

import {Helmet} from "react-helmet"

/*
 * This component is a loading screen used for the GetPollInfo and DisplayPolls pages when the app is still loading data.
 */

export default function LoadScreen({ name, description, text }) {
    return (
        <div id="loader" className="text-center mt-5">
          <Helmet>
            <title>{name}</title>
            <meta name="description" content={description} />
            
          </Helmet>
          <p>{text}</p>
          <img 
            src={loader} 
            alt="Loading Gif" 
            width="64"
            height="64"
          />
        </div>
    )
}