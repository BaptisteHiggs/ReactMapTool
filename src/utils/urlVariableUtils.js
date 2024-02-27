export function GetURLVariable(key) {
  const urlVariableString = window.location.search;
  if (urlVariableString.length < 1 || urlVariableString.charAt(0) !== "?") {
    return "";
  } else {
    const variableStrings = urlVariableString.substring(1).split("&");
    for (const str of variableStrings) {
      const keyValPair = str.split("=");
      if (keyValPair[0] === key) {
        return keyValPair[1];
      }
    }
    return "";
  }
}

export function SetURLVariable(key, value) {
  window.location.search = `${key}=${value}`;
}
