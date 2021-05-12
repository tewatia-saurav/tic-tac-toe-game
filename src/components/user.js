import React from "react";

class User extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      player1 :  "",
    player2  : ""
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    // console.log(this.state);
    let thisclass = "center " + this.props.displayForm;
  return (
    <div className={thisclass}>
      <div className="players">
        <label htmlFor="player1">Player X : </label>
        <input type="text" id="player1" name="player1" onChange={this.handleChange.bind(this)}></input>

        <label htmlFor="player2">Player O : </label>
        <input type="text" id="player2" name="player2" onChange={this.handleChange.bind(this)}></input>
        <br></br>
        <button
          id="start"
          onClick={() => {
            this.props.startGame(
              this.state.player1,
              this.state.player2
            );
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
  }
}



const _User = (props) => {
  let thisclass = "center " + props.displayForm;
  return (
    <div className={thisclass}>
      <div className="players">
        <label htmlFor="player1">Player X : </label>
        <input type="text" id="player1" name="player1"></input>

        <label htmlFor="player2">Player O : </label>
        <input type="text" id="player2" name="player2"></input>
        <br></br>
        <button
          id="start"
          onClick={() => {
            props.startGame(
              document.getElementById("player1").value,
              document.getElementById("player2").value
            );
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default User;
