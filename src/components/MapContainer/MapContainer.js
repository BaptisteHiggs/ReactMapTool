import React, { useEffect, useState, useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import FetchPolygonData from "../../utils/FetchPolygonData";
import { ACCESS_TOKEN } from "../../constants";
import { GetURLVariable } from "../../utils/urlVariableUtils";
import Draggable from "react-draggable";
import "./style.css";
import DataTable from "../DataTable/DataTable";
import { RemoveExisting } from "./utils";

const osmtogeojson = require("osmtogeojson");

const Map = ReactMapboxGl({
  accessToken: GetURLVariable(ACCESS_TOKEN),
});

export const MapContainer = () => {
  const [promisedData, setPromisedData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState(null);
  const [renderTable, setRenderTable] = useState(true);

  const drawRef = useRef(null);

  useEffect(() => {
    if (!!promisedData) {
      const getData = async () => {
        const data = await promisedData;
        setPromisedData(null);
        setDataLoading(false);
        setRenderTable(true);
        setData(data);
      };

      getData();
    }
  }, [promisedData]);

  useEffect(() => {
    if (!!data) {
      const geoJson = osmtogeojson(data);
      debugger;
    }
  }, [data]);

  const onChangedPolygon = ({ features }) => {
    const polygon = features[0].geometry.coordinates[0].map((coords) => {
      return { lat: coords[1], lng: coords[0] };
    });
    setPromisedData(FetchPolygonData(polygon));
    setDataLoading(true);
  };

  const onDrawModeChange = ({ mode }) => {
    if (mode === "draw_polygon") {
      RemoveExisting(drawRef);
    }
  };

  return (
    <div>
      {(!!data || dataLoading) && (
        <Draggable className="draggable">
          <div className="box">
            {dataLoading ? (
              <div style={{ padding: "5px" }}>Loading data...</div>
            ) : (
              renderTable && (
                <DataTable
                  data={data}
                  closeTable={() => {
                    setRenderTable(false);
                  }}
                />
              )
            )}
          </div>
        </Draggable>
      )}
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={[151.495830802, -24.2436222147]}
        zoom={[15]}
      >
        <DrawControl
          ref={(drawControl) => {
            drawRef.current = drawControl;
          }}
          onDrawCreate={onChangedPolygon}
          onDrawUpdate={onChangedPolygon}
          controls={{
            point: false,
            line_string: false,
            polygon: true,
            trash: true,
            combine_features: false,
            uncombine_features: false,
          }}
          onDrawModeChange={onDrawModeChange}
        />
      </Map>
    </div>
  );
};
