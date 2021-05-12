import React from "react";
import "./App.css";
import Header from "./components/header";
import Game from "./components/game";

const App = () => {
  return (
    <>
      <Header title="Tic-Tac-Toe" theme="ocean" />
      <Game theme="dar k"/>
    </>
  );
};

export default App;
