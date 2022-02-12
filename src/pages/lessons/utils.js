import { getDBObject } from "../../firebase/database";
import store from "../../reducers/store";
import request from 'request';

let loadedOfficial = false;
let loadedUnofficial = false;

export function loadCards(official = true) {
  function loadSplashFrom(path) {
    getDBObject(path, (lessonsCardInfos) => {
      //Turn from songName: {..data}, songName2: {..data} to [{songdata}, {songdata}]
      let splashCardObjects = [];
      Object.keys(lessonsCardInfos).forEach((e) => {
        if (official || lessonsCardInfos[e].public) {
          splashCardObjects.push({
            title: e,
            image: lessonsCardInfos[e].image,
            genre: lessonsCardInfos[e].genre,
            views: lessonsCardInfos[e].views,
            author: lessonsCardInfos[e].author,
            unofficial: !official
          });
        }
      });

      store.dispatch({
        type: "ADD_SPLASH_CARD_INFO",
        lessonsCardInfos: splashCardObjects,
      });
    });
  }

  //Used to prevent loading multiple times
  if ((official && loadedOfficial) || (!official && loadedUnofficial)) {
    return;
  }
  if (official) {
    loadedOfficial = true;
  } else {
    loadedUnofficial = true;
  }

  if (official) {
    loadSplashFrom("songs/official/splash");
  } else {
    // TODO: Move this to new database function
    request({ url: "https://ourkorean-56a3e.firebaseio.com/songs/unofficial/.json?shallow=true" }, (error, response, body) => {
      Object.keys(JSON.parse(body)).forEach((userWithCard) => {
        loadSplashFrom(`songs/unofficial/${userWithCard}/splash`)
      });
    });
  }
}