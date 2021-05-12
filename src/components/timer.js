import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: {
        player1: 0,
        player2: 0,
      },
      timerid: null,
      current: null,
      reset: this.props.reset,
    };
  }
  static getDerivedStateFromProps(props, state) {
    // console.log("derived state" + props.reset);
    return {
      timer: {
        player1: state.timer.player1,
        player2: state.timer.player2,
      },
      timerid: state.timerid,
      current: state.current,
      reset: props.reset,
    };
  }

  getTime(player) {
    if (player === "player1") {
      return {
        minutes: Math.floor(this.state.timer.player1 / 60),
        seconds: ("0" + (this.state.timer.player1 % 60)).slice(-2),
      };
    } else {
      return {
        minutes: Math.floor(this.state.timer.player2 / 60),
        seconds: ("0" + (this.state.timer.player2 % 60)).slice(-2),
      };
    }
  }

  setTimer(player) {
    if (this.state.timerid) {
      //   console.log('cleared', this.state.timerid);
      clearInterval(this.state.timerid);
    }

    if (player === "player1") {
      let iid = setInterval(() => {
        this.setState({
          timer: {
            player1: this.state.timer.player1 + 1,
            player2: this.state.timer.player2,
          },
          timerid: iid,
          current:
            player === "player1"
              ? this.props.players.playerX
              : this.props.players.playerO,
        });
      }, 1000);
      //   console.log('new iid ' , iid);
    } else if (player === "player2") {
      let iid = setInterval(() => {
        this.setState({
          timer: {
            player1: this.state.timer.player1,
            player2: this.state.timer.player2 + 1,
          },
          timerid: iid,
          current:
            player === "player2"
              ? this.props.players.playerO
              : this.props.players.playerX,
        });
      }, 1000);
      //   console.log('new iid ' , iid);
    }
  }

  resetTimer() {
    console.log("reset function")
    clearInterval(this.state.timerid);
    this.setState({
      timer: {
        player1: 0,
        player2: 0,
      },
      timerid: null,
      current: null,
      reset: false,
    },()=>{console.log("done");});
  }

  stopTimer() {
    clearInterval(this.state.timerid);
  }
  render() {
    // console.log("render")
    if (this.props.freez) {
      this.stopTimer();
    }
    if (this.state.reset) {
      console.log("reseting");
      this.resetTimer()
      this.props.acknowledge()
    }
    if (
      this.props.forPlayer === this.props.players.playerX &&
      this.state.current !== this.props.forPlayer
    ) {
      this.setTimer("player1");
      //   console.log("player1");
    } else if (
      this.props.forPlayer === this.props.players.playerO &&
      this.state.current !== this.props.forPlayer
    ) {
      this.setTimer("player2");
      //   console.log("player2");
    }

    let classname = "timer-block " + this.props.display;
    return (
      <div className={classname}>
        <h1>
          Player : X<br />
          <p>{this.props.players.playerX}</p>
          <hr />
          {this.getTime("player1").minutes}:{this.getTime("player1").seconds}
        </h1>
        <h1>
          Player : O<br />
          <p>{this.props.players.playerO}</p>
          <hr />
          {this.getTime("player2").minutes}:{this.getTime("player2").seconds}
        </h1>
      </div>
    );
  }
}

export default Timer;
