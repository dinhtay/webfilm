import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextareaAutosize, TextField, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { addFilm } from "../../../redux/actions/admin.action";
import validationFilm from "./validationFilm";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    width: "50%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50%",
  },
  form:{

    [theme.breakpoints.down("sm")]: {
      height:"400px",
    
      overflowY:"scroll",
    },
  },
  title: {
    textAlign: "center",
    color: "#4a90e2",
  },
  divInput: {
    width: "95%",
    margin: "2% 0%",
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
  label: {
    color: "#777777",
  },
}));

export default function AddFilm(props) {
  const { page } = props;
  const classes = useStyles();
  let dateFormat = require("dateformat");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };
  const [uploadImg, setUploadImg] = useState({});

  const [imgBase64, setImgBase64] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
  );
  const [values, setValues] = useState({
    maPhim: +"",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    hinhAnh: uploadImg,
    maNhom: "GP09",
    ngayKhoiChieu: dateFormat("", "dd/mm/yyyy"),
    danhGia: 10,
  });

  const [error, setError] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    hinhAnh: "",
    ngayKhoiChieu: "",
  });

  const resetForm = () => {
    setUploadImg({});
    setError("");
    setImgBase64(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
    );
    setValues({
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      moTa: "",
      hinhAnh: uploadImg,
      maNhom: "GP09",
      ngayKhoiChieu: dateFormat("", "dd/mm/yyyy"),
      danhGia: 10,
    });
  };

  //Dom data
  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  //Dom data file image
  function handleFile(event) {
    setValues({
      ...values,
      hinhAnh: event.target.files[0],
    });
    setUploadImg(event.target.files[0]);
    convertBase64(event.target.files[0]);
  }

  function convertBase64(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let base64 = fileReader.result;
      setImgBase64(base64);
    };
  }

  function handleSubmit(event) {
    let regexNumber = /^[0-9]+$/;

    event.preventDefault();
    setError(validationFilm(values));
    if (
      regexNumber.test(values.maPhim) &&
      values.maPhim.length > 3 &&
      values.tenPhim !== "" &&
      values.biDanh !== "" &&
      values.trailer !== "" &&
      values.hinhAnh.name.match(/\.(jpg|png|gif)$/) &&
      values.moTa !== "" &&
      values.ngayKhoiChieu !== ""
    ) {
      // console.log(values);
      const frm = new FormData();
      for (let key in values) {
        frm.append(key, values[key]);
        console.log(key + ":", values[key]);
      }
      // console.log("frm: ", frm);
      dispatch(addFilm(frm, page));
      handleClose();
      resetForm();
    }
  }
  return (
    <div>
      <button type="button" className={classes.btnAdd} onClick={handleOpen}>
        <i className="fa fa-plus"></i> Thêm Phim
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
            <h2 className={classes.title}>Thêm Phim</h2>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-maPhim">
                      Mã phim
                    </InputLabel>
                    <Input
                      id="standard-adornment-maPhim"
                      value={values.maPhim}
                      name="maPhim"
                      onChange={handleChange}
                    />

                    <p className={classes.error}>{error.maPhim}</p>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-tenPhim">
                      Tên phim
                    </InputLabel>
                    <Input
                      id="standard-adornment-tenPhim"
                      value={values.tenPhim}
                      name="tenPhim"
                      onChange={handleChange}
                    />
                    <p className={classes.error}>{error.tenPhim}</p>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-biDanh">
                      Bí danh
                    </InputLabel>
                    <Input
                      id="standard-adornment-biDanh"
                      value={values.biDanh}
                      name="biDanh"
                      onChange={handleChange}
                    />
                    <p className={classes.error}>{error.biDanh}</p>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <InputLabel htmlFor="standard-adornment-trailer">
                      Trailer
                    </InputLabel>
                    <Input
                      placeholder="Vui lòng nhập link.."
                      id="standard-adornment-trailer"
                      value={values.trailer}
                      name="trailer"
                      onChange={handleChange}
                    />
                    <p className={classes.error}>{error.trailer}</p>
                  </FormControl>
                </Grid>
                <Grid item xs={7}>
                  <FormControl
                    className={clsx(classes.margin, classes.divInput)}
                  >
                    <label
                      className={classes.label}
                      htmlFor="standard-adornment-hinhAnh"
                    >
                      Hình ảnh
                    </label>

                    <input
                      type="file"
                      name="hinhAnh"
                      id="standard-adornment-hinhAnh"
                      onChange={handleFile}
                    />
                    <p className={classes.error}>{error.hinhAnh}</p>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <img style={{ width: "50%" }} src={imgBase64} alt="demo" />
                </Grid>
                <FormControl className={clsx(classes.margin, classes.divInput)}>
                  <label
                    className={classes.label}
                    htmlFor="standard-adornment-moTa"
                  >
                    Mô tả
                  </label>
                  <TextareaAutosize
                    id="standard-adornment-moTa"
                    aria-label="empty textarea"
                    value={values.moTa}
                    name="moTa"
                    onChange={handleChange}
                    rowsMin={2}
                    placeholder="Nhập mô tả Phim.."
                  />
                  <p className={classes.error}>{error.moTa}</p>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.divInput)}>
                  <label
                    className={classes.label}
                    htmlFor="standard-adornment-ngayKhoiChieu"
                  >
                    Ngày khởi chiếu
                  </label>

                  <TextField
                    id="standard-adornment-ngayKhoiChieu"
                    type="date"
                    //  value={values.ngayKhoiChieu}
                    defaultValue="02/02/2020"
                    format="dd/MM/yyyy"
                    className={classes.textField}
                    name="ngayKhoiChieu"
                    //onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <p className={classes.error}>{error.ngayKhoiChieu}</p>
                </FormControl>
              </Grid>
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
