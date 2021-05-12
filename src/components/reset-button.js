import React from "react";

const Reset = (props) => {
  return (
    <button className="reset-button" onClick={props.reset}>
      Reset
    </button>
  );
};

export default Reset;
