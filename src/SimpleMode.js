import React from "react";
import {Button} from "./Button"

function SimpleScreen(props) {
    return (
        <div className="screen-result">Result: {props.value}</div>
    );
}

export default class SimpleMode extends React.Component {
    renderCalcButton(i) {
        return <Button value={i} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    <SimpleScreen value={this.props.screen}/>
                </div>
                <div className="board-row">
                    {this.renderCalcButton("AC")}
                    {this.renderCalcButton("^")}
                    {this.renderCalcButton("sqrt")}
                    {this.renderCalcButton("/")}
                </div>
                <div className="board-row">
                    {this.renderCalcButton("7")}
                    {this.renderCalcButton("8")}
                    {this.renderCalcButton("9")}
                    {this.renderCalcButton("*")}
                </div>
                <div className="board-row">
                    {this.renderCalcButton("4")}
                    {this.renderCalcButton("5")}
                    {this.renderCalcButton("6")}
                    {this.renderCalcButton("-")}
                </div>
                <div className="board-row">
                    {this.renderCalcButton("1")}
                    {this.renderCalcButton("2")}
                    {this.renderCalcButton("3")}
                    {this.renderCalcButton("+")}
                </div>
                <div className="board-row">
                    {this.renderCalcButton("")}
                    {this.renderCalcButton("0")}
                    {this.renderCalcButton(".")}
                    {this.renderCalcButton("=")}
                </div>
            </div>
        );
    }
}