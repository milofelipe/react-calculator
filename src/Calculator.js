import React from 'react';
import SimpleMode from './SimpleMode';
import './Calculator.css';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: "0",
            lastOperand: "0",   // Tracked for square root operation.
            lastEntryAnOperation: false,
        };
    }

    render() {
        return (
            <SimpleMode screen={this.state.expression} onClick={(i) => this.handleClick(i)}/>
        );
    }

    handleClick(i) {
        return this.handleAC(i) ||
            this.handleEquals(i) ||
            this.handleSquareRoot(i) ||
            this.handleOperands(i) ||
            this.handleOperations(i);
    }

    handleAC(i) {
        if (i === "AC") {
            this.setState({
                expression: "0",
                lastOperand: "0",
                lastEntryAnOperation: false,
            });
            return true;
        }

        return false;
    }

    handleEquals(i) {
        if (i === "=") {
            this.setState(calculate(this.state));
            return true;
        }

        return false;
    }

    handleSquareRoot(i) {
        if (i === "sqrt") {
            this.setState(squareRoot(this.state));
            return true;
        }

        return false;
    }

    handleOperands(i) {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(i)) {
            this.setState(processOperands(i, this.state));
            return true;
        }

        return false;
    }

    handleOperations(i) {
        if (["^", "/", "*", "-", "+"].includes(i)) {
            this.setState(processOperations(i, this.state));
            return true;
        }

        return false;
    }
}

export function calculate(state) {
    if (state.lastEntryAnOperation) {
        return state;
    }

    let expression = state.expression;
    expression = expression.replace(/\^/g, "**");   // replace all ^ with ** so Javascript can evaluate exponent operation
    const result = eval(expression);
    return {
        expression: result + "",
        lastOperand: result + "",
        lastEntryAnOperation: false,
    };
}

export function processOperands(i, state) {
    if (i === "." && state.lastOperand.indexOf('.') !== -1) {
        return state;
    }

    let expression = (state.expression === "0" || state.expression === "Infinity" ? "" : state.expression) + i;
    let lastOperand = state.lastOperand + i;
    return {
        expression: expression,
        lastOperand: lastOperand,
        lastEntryAnOperation: false,
    };
}

export function processOperations(i, state) {
    if (state.expression === "0" || state.expression === "Infinity" || state.lastEntryAnOperation) {
        return state;
    }

    let expression = state.expression + i;
    return {
        expression: expression,
        lastOperand: "0",
        lastEntryAnOperation: true,
    };
}

export function squareRoot(state) {
    const result = Math.sqrt(state.lastOperand) + "";
    return {
        expression: result,
        lastOperand: result,
        lastEntryAnOperation: false,
    };
}