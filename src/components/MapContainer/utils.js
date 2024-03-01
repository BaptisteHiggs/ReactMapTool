export function RemoveExisting(drawRef) {
  const draw = drawRef.current.draw;
  const allFeatures = draw.getAll().features;
  const featuresWithGeom = allFeatures.filter((f) => hasGeometry(f));
  draw.delete(featuresWithGeom.map((f) => f.id));
}

function hasGeometry(feature) {
  const coordinates = feature.geometry.coordinates[0];
  return coordinates.length > 0 && !!coordinates[0];
}
