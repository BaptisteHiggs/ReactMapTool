import React from "react";
import MapboxGL from "mapbox-gl";
import { GeoJSONLayer } from "react-mapbox-gl";

const GeoJsonDisplay = (data) => {
  debugger;
  const onClickCircle = (evt) => {
    console.log(evt);
  };

  const symbolLayout = {
    "text-field": "{place}",
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    "text-offset": [0, 0.6],
    "text-anchor": "top",
  };
  const symbolPaint = {
    "text-color": "white",
  };

  const circleLayout = { visibility: "visible" };
  const circlePaint = {
    "circle-color": "white",
  };
  return (
    <GeoJSONLayer
      data={data}
      circleLayout={circleLayout}
      circlePaint={circlePaint}
      circleOnClick={onClickCircle}
      symbolLayout={symbolLayout}
      symbolPaint={symbolPaint}
    />
  );
};

export default GeoJsonDisplay;
