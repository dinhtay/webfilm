import React from "react";
import DashBoard from "../../components/admin/dashboard/DashBoard";
import HeaderAdmin from "../../components/admin/header";
import MenuAdmin from "../../components/admin/menu/MenuAdmin";

export default function AdminScreen() {
  return (
    <div>
      <HeaderAdmin />
      <div style={{ display: "flex" }}>
        <MenuAdmin />
        <DashBoard />
      </div>
    </div>
  );
}
