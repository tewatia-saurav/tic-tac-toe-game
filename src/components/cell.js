import React from "react";

const Cell = (props) => {
  let cell_class = "cell " + props.bg;
  return (
    <button
      className={cell_class}
      onClick={() => props.onCellClicked(props.id)}
    >
      {props.content}
    </button>
  );
};

export default Cell;
