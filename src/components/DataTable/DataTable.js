import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./constants";
import { GetTaggedData, GetTagKeys, GetRowsFromTaggedData } from "./utils";
import { TableMenu } from "./TableMenu";

const DataTable = ({ data, closeTable }) => {
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
    <>
      <div
        className="ag-theme-quartz"
        style={{ height: height, width: width, resize: "both" }}
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
        <div
          style={{
            position: "absolute",
            transform: `translate(${width + 10}px, -${height - 2}px)`,
          }}
        >
          <TableMenu closeTable={closeTable} />
        </div>
      </div>
    </>
  );
};

export default DataTable;
