import React from "react";
import "./style.css";
import cross from "../../resources/cross.png";

export const TableMenu = ({ closeTable }) => {
  return (
    <div className="menu">
      <img className="cross" src={cross} onClick={() => closeTable()} />
    </div>
  );
};
