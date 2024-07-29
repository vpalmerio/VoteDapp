import {Helmet} from "react-helmet";

/*
 * This component is a wrapper for the main content of the app. 
 * It is used to set margins, max width, and padding for every page in the app.
 * It also sets the title and description of the page (that you can see when you hover over a tab in your browser).
 */

export default function AppPage(props) {

    let maxWidth = '500px'
    if (props.maxWidth !== undefined) {
        maxWidth = props.maxWidth
    }

    return (
        <div className="container-fluid mt-5">
            <Helmet>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Helmet>
            <div className="center-content">
                <main role="main" className="col-lg-12" style={{ maxWidth: maxWidth}}>
                    <div className="content">

                        {props.children}

                    </div>
                </main>
            </div>
        </div>
    )
}