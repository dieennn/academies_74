const API_KEY = '031cb13ff0274b41bf48afd7b3513c90'
const LEAGUE_ID = "PL";// 2001
let base_url = "https://api.football-data.org/v2/";
let standing_ep = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
let matches_ep = `${base_url}competitions/${LEAGUE_ID}/matches`
let teams_ep = `${base_url}competitions/${LEAGUE_ID}/teams`
let scorers_ep = `${base_url}competitions/${LEAGUE_ID}/scorers`

let getData = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
};

let status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

let json = response => {
  return response.json();
}

let error = error => {
  // console.log("Error: " + error);
  return error;
}

let getStandings = () => {
  return getData(standing_ep)
    .then(status)
    .then(json);
}

let getMatches = () => {
  return getData(matches_ep)
    .then(status)
    .then(json)
}

let getTeams = () => {
  return getData(teams_ep)
    .then(status)
    .then(json)
}

// get detailTemas
let getDetailTeams = (id) => {  
  let detailTeams_ep = `${base_url}teams/${id}`
  return getData(detailTeams_ep)
    .then(status)
    .then(json)
}

// get topGoal
let getTopGoal = () => {
  return getData(scorers_ep)
    .then(status)
    .then(json)
}