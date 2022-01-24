import { ACTİONS } from "./App"

export default function OperationButton({dispatch, operation}) {
    return <button onClick={() => dispatch({type: ACTİONS.CHOOSE_OPERATİON, payload: {operation} })}>{operation}</button>
}