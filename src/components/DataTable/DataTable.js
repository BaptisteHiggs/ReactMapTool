import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./constants";
import { GetTaggedData, GetTagKeys, GetRowsFromTaggedData } from "./utils";

const DataTable = ({ data }) => {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  const taggedData = GetTaggedData(data);
  const tagKeys = GetTagKeys(taggedData);

  const [rowData, setRowData] = useState(
    GetRowsFromTaggedData(tagKeys, taggedData)
  );
  const [colDefs, setColDefs] = useState(
    tagKeys.map((key) => {
      return { field: key };
    })
  );

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: height, width: width, resize: "both" }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default DataTable;
