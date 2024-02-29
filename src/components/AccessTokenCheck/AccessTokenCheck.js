import React, { useEffect, useState } from "react";
import "./style.css";
import { SetURLVariable } from "../../utils/urlVariableUtils";
import { ACCESS_TOKEN } from "../../constants";
import validateToken from "../../utils/ValidateToken";

export const TokenInput = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const getValidity = async () => {
      const tokenValid = await validateToken(value);
      if (tokenValid) {
        SetURLVariable(ACCESS_TOKEN, value);
      }
    };

    getValidity();
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="tokenInputDiv">
      <form className="form">
        <label className="label" htmlFor="text-input">
          Enter Mapbox Access Token:
        </label>
        <br /> <br />
        <input
          className="input"
          type="text"
          id="text-input"
          value={value}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
