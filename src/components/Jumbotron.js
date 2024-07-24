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