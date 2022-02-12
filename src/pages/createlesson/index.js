import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Basics from "./Basics";
import NewQuestion from "./NewQuestion";
import QuestionList from "./QuestionList";
import BottomButtons from "./BottomButtons";
import { video } from "../../components/YoutubeBox";

const CreateLesson = ({ vid, user }) => {
  return user.uid ? (
    <>
      <h2>Create a Lesson</h2>
      <Container className="mt-2" style={{ width: "90%" }}>
        <Basics />
        {vid.length > 0 ? <div className="mt-4">{video(vid)}</div> : <></>}
        <NewQuestion />
        <QuestionList />
        <BottomButtons />
      </Container>
    </>
  ) : (
    <>You must be logged in to create lessons</>
  );
};

const mapStateToProps = (state) => ({
  vid: state.createLessonVideo,
  user: state.user,
});

export default connect(mapStateToProps)(CreateLesson);
