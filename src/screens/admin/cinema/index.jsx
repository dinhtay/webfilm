import React from "react";
import HeaderAdmin from "../../../components/admin/header";
import ManagerCinema from "../../../components/admin/manageCiname/ManagerCinema";
import MenuAdmin from "../../../components/admin/menu/MenuAdmin";

export default function MangerCinemaScreen() {
  return (
    <div>
      <HeaderAdmin />
      <div style={{ display: "flex" }}>
        <MenuAdmin />
        <ManagerCinema />
      </div>
    </div>
  );
}
