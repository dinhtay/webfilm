import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
import { useDispatch } from "react-redux";
import { registerRequest } from "../../redux/actions/user.action";
import valadateInfo from "./validateInfo";
import { NavLink, useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <NavLink color="inherit" exact to="/">
        TTMovie
      </NavLink>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginRight: theme.spacing(18),
  },
  formControlright: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    taiKhoan: "",
    matKhau: "",
    xacNhanMK: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [userSignup, setUserSignup] = useState({
    taiKhoan: "",
    matKhau: "",
    xacNhanMK: "",
    email: "",
    soDt: "",
    maNhom: "GP08",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  // bắt sự kiện
  function handleChange(event) {
    const { name, value } = event.target;
    setUserSignup({
      ...userSignup,
      [name]: value,
    });
  }
  // end
  const resetForm = () => {
    setUserSignup({
      taiKhoan: "",
      matKhau: "",
      xacNhanMK: "",
      email: "",
      soDt: "",
      maNhom: "GP08",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    });
  };
  // submit
  function handleSubmit(event) {
    let regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let email = /^([\w\.])+@([a-zA-Z0-9\-])+\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
    event.preventDefault();
    setError(valadateInfo(userSignup));
    if (
      userSignup.taiKhoan !== "" &&
      userSignup.taiKhoan.length > 5 &&
      userSignup.matKhau.length > 5 &&
      userSignup.matKhau !== "" &&
      userSignup.email !== "" &&
      userSignup.xacNhanMK !== "" &&
      userSignup.soDt !== "" &&
      userSignup.hoTen !== "" &&
      email.test(userSignup.email) &&
      regexPhone.test(userSignup.soDt) &&
      userSignup.matKhau === userSignup.xacNhanMK
    ) {
      dispatch(registerRequest(userSignup, history));
      resetForm();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="taiKhoan"
                variant="outlined"
                required
                onChange={handleChange}
                fullWidth
                id="taiKhoan"
                label="Tên Tài khoản"
                autoFocus
                value={userSignup.taiKhoan}
                error={error.taiKhoan}
                helperText={error.taiKhoan}
              />

              {/* {error.taiKhoan && <span>{error.taiKhoan}</span>} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={userSignup.matKhau}
                id="matKhau"
                label="Mật khẩu"
                name="matKhau"
                type="password"
                autoComplete="lname"
                error={error.matKhau}
                helperText={error.matKhau}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={userSignup.xacNhanMK}
                id="xacNhanMK"
                label="Xác nhận mật khẩu"
                name="xacNhanMK"
                type="password"
                autoComplete="lname"
                error={error.xacNhanMK}
                helperText={error.xacNhanMK}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={userSignup.hoTen}
                variant="outlined"
                required
                fullWidth
                name="hoTen"
                label="Họ tên"
                id="hoTen"
                autoComplete="current-password"
                error={error.hoTen}
                helperText={error.hoTen}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleChange}
                value={userSignup.email}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={error.email}
                helperText={error.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleChange}
                value={userSignup.soDt}
                fullWidth
                name="soDt"
                label="Số điện thoại"
                id="soDT"
                autoComplete="current-password"
                error={error.soDt}
                helperText={error.soDt}
              />
            </Grid>

            {/* <FormControl sm={6} className={classes.formControl}>
              <InputLabel id="maNhom">Id Group</InputLabel>
              <Select
                labelId="maNhom"
                name="maNhom"
                id="maNhom"
                onChange={handleChange}
                value={userSignup.maNhom}
                error={error.maNhom}
                helperText={error.maNhom}
              >
                <MenuItem value="">
                  <em>Select Group</em>
                </MenuItem>
                <MenuItem value="GP01">GP01</MenuItem>
              </Select>
            </FormControl> */}
            {/* <FormControl sm={6} className={classes.formControlright}>
              <InputLabel id="maLoaiNguoiDung">User Type Id</InputLabel>
              <Select
                labelId="maLoaiNguoiDung"
                id="maLoaiNguoiDung"
                name="maLoaiNguoiDung"
                onChange={handleChange}
                value={userSignup.maLoaiNguoiDung}
                error={error.maLoaiNguoiDung}
                helperText={error.maLoaiNguoiDung}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                <MenuItem name="maLoaiNguoiDung" value="KhachHang">
                  KhachHang
                </MenuItem>
              </Select>
            </FormControl> */}
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Tôi đồng ý các diều khoản của TTMovie"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng ký
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs>
              <NavLink exact to="/" variant="body2">
                Back
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink exact to="/sign-in" variant="body2">
                {" Bạn đã có Tài khoản?   Đăng nhập"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
