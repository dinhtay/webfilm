import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//     txtSearch: {
//       width: "90%",
//       marginLeft: "5%",
//     },
//   },
// }));

export default function MenuAdmin() {
  // const classes = useStyles();
  const credentials = useSelector((state) => state.userReducer.credentials);
  return (
    <div className="menuAdmin">
      <div className="menuAdmin__info">
        <div className="menuAmin__info--img">
          <img src="/images/iconAd.png" alt="icon" />
        </div>
        <div className="menuAdmin__info--name">
          <p>
            <span style={{ fontStyle: "italic" }}>Hi! </span>
            {credentials?.hoTen}
          </p>
          <p>
            <span></span>ONLINE
          </p>
        </div>
      </div>
      {/* <div className="menuAdmin__search">
        <TextField
          className={classes.txtSearch}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </div> */}
      <div className="menuAdmin__nav">
        <ul>
          <li>
            <NavLink className="menuAdmin__link" exact to="/">
              <i className="fa fa-home"></i>Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink className="menuAdmin__link" exact to="/admin">
              <i className="fa fa-dashboard"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink className="menuAdmin__link" exact to="/admin/manager-user">
              <i className="fa fa-user"></i>Quản lý Người dùng
            </NavLink>
          </li>
          <li>
            <NavLink className="menuAdmin__link" exact to="/admin/manager-film">
              <i className="fa fa-film"></i>Quản lý Phim
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menuAdmin__link"
              exact
              to="/admin/manager-cinema"
            >
              <i className="fa fa-tv"></i>Quản lý Rạp
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menuAdmin__link"
              exact
              to="/admin"
              onClick={async () => {
                Swal.fire({
                  title: "Bạn muốn đăng xuất ?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OK !",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("creadentials");
                    window.location.replace("/");
                    Swal.fire("Đã đăng xuất tài khoản", "success");
                  }
                });
              }}
            >
              <i className="fa fa-power-off"></i>Đăng xuất
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
