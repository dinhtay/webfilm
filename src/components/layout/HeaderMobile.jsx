import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  appBar: {
    backgroundColor: "#fff",
    color: "#000",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  logo: {
    width: "90px",
    height: "40px",
  },
  login: {
    textDecoration: "none",
    color: "#000",
  },
  draw: {
    width: "100%",
    height: "100%",
  },
}));

function HeaderMobile() {
  const classes = useStyles();
  let user = useSelector((state) => state.userReducer.credentials);

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(true);
  };

  const handleLink = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={handleDrawer}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>
            <NavLink exact to="/">
              <img className={classes.logo} src="/images/logoTT.png" alt />
            </NavLink>
          </Typography>
          {user ? (
            <>
              <Button onClick={handleDrawer}>
                <span
                  style={{
                    color: "#fb4226",
                    fontStyle: "italic",
                    fontSize: "14px",
                  }}
                >
                  <i class="fa fa-user-circle"></i> {user.hoTen}
                </span>
              </Button>
            </>
          ) : (
            <>
              <NavLink
                className={classes.login}
                exact
                to="/sign-in"
                color="inherit"
              >
                Login
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.draw}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="menu__mobile">
          <div className="menu__mobile--item">
            <NavLink className="menu__mobile--branch" exact to="/">
              <img src="/images/logoTT.png" alt />
            </NavLink>
            <ul className={classes.menuitem}>
              <li>
                <a onClick={handleLink} href="#">
                  Lịch chiếu
                </a>
              </li>
              <li>
                <a onClick={handleLink} href="#cumrap">
                  Cụm rạp
                </a>
              </li>
              <li>
                <a onClick={handleLink} href="#tintuc">
                  Tin tức
                </a>
              </li>
              <li>
                <a onClick={handleLink} href="#ungdung">
                  Ứng dụng
                </a>
              </li>
              {user ? (
                <>
                  <li>
                    <NavLink exact to="/profile">
                      <i class="fa fa-address-card"></i> Thông tin tài khoản
                    </NavLink>
                  </li>
                  {user.maLoaiNguoiDung === "QuanTri" ? (
                    <li>
                      <NavLink exact to="/admin">
                        <i class="fa fa-cogs"></i> Trang quản trị
                      </NavLink>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <NavLink
                      exact
                      to="/"
                      onClick={async () => {
                        setOpen(false);
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

                            Swal.fire(
                              "Đã đăng xuất tài khoản",

                              "success"
                            );
                          }
                        });
                      }}
                    >
                      <i class="fa fa-power-off"></i> Đăng xuất
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default connect()(HeaderMobile);
