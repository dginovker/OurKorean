import React from "react";
import { connect } from "react-redux";

function ErrorMsg({ text }) {
  return text ? (
    <div className="alert alert-danger" style={{ whiteSpace: "pre" }} role="alert" >
      {text}
    </div >
  ) : (
      ""
    );
}

const mapStateToProps = (state) => ({
  text: state.errorMsg,
});

export default connect(mapStateToProps)(ErrorMsg);
