import React from "react";
import Products from "./Products";
import { Navbar, Footer } from "./index";

function HomeScreen() {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />

        <Products />

        <Footer />
      </div>
    </>
  );
}

export default HomeScreen;
