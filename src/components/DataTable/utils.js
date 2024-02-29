export function GetTaggedData(data) {
  return data?.elements?.filter((e) => !!e.tags) ?? [];
}

export function GetTagKeys(taggedData) {
  const tagKeys = [];
  for (const element of taggedData) {
    const keys = Object.keys(element.tags);
    for (const key of keys) {
      if (!tagKeys.includes(key)) tagKeys.push(key);
    }
  }
  return tagKeys;
}

export function GetRowsFromTaggedData(keys, data) {
  const rows = [];
  for (const element of data) {
    const row = NewRow(keys);
    for (const tagKey of Object.keys(element.tags)) {
      row[tagKey] = element.tags[tagKey];
    }
    rows.push(row);
  }

  return rows;
}

function NewRow(keys) {
  return Object.fromEntries(keys.map((k) => [k, null]));
}
