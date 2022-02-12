import React from "react";
import Ads from "../components/Ads";

const FooterPage = () => {
  return (
    <div
      className="navbar navbar-default font-small pt-2 mt-3 static-bottom"
      role="navigation"
    >
      <div className="footer-copyright text-center py-1">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a href="https://www.linkedin.com/in/daniel-ginovker/"> dginovker </a>
      </div>
      <Ads />
    </div>
  );
};

export default FooterPage;
