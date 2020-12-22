// import admin from "../../assets/admin.jpg";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import validateInfo from "../../screens/signUp/validateInfo";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import "../../App.scss";
import { changeUserInFo } from "../../redux/actions/user.action";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    width: "40%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: theme.spacing(2),
    },
  },
  tableCell: {
    padding: "10px 5px",
    [theme.breakpoints.down("sm")]: {
      width: "14%",
      padding: "5px 2px",
      border: "1px solid #ccc",
      fontSize: 12,
    },
  },
  btnUpdate: {
    border: "1px solid #3e515d",
    color: "#3e515d",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },
  title: {
    textAlign: "center",
    color: "#4a90e2",
  },
  divInput: {
    width: "90%",
    margin: "2% 5%",
  },
  divBtn: {
    marginTop: "3%",
  },
  error: {
    margin: "0",
    fontSize: "13px",
    fontStyle: "italic",
    color: "red",
  },
}));

export default function ProfileUser() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const profile = JSON.parse(localStorage.getItem("creadentials"));
  const [updateProfile, setUpDateProfile] = useState({
    taiKhoan: profile.taiKhoan,
    matKhau: profile.matKhau,
    xacNhanMK: profile.matKhau,
    email: profile.email,
    soDt: profile.soDT,
    maNhom: profile.maNhom,
    maLoaiNguoiDung: profile.maLoaiNguoiDung,
    hoTen: profile.hoTen,
  });

  const [error, setError] = useState({
    taiKhoan: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
    matKhau: "",
    xacNhanMK: "",
  });

  //---Show hide pass---
  const handleClickShowPassword = () => {
    setUpDateProfile({
      ...updateProfile,
      showPassword: !updateProfile.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //---Show hide pass--

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Bắt sự kiện
  const handleChange = (prop) => (event) => {
    setUpDateProfile({ ...updateProfile, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    let regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let email = /^([\w\.])+@([a-zA-Z0-9\-])+\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
    setError(validateInfo(updateProfile));

    if (
      updateProfile.matKhau.length > 5 &&
      updateProfile.matKhau !== "" &&
      updateProfile.xacNhanMK !== "" &&
      updateProfile.soDt !== "" &&
      updateProfile.hoTen !== "" &&
      updateProfile.maLoaiNguoiDung !== "" &&
      regexPhone.test(updateProfile.soDt) &&
      updateProfile.matKhau === updateProfile.xacNhanMK
    ) {
      //alert("ok");
      dispatch(changeUserInFo(updateProfile));
      console.log(updateProfile);
      handleClose();
    }
  }

  return (
    <div className="profile">
      <h3>Thông Tin Cá Nhân</h3>
      <div className="profile__content">
        <div className="profile__content__left">
          <div className="avatar">
            <img src="/images/avatardefault.png" alt="avatar user" />
          </div>

          <div>
            <p className="profile__content--name">{profile.hoTen}</p>
          </div>
        </div>

        <div className="profile__content__right">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className={classes.tableCell} align="center">
                    Tài Khoản
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    Email
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    Số Điện Thoại
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    Họ Tên
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    Mã nhóm
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    Loại người dùng
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    Sửa
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell className={classes.tableCell} align="center">
                    {profile.taiKhoan}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    {profile.email}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    {profile.soDT}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    {profile.hoTen}
                  </StyledTableCell>

                  <StyledTableCell className={classes.tableCell} align="center">
                    {profile.maNhom}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    {profile.maLoaiNguoiDung}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    <i
                      onClick={() => {
                        handleOpen();
                      }}
                      class="fa fa-edit"
                    ></i>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 className={classes.title}>Cập nhật người dùng</h2>
                <form
                  className={classes.root}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-taiKhoan">
                      Tài khoản
                    </InputLabel>
                    <Input
                      id="standard-adornment-taiKhoan"
                      value={updateProfile.taiKhoan}
                      disabled
                    />

                    <p className={classes.error}>{error.taiKhoan}</p>
                  </FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-matKhau">
                      Mật khẩu
                    </InputLabel>
                    <Input
                      id="standard-adornment-matKhau"
                      type={updateProfile.showPassword ? "text" : "password"}
                      value={updateProfile.matKhau}
                      onChange={handleChange("matKhau")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {updateProfile.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <p className={classes.error}>{error.matKhau}</p>
                  </FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-xacNhanMK">
                      Nhập lại mật khẩu
                    </InputLabel>
                    <Input
                      id="standard-adornment-xacNhanMK"
                      type={updateProfile.showPassword ? "text" : "password"}
                      value={updateProfile.xacNhanMK}
                      onChange={handleChange("xacNhanMK")}
                      error={error.xacNhanMK}
                      helperText={error.xacNhanMK}
                    />
                    <p className={classes.error}>{error.xacNhanMK}</p>
                  </FormControl>

                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-hoTen">
                      Họ tên
                    </InputLabel>
                    <Input
                      id="standard-adornment-hoTen"
                      value={updateProfile.hoTen}
                      onChange={handleChange("hoTen")}
                    />
                    <p className={classes.error}>{error.hoTen}</p>
                  </FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-soDt">
                      Số điện thoại
                    </InputLabel>
                    <Input
                      id="standard-adornment-soDt"
                      value={updateProfile.soDt}
                      onChange={handleChange("soDt")}
                    />
                    <p className={classes.error}>{error.soDt}</p>
                  </FormControl>

                  <div className={classes.divBtn}>
                    <Button
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Thoát
                    </Button>
                    <Button
                      type="submit"
                      style={{ marginLeft: "10px" }}
                      color="primary"
                      variant="contained"
                    >
                      Cập nhật
                    </Button>
                  </div>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}
