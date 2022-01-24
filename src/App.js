import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./App.css";

export const ACTİONS = {
  ADD_DİGİT: "add-digit",
  CHOOSE_OPERATİON: "choose-operation",
  CLEAR: "clear",
  DELETE_DİGİT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTİONS.ADD_DİGİT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      } /* falls through */
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      } /* falls through */

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }; /* falls through */

    case ACTİONS.CHOOSE_OPERATİON:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      } /* falls through */

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      } /* falls through */
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTİONS.CLEAR:
      return {};
    case ACTİONS.DELETE_DİGİT:
      if(state.overwrite) {
        return{
          ...state,
          overwrite: false,
          currentOperand: null,

        }
      }
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1){
        return{
          ...state,
          currentOperand: null,
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      /* falls through */
    case ACTİONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    // no default
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  // eslint-disable-next-line default-case
  switch (operation) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;

    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const İNTEGER_FORMATTER = new Intl.NumberFormat( "en-us", {
  maximumFractionDigits: 0,
} )

function formatOperand(operand){
  if(operand ==  null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return İNTEGER_FORMATTER.format(integer)
  return `${İNTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTİONS.CLEAR })}
      >
        AC
      </button>
      <button  onClick={() => dispatch({ type: ACTİONS.DELETE_DİGİT })}>DEL</button>
      <OperationButton operation={"÷"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTİONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
