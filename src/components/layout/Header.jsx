import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Button, Menu } from "@material-ui/core";
import Swal from "sweetalert2";

function Header() {
  let user = useSelector((state) => state.userReducer.credentials);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();

  return (
    <header className="header">
      <NavLink className="header__brand" exact to="/">
        <img src="/images/logoTT.png" alt />
      </NavLink>
      <div className="header__nav">
        <div className="header__nav--menu">
          <ul className="menu--navbar">
            <li>
              <a href="#lichchieu">Lịch chiếu</a>
            </li>
            <li>
              <a href="#cumrap">Cụm rạp</a>
            </li>
            <li>
              <a href="#tintuc">Tin tức</a>
            </li>
            <li>
              <a href="#ungdung">Ứng dụng</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="header__login">
        {user ? (
          <>
            <Button onClick={handleClick}>
              <i
                style={{
                  color: "#fb4226",
                  fontSize: "20px",
                  marginRight: "5px",
                }}
                class="fa fa-user"
              ></i>

              <span
                style={{
                  color: "#fb4226",
                  fontStyle: "italic",
                  fontSize: "14px",
                }}
              >
                Hi! {user.hoTen}
              </span>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                to="/profile"
                style={{
                  display: "block",
                  fontSize: "14px",
                  textDecoration: "none",
                  color: "#444",
                  margin: "20px auto",
                  padding: "5px",
                }}
                onClick={handleClose}
              >
                <i class="fa fa-address-card"></i> Thông tin tài khoản
              </Link>
              {user.maLoaiNguoiDung === "QuanTri" ? (
                <Link
                  style={{
                    display: "block",
                    fontSize: "14px",
                    textDecoration: "none",
                    color: "#444",
                    margin: "20px auto",
                    padding: "5px",
                  }}
                  exact
                  to="/admin"
                  onClick={handleClose}
                >
                  <i class="fa fa-cogs"></i> Trang quản trị
                </Link>
              ) : (
                <></>
              )}
              <Link
                to="/"
                style={{
                  display: "block",
                  fontSize: "14px",
                  textDecoration: "none",
                  color: "#444",
                  margin: "20px auto",
                  padding: "5px",
                }}
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
                <i class="fa fa-power-off"></i> Đăng xuất
              </Link>
            </Menu>
          </>
        ) : (
          <>
            <NavLink exact to="/sign-in">
              <i className="fa fa-user-circle" />
              <span>Đăng nhập</span>
            </NavLink>
            <NavLink exact to="/sign-up">
              <span>Đăng ký</span>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

// const mapStateToProps = (state) => ({
//   credentials: state.userReducer.credentials,
// });

export default connect()(Header);
