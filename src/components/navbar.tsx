import React from "react";
import { ModeToggle } from "./toogle-theme-button";

function Navbar() {
  return (
    <nav className="flex justify-between p-3">
      <h1>Practica MVC</h1>

      <ModeToggle />
    </nav>
  );
}

export default Navbar;
