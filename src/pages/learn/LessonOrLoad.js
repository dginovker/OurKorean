import React from "react";
import { connect } from "react-redux";
import Tips from "../../components/Tips";
import CoreLesson from "./corelesson";

const LessonOrLoad = (props) => {
  return props.questions.length === 0 ? <Tips /> : <CoreLesson />;
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(LessonOrLoad);
