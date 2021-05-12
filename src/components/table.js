import React from "react";

const Table = (props) => {
  return (
    <>
      <table className="moves-table">
        <caption>Moves</caption>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Player</th>
            <th>Played</th>
            <th>Pos.</th>
          </tr>
        </thead>
        <tbody>
          {props.content.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{obj.sno}</td>
                <td>{obj.player}</td>
                <td>{obj.played}</td>
                <td>{obj.pos}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
