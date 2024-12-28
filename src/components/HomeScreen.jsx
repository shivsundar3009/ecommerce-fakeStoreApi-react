import React from "react";
import Products from "./Products";
import { Navbar, Footer } from "./index";

function HomeScreen() {
  return (
    <>
      <div className="flex flex-col">

        <Products />

      </div>
    </>
  );
}

export default HomeScreen;
