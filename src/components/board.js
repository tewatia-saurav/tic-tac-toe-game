import React from "react";
import "./css/board.css";
import Cell from "./cell";
import Reset from "./reset-button";
import Table from "./table";
import Timer from "./timer";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {
        playerX: this.props.players.playerX,
        playerO: this.props.players.playerO,
      },
      player_active: null,
      moves: 0,
      mainmsg: "Next move : X",
      next: "X",
      cells: [null, null, null, null, null, null, null, null, null],
      bg: ["", "", "", "", "", "", "", "", ""],
      moves_list: [],
      displayBoard: this.props.displayBoard,
      resetTimer: false,
      freezTimer: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let active_player;
    if (state.player_active) {
      active_player =
        state.player_active === props.players.playerX
          ? props.players.playerO
          : props.players.playerX;
    } else {
      active_player = props.players.playerX;
    }

    return {
      players: {
        playerX: props.players.playerX,
        playerO: props.players.playerO,
      },
      player_active: active_player,
      displayBoard: props.displayBoard,
      resetTimer: state.resetTimer,
      freezTimer: state.freezTimer,
    };
  }

  clicked(id) {
    let winner = this.checkGame();
    if (!winner) {
      // this.timer()
      if (!this.state.cells[id]) {
        let new_move_list = [...this.state.moves_list];
        new_move_list.push({
          sno: this.state.moves + 1,
          played: this.state.next,
          pos: id,
          player: this.state.player_active,
        });

        this.setState(
          {
            moves: this.state.moves + 1,
            moves_list: new_move_list,
          },
          () => {
            if (this.state.moves === 9) {
              this.setState({
                mainmsg: "DRAW!!",
                freezTimer: true,
              });
            }
          }
        );
        let newCells = [...this.state.cells];
        newCells[id] = this.state.next;
        let newNext = this.state.next === "X" ? "0" : "X";

        this.setState(
          {
            next: newNext,
            cells: newCells,
            mainmsg: "Next move : " + newNext,
          },
          () => {
            let winner = this.checkGame();
            if (winner) {
              let newbg = [...this.state.bg];
              for (let i = 0; i < winner.length; i++) {
                newbg[winner[i]] = "colored";
              }

              this.setState({
                bg: newbg,
                mainmsg: this.state.cells[winner[0]] + "-Player Wins!!",
                freezTimer: true,
              });
            }
          }
        );
      }
    } else {
      alert(this.state.cells[winner[0]] + "-Player already Won the game");
    }
  }
  timerOver(player){
    let msg = player === "player1" ? this.state.players.playerX : this.state.players.playerO
    // let newBg = this.state.bg
      this.setState({
        mainmsg : this.state.next + " -Player Wins By Time ",
        freezTimer : true
      })
  }

  checkGame() {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let cells = this.state.cells;
    for (let i = 0; i < 8; i++) {
      let [a, b, c] = wins[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return [a, b, c];
      }
    }
    return null;
  }
  reset() {
    this.setState({
      players: {
        playerX: this.props.players.playerX,
        playerO: this.props.players.playerO,
      },
      player_active: this.props.players.playerX,
      moves: 0,
      mainmsg: "Next move : X",
      next: "X",
      cells: [null, null, null, null, null, null, null, null, null],
      bg: ["", "", "", "", "", "", "", "", ""],
      moves_list: [],
      resetTimer: true,
      freezTimer: false,
    });
  }
  acknowledgeReset = () => {
    this.setState({ resetTimer: false });
  };

  render() {
    let appendmsg;
    if (this.state.mainmsg !== "DRAW!!") {
      appendmsg = " (" + this.state.player_active + ")";
    } else {
      appendmsg = "";
    }
    return (
      <div className={this.state.displayBoard}>
        <Table content={this.state.moves_list}></Table>
        <div className="board">
          <h3>{this.state.mainmsg + appendmsg}</h3>

          {this.state.cells.map((value, index) => {
            return (
              <Cell
                key={index}
                id={index}
                bg={this.state.bg[index]}
                content={value}
                onCellClicked={(id) => {
                  this.clicked(id);
                }}
              ></Cell>
            );
          })}

          <Reset reset={this.reset.bind(this)}></Reset>
        </div>
        {/* {console.log("timer " + this.state.resetTimer)} */}
        <Timer
          forPlayer={this.state.player_active}
          players={this.state.players}
          reset={this.state.resetTimer}
          freez={this.state.freezTimer}
          acknowledge={this.acknowledgeReset}
          timeOver = {this.timerOver.bind(this)}
        />
      </div>
    );
  }
}

export default Board;
