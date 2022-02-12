import React from "react";
import { connect } from "react-redux";

function LoadingMessage({ showUnofficial, lessonsCardInfos }): JSX.Element {
  let loadingMessage: any = <span>&nbsp;&nbsp;</span>;
  if (lessonsCardInfos.length === 0) {
    loadingMessage = "Loading lessons, please wait...";
  }
  else if (showUnofficial && lessonsCardInfos.filter(card => card.unofficial).length === 0) {
    loadingMessage = "Loading more lessons, please wait...";
  }

  return <div className="pb-2">{loadingMessage}</div>;
}

const mapStateToProps = (state) => ({
  lessonsCardInfos: state.lessonsCardInfos,
  showUnofficial: state.lessonsShowUnofficial,
});

export default connect(mapStateToProps)(LoadingMessage);
