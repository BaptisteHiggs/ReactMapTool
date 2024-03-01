import React, { useState, useEffect } from "react";
import axios from "axios";

async function FetchPolygonData(polygon) {
  const url = "https://overpass-api.de/api/interpreter";
  const body = buildOverpassQueryBody(polygon);
  const response = await axios.post(url, body);
  return response.data;
}

function buildOverpassQueryBody(polygon) {
  const coords = `poly:"${polygon
    .map((point) => `${point.lat.toString()} ${point.lng.toString()}`)
    .join(" ")}"`;

  const body =
    "data=" +
    encodeURIComponent(`
    [out:json][timeout:30];
    node(${coords});
    way(${coords});
    (._;>;);
    out;
`);

  return body;
}

export default FetchPolygonData;
