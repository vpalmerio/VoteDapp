/*
 * This component is used to display a large heading and a smaller subheading in a nice blue card at the top of the page.
 * It is used in Home.js, PollTypeDesc.js, and WrongPage.js
 */

export default function Jumbotron({ bigText, smallText }) {

    return (
        <section className="jumbotron card bg-primary">
            <div className="container text-center py-2">
                <h1 className="display-4">{bigText}</h1>
                <p className="lead text-white">{smallText}</p>
            </div>
        </section>
    )

}