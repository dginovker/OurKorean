import React from "react";
import { loadCards } from "./utils";
import Search from "./Search";
import Cards from "./Cards";

function Splash() {
  loadCards();

  return (
    <>
      <Search />
      <Cards />
    </>
  );
}

export default Splash;
