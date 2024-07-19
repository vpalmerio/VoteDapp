import {Helmet} from "react-helmet";

export default function AppPage(props) {
    return (
        <div className="container-fluid mt-5">
            <Helmet>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Helmet>
            <div className="center-content">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                    <div className="content mr-auto ml-auto">

                        {props.children}

                    </div>
                </main>
            </div>
        </div>
    )
}