import React from "react";
import Board from "./board";
import User from "./user";
import "./css/game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: null,
      player2: null,
      displayBoard: "hide",
      displayForm: "display",
    };
  }

  startGame(p1, p2) {
    if (p1 === "" || p2 === "") {
      alert("Please provide a name");
      return;
    }
    this.setState({
      player1: p1,
      player2: p2,
      displayBoard: "display",
      displayForm: "hide",
    });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      player1: state.player1,
      player2: state.player2,
      displayBoard: state.displayBoard,
    };
  }

  render() {
    return (
      <div className={this.props.theme}>
        <User
          startGame={this.startGame.bind(this)}
          displayForm={this.state.displayForm}
        />
        <Board
          players={{ playerX: this.state.player1, playerO: this.state.player2 }}
          displayBoard={this.state.displayBoard}
        ></Board>
      </div>
    );
  }
}

export default Game;
