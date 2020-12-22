import React from "react";
import { NavLink } from "react-router-dom";
import MenuMobile from "./MenuMobile";

export default function HeaderAdmin() {
  return (
    <header className="header__admin">
      <div>
        <NavLink className="header__admin--brand" exact to="/admin">
          <p>
            TTMovie<span>Admin</span>
          </p>
        </NavLink>
      </div>
      <div className="header__admin--mobile">
        <MenuMobile />
      </div>
    </header>
  );
}
