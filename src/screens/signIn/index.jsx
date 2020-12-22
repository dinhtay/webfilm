import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "./useForm";
import validateInfo from "./validateInfo";
import "./style.css";
import { NavLink, useHistory } from "react-router-dom";

// /https://www.youtube.com/watch?v=zSt5G3s3OJI
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "600px",
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
  colorRed: {
    //key là thuộc tính của css:value là giá tri của css
    color: "red",
  },
}));

function SignIn() {
  const classes = useStyles();
  //const dispatch = useDispatch(); // ~ this.props.dispatch
  const { handleChange, user, handleSubmit, errors } = useForm(validateInfo);
  const history = useHistory();
  const handleUrl = () => {
    if (errors.length < 0) {
      history.push("/");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* cssBaseline là file css (reset) mặc định */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.colorRed}>
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="taiKhoan"
            label="Tài khoản"
            name="taiKhoan"
            autoComplete="taiKhoan"
            autoFocus
            onChange={handleChange}
          />
          {errors.taiKhoan && <p className="text__error">{errors.taiKhoan}</p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="matKhau"
            label="Mật khẩu"
            type="password"
            id="matKhau"
            autoComplete="current-matKhau"
            onChange={handleChange}
          />
          {errors.matKhau && <p className="text__error">{errors.matKhau}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleUrl}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink exact to="/" variant="body2">
                Back
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink exact to="/sign-up" variant="body2">
                {"Bạn chưa có Tài khoản?  Đăng ký"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default SignIn;
