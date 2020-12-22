import React from "react";
import HeaderAdmin from "../../../components/admin/header";
import ManagerFilm from "../../../components/admin/manageFilm/ManagerFilm";
import MenuAdmin from "../../../components/admin/menu/MenuAdmin";

export default function MangerFilmScreen() {
  return (
    <div>
      <HeaderAdmin />
      <div style={{ display: "flex" }}>
        <MenuAdmin />
        <ManagerFilm />
      </div>
    </div>
  );
}
