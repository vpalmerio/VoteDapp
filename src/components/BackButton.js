import Button from "./Button"

/*
 * This component is a button that allows the user to go back to the previous page.
 * It is used all across the app.
 */

export default function BackButton() {
    return (
        <Button path={-1} text = "Back"/>
    )
}