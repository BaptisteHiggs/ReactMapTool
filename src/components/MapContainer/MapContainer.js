import React, { useEffect, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import FetchPolygonData from "../../utils/FetchPolygonData";
import { ACCESS_TOKEN } from "../../constants";
import { GetURLVariable } from "../../utils/urlVariableUtils";
import Draggable from "react-draggable";
import "./style.css";
import DataTable from "../DataTable/DataTable";

const Map = ReactMapboxGl({
  accessToken: GetURLVariable(ACCESS_TOKEN),
});

export const MapContainer = () => {
  const [promisedData, setPromisedData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState(null);
  const [renderTable, setRenderTable] = useState(true);

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

  const onDrawCreate = ({ features }) => {
    const polygon = features[0].geometry.coordinates[0].map((coords) => {
      return { lat: coords[1], lng: coords[0] };
    });
    setPromisedData(FetchPolygonData(polygon));
    setDataLoading(true);
    //console.log("onDrawCreate");
  };

  const onDrawUpdate = ({ features }) => {
    //console.log("onDrawUpdate");
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
