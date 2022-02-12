import React from "react";
import LessonOrLoad from "./LessonOrLoad";
import YoutubeBox from "../../components/YoutubeBox";
import { useParams } from "react-router-dom";
import { loadAndInitSong } from "./initutils";

const Learn = () => {
  const { author, songname } = useParams();

  loadAndInitSong(author, songname);
  return (
    <>
      <LessonOrLoad />
      <div className="mt-2"/>
      <YoutubeBox />
    </>
  );
};

export default Learn;
