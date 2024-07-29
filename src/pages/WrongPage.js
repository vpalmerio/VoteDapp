import Jumbotron from "../components/Jumbotron";

/*
 * This page is used to display an error message when the user tries to access a page that doesn't exist.
 * This is not the same as the AppWrongPage.js component, which only accounts for wrong pages within the app
 * (any link with c.APP_LINK in the beginning). This page accounts for every other page that doesn't exist.
 */

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