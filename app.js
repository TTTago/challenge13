"use strict";


const FOOTBALL_API_KEY = "3c88687cb62b96b94809a61ae13c1019";

const getFootballAPIData = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": FOOTBALL_API_KEY,
      "x-rapidapi-host": "https://v3.football.api-sports.io/"
    },
    redirect: "follow"
  };

  const response = await fetch(
    "https://v3.football.api-sports.io/fixtures?live=all&league=1",
    requestOptions
  );
  const data = await response.json();
  return data;
};

const getGameInformation = async () => {
  const data = await getFootballAPIData();
  if (!data.results) {
    throw new Error("😢 No Game");
  }
  console.log(data);
  const parsedData = {
    minutes: data.response[0].fixture.status.elapsed,
    teams: {
      home: {
        name: data.response[0].teams.home.name,
        flag: data.response[0].teams.home.logo,
        goals: data.response[0].goals.home
      },
      away: {
        name: data.response[0].teams.away.name,
        flag: data.response[0].teams.away.logo,
        goals: data.response[0].goals.away
      }
    }
  };
  console.log(parsedData);
  return parsedData;
};

const getDataAndRenderGame = async () => {
  try {
    const game = await getGameInformation();
    document.querySelector(".time").textContent = `'${game.minutes}`;
    renderTeam(game.teams.home, "home");
    renderTeam(game.teams.away, "away");
    document.body.dataset.loaded = true;
  } catch (e) {
    document.body.dataset.loaded = true;
    document.querySelector(".time").textContent = `${e.message}`;
    console.error(e.message);
  }
};

const renderTeam = (team, className) => {
  const html = ` 
  <h1 class="country">${team.name}</h1>
  <img class="flag" src="${team.flag}" alt="">
  <div class="score">${team.goals}</div>
  `;
  document
    .querySelector(`.${className}`)
    .insertAdjacentHTML("afterbegin", html);
  return;
};

getDataAndRenderGame();
// Utilisez l'objet pour tester votre logiciel si aucun match n'est joué en ce moment
// Il s'agit d'une réponse de l'API lors du match Corée - Ghana du 28.11.22

// const fixture = {
//   "get": "fixtures",
//   "parameters": {
//       "live": "all",
//       "league": "1"
//   },
//   "errors": [],
//   "results": 1,
//   "paging": {
//       "current": 1,
//       "total": 1
//   },
//   "response": [
//       {
//           "fixture": {
//               "id": 855757,
//               "referee": "Anthony Taylor, England",
//               "timezone": "UTC",
//               "date": "2022-11-28T13:00:00+00:00",
//               "timestamp": 1669640400,
//               "periods": {
//                   "first": 1669640400,
//                   "second": null
//               },
//               "venue": {
//                   "id": null,
//                   "name": "Education City Stadium",
//                   "city": "Al Rayyan"
//               },
//               "status": {
//                   "long": "First Half",
//                   "short": "1H",
//                   "elapsed": 30
//               }
//           },
//           "league": {
//               "id": 1,
//               "name": "World Cup",
//               "country": "World",
//               "logo": "https://media.api-sports.io/football/leagues/1.png",
//               "flag": null,
//               "season": 2022,
//               "round": "Group Stage - 2"
//           },
//           "teams": {
//               "home": {
//                   "id": 17,
//                   "name": "South Korea",
//                   "logo": "https://media.api-sports.io/football/teams/17.png",
//                   "winner": false
//               },
//               "away": {
//                   "id": 1504,
//                   "name": "Ghana",
//                   "logo": "https://media.api-sports.io/football/teams/1504.png",
//                   "winner": true
//               }
//           },
//           "goals": {
//               "home": 0,
//               "away": 1
//           },
//           "score": {
//               "halftime": {
//                   "home": 0,
//                   "away": 1
//               },
//               "fulltime": {
//                   "home": null,
//                   "away": null
//               },
//               "extratime": {
//                   "home": null,
//                   "away": null
//               },
//               "penalty": {
//                   "home": null,
//                   "away": null
//               }
//           },
//           "events": [
//               {
//                   "time": {
//                       "elapsed": 21,
//                       "extra": null
//                   },
//                   "team": {
//                       "id": 1504,
//                       "name": "Ghana",
//                       "logo": "https://media.api-sports.io/football/teams/1504.png"
//                   },
//                   "player": {
//                       "id": 3421,
//                       "name": "D. Amartey"
//                   },
//                   "assist": {
//                       "id": null,
//                       "name": null
//                   },
//                   "type": "Card",
//                   "detail": "Yellow Card",
//                   "comments": "Elbowing"
//               },
//               {
//                   "time": {
//                       "elapsed": 24,
//                       "extra": null
//                   },
//                   "team": {
//                       "id": 1504,
//                       "name": "Ghana",
//                       "logo": "https://media.api-sports.io/football/teams/1504.png"
//                   },
//                   "player": {
//                       "id": 47480,
//                       "name": "M. Salisu"
//                   },
//                   "assist": {
//                       "id": null,
//                       "name": null
//                   },
//                   "type": "Goal",
//                   "detail": "Normal Goal",
//                   "comments": null
//               },
//               {
//                   "time": {
//                       "elapsed": 27,
//                       "extra": null
//                   },
//                   "team": {
//                       "id": 17,
//                       "name": "South Korea",
//                       "logo": "https://media.api-sports.io/football/teams/17.png"
//                   },
//                   "player": {
//                       "id": 2903,
//                       "name": "Jung Woo-Young"
//                   },
//                   "assist": {
//                       "id": null,
//                       "name": null
//                   },
//                   "type": "Card",
//                   "detail": "Yellow Card",
//                   "comments": "Holding"
//               }
//           ]
//       }
//   ]
// }
