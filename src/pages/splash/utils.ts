import store from "../../reducers/store";
import { getShallowDBObject } from "../../firebase/database";

export function loadLessons(): void {
  getShallowDBObject("songs/official/splash/", (objOfSongs) => {
    let currentSongCount: number = Object.keys(objOfSongs).length;

    getShallowDBObject("songs/unofficial/", (usersWithSongs) => {
      Object.keys(usersWithSongs).forEach(user => {
        getShallowDBObject(`songs/unofficial/${user}/splash/`, (objOfUserSongs) => {
          currentSongCount += Object.keys(objOfUserSongs).length;

          store.dispatch({
            type: "SPLASH_UPDATE_LESSONS",
            lessons: currentSongCount,
          });
        })
      });
    })
  });
}