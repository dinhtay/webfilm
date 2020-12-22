import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Select, MenuItem, Button } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import validation from "./validation";
import { addUser, fetchUserPage } from "../../../redux/actions/admin.action";

const useStyles = makeStyles((theme) => ({
  modal: {
    overflowY: "scroll",
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
  btnAdd: {
    width: "100%",
    height: "50px",
    border: "2px solid #30a5ff",
    color: "#30a5ff",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
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

export default function ModalAdd(props) {
  const { page } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   dispatch(fetchUserPage(page));
  // }, [page]);
  const [values, setValues] = useState({
    taiKhoan: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "",
    hoTen: "",
    matKhau: "",
    xacNhanMatKhau: "",
    maNhom: "GP08",
    showPassword: false,
  });
  const [error, setError] = useState({
    taiKhoan: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "",
    hoTen: "",
    matKhau: "",
    xacNhanMatKhau: "",
  });

  //---Show hide pass---
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Reset Form

  const resetForm = () => {
    setValues({
      taiKhoan: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
      matKhau: "",
      xacNhanMatKhau: "",
      maNhom: "GP08",
      showPassword: false,
    });
  };

  //---Show hide pass--

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  // Bắt sự kiện
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    let regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let email = /^([\w\.])+@([a-zA-Z0-9\-])+\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
    event.preventDefault();
    setError(validation(values));
    if (
      values.taiKhoan !== "" &&
      values.taiKhoan.length > 5 &&
      values.matKhau.length > 5 &&
      values.matKhau !== "" &&
      values.email !== "" &&
      values.xacNhanMatKhau !== "" &&
      values.soDt !== "" &&
      values.hoTen !== "" &&
      values.maLoaiNguoiDung !== "" &&
      email.test(values.email) &&
      regexPhone.test(values.soDt) &&
      values.matKhau === values.xacNhanMatKhau
    ) {
      dispatch(addUser(values, page));
      console.log(values);
      handleClose();
      resetForm();
    }
  }

  return (
    <div>
      <button type="button" className={classes.btnAdd} onClick={handleOpen}>
        <i className="fa fa-plus"></i> Thêm người dùng
      </button>
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
            <h2 className={classes.title}>Thêm người dùng</h2>
            <form className={classes.root} onSubmit={handleSubmit} noValidate>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-taiKhoan">
                  Tài khoản
                </InputLabel>
                <Input
                  id="standard-adornment-taiKhoan"
                  value={values.taiKhoan}
                  onChange={handleChange("taiKhoan")}
                />
                <p className={classes.error}>{error.taiKhoan}</p>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-matKhau">
                  Mật khẩu
                </InputLabel>
                <Input
                  id="standard-adornment-matKhau"
                  type={values.showPassword ? "text" : "password"}
                  value={values.matKhau}
                  onChange={handleChange("matKhau")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <p className={classes.error}>{error.password}</p>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-xacNhanMatKhau">
                  Nhập lại mật khẩu
                </InputLabel>
                <Input
                  id="standard-adornment-xacNhanMatKhau"
                  type={values.showPassword ? "text" : "password"}
                  value={values.xacNhanMatKhau}
                  onChange={handleChange("xacNhanMatKhau")}
                />
                <p className={classes.error}>{error.xacNhanMatKhau}</p>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-email">
                  Email
                </InputLabel>
                <Input
                  id="standard-adornment-email"
                  value={values.email}
                  onChange={handleChange("email")}
                />
                <p className={classes.error}>{error.email}</p>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-hoTen">
                  Họ tên
                </InputLabel>
                <Input
                  id="standard-adornment-hoTen"
                  value={values.hoTen}
                  onChange={handleChange("hoTen")}
                />
                <p className={classes.error}>{error.hoTen}</p>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-soDt">
                  Số điện thoại
                </InputLabel>
                <Input
                  id="standard-adornment-soDt"
                  value={values.soDt}
                  onChange={handleChange("soDt")}
                />
                <p className={classes.error}>{error.soDt}</p>
              </FormControl>
              <FormControl className={classes.divInput}>
                <InputLabel id="demo-simple-select-maLoai">
                  Mã loại người dùng
                </InputLabel>
                <Select
                  labelId="demo-simple-select-maLoai"
                  id="demo-simple-select"
                  value={values.maLoaiNguoiDung}
                  onChange={handleChange("maLoaiNguoiDung")}
                >
                  <MenuItem value="KhachHang">Khách hàng</MenuItem>
                  <MenuItem value="QuanTri">Quản trị</MenuItem>
                </Select>
                <p className={classes.error}>{error.maLoaiNguoiDung}</p>
              </FormControl>
              <div className={classes.divBtn}>
                <Button
                  onClick={() => {
                    handleClose();
                    resetForm();
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
                  Thêm mới
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
