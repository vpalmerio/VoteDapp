export default function Footer() {

    return (
        <footer className="py-3">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center flex-column flex-md-row border-bottom pb-2">
                    <h5 className="ml-0 ml-md-3 mb-0"><a href="/app">App</a></h5>
                    <ul className="nav justify-content-center">
                    <li className="nav-item"><a className="nav-link" href="https://github.com/rokkinrob/VoteDapp">Github</a></li>
                    <li className="nav-item"><a className="nav-link" href="https://discord.gg/uEeFU7n">Discord</a></li>
                    </ul>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column flex-md-row mx-3 mt-3">
                    <div className="d-flex mt-3 mt-md-0">
                        <p className="mb-0 small text-muted">VoteDapp</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}