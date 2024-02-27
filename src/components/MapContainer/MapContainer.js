import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import FetchPolygonData from "../../utils/FetchPolygonData";
import { ACCESS_TOKEN } from "../../constants";
import { GetURLVariable } from "../../utils/urlVariableUtils";

const Map = ReactMapboxGl({
  accessToken: GetURLVariable(ACCESS_TOKEN),
});

export const MapContainer = () => {
  const onDrawCreate = ({ features }) => {
    const polygon = features[0].geometry.coordinates[0].map((coords) => {
      return { lat: coords[1], lng: coords[0] };
    });
    FetchPolygonData(polygon);
    console.log(window.location.search);
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <DrawControl
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          controls={{
            point: false,
            line_string: false,
            polygon: true,
            trash: true,
            combine_features: false,
            uncombine_features: false,
          }}
          onDrawModeChange={(e) => {}}
        />
      </Map>
    </div>
  );
};
