import { ACTİONS } from "./App"

export default function DigitButton({dispatch, digit}) {
    return <button onClick={() => dispatch({type: ACTİONS.ADD_DİGİT, payload: {digit} })}>{digit}</button>
}