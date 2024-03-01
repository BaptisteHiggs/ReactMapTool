async function validateToken(token) {
  let response = null;
  response = await sendApiRequest(constructURL("example", token));

  return response.number !== 401;
}

async function sendApiRequest(url) {
  const response = await fetch(url);
  const data = response.json();
  const number = response.status;
  return { data, number };
}

function constructURL(username, accessToken) {
  const url = `https://api.mapbox.com/styles/v1/${username}?access_token=${accessToken}`;
  return url;
}

export default validateToken;
