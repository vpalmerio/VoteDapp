import {Helmet} from "react-helmet";

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