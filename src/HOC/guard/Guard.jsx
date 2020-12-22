import React from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

export default function Guard(props) {
  const users = JSON.parse(localStorage.getItem("creadentials"));
  if (users?.maLoaiNguoiDung === "QuanTri") {
    return props.children;
  } else {
    Swal.fire({
      title: "Lỗi truy cập",
      text: "Vui lòng đăng nhập Tài khoản Admin",
      icon: "warning",
    });
    return <Redirect to="/" />;
  }
}
