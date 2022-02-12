import React from "react";

function getTip() {
  if (!window.localStorage.getItem("firstTip")) {
    window.localStorage.setItem("firstTip", "true");
    return "Welcome to OurKorean!";
  }

  const tips = ["Here's a tip!"];
  return tips[Math.floor(Math.random() * tips.length)]
}

const Tips = () => (
  <>
    <p>{getTip()}</p>
    <br />
    <p>Hope you enjoy!</p>
  </>
);

export default Tips;
