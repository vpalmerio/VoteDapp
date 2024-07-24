import Jumbotron from "../components/Jumbotron";

export default function WrongPage() {
    return (
        <div className="container-fluid">
          <p></p>
          <Jumbotron bigText='Uh Oh!' smallText="Looks like this page doesn't exist..."></Jumbotron>
          <div className="text-center py-5">
            <a className="btn btn-primary" href="/">Home</a>
          </div>
        </div>
    )
}