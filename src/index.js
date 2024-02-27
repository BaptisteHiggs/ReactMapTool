import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { MapContainer } from "./components/MapContainer/MapContainer";
import "./style.css";
import { TokenInput } from "./components/AccessTokenCheck/AccessTokenCheck";
import { GetURLVariable } from "./utils/urlVariableUtils";
import { ACCESS_TOKEN } from "./constants";
import validateToken from "./utils/ValidateToken";

function App() {
  const [tokenValid, setTokenValid] = useState(false);
  const accessToken = GetURLVariable(ACCESS_TOKEN);

  useEffect(() => {
    const getValidity = async () => {
      const tokenValidResult = await validateToken(accessToken);
      setTokenValid(tokenValidResult);
    };

    getValidity();
  }, [accessToken]);

  return tokenValid ? <MapContainer /> : <TokenInput />;
}

ReactDOM.render(<App />, document.getElementById("root"));
