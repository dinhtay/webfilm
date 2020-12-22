import React from "react";
import HeaderAdmin from "../../../components/admin/header";
import ManagerUser from "../../../components/admin/managerUser/ManagerUser";
import MenuAdmin from "../../../components/admin/menu/MenuAdmin";

export default function UserScreen() {
  return (
    <div>
      <HeaderAdmin />
      <div style={{ display: "flex" }}>
        <MenuAdmin />
        <ManagerUser />
      </div>
    </div>
  );
}
