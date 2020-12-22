import React, { useEffect } from "react";
import HeaderAdmin from "../../../components/admin/header";
import ManageShowtime from "../../../components/admin/manageShowtime/ManageShowtime";
import { useLocation } from "react-router-dom";
import MenuAdmin from "../../../components/admin/menu/MenuAdmin";
import { useDispatch } from "react-redux";
import { fetchTicketRoom } from "../../../redux/actions/booking.actions";
export default function ShowtimeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  let id = location.pathname.substr(16, 5);
  console.log(id);
  useEffect(() => {
    dispatch(fetchTicketRoom(id));
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div style={{ display: "flex" }}>
        <MenuAdmin />
        <ManageShowtime />
      </div>
    </div>
  );
}
