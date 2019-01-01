import React from 'react';
import ReactDOM from 'react-dom';
import Calculator, {calculate, processOperands, processOperations, squareRoot} from '../Calculator';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Calculator />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('MDAS rule, calculating 2+5*10/5-2 = 10', () => {
    const state = {expression: "2+5*10/5-2"};
    const result = calculate(state);

    expect(result.expression).toBe("10");
});

it('square by N expression, calculating 8*5^4 = 5000', () => {
    const state = {expression: "8*5^4"};
    const result = calculate(state);

    expect(result.expression).toBe("5000");
});

it('square root 25 = 5', () => {
    const state = {lastOperand: "25"};
    const result = squareRoot(state);

    expect(result.expression).toBe("5");
});

it('square root 5*9+ = 3, square root will only apply to last operand', () => {
    const initialState = {expression: "0", lastOperand: "0", lastEntryAnOperation: false,};
    let state = processOperands("5", initialState);
    state = processOperations("*", state);
    state = processOperands("9", initialState);
    state = processOperations("+", state)
    const result = squareRoot(state);

    expect(result.expression).toBe("3");
});

it('divide by 0, 5/0 = Not a number', () => {
    const state = {expression: "5/0"};
    const result = calculate(state);

    expect(result.expression).toBe("Not a number");
});

it('prevent entry of multiple decimal points in operands', () => {
    const state = {expression: "3.0+3.5", lastOperand: "3.5"};
    const result = processOperands(".", state);

    expect(result.expression).toBe("3.0+3.5");
});

it('prevent entry of succeeding operations', () => {
    const state = {expression: "3.0+", lastEntryAnOperation: true};
    const result = processOperations("+", state);

    expect(result.expression).toBe("3.0+");
});

it('integrate processOperands, processOperations, and calculate: 12.5+5*9-1^6 = 56.5', () => {
    const initialState = {expression: "0", lastOperand: "0", lastEntryAnOperation: false,};
    let state = processOperands("1", initialState);
    state = processOperands("2", state);
    state = processOperands(".", state);
    state = processOperands("5", state);
    state = processOperations("+", state)
    state = processOperands("5", state);
    state = processOperations("*", state)
    state = processOperands("9", state);
    state = processOperations("-", state)
    state = processOperands("1", state);
    state = processOperations("^", state)
    state = processOperands("6", state);
    const result = calculate(state);

    expect(result.expression).toBe("56.5");
});

it('divide by zero then square root a number: 9/0 = Not a number, then 9 square root = 3', () => {
    const initialState = {expression: "0", lastOperand: "0", lastEntryAnOperation: false,};
    let state = processOperands("9", initialState);
    state = processOperations("/", state);
    state = processOperands("0", state);
    state = calculate(state);
    state = processOperands("9", state);
    const result = squareRoot(state)

    expect(result.expression).toBe("3");
});