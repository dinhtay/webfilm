import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Select, MenuItem, Button, TextField } from "@material-ui/core";

import clsx from "clsx";
import { FormControl, InputLabel, Input } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { fetchFilm } from "../../../redux/actions/film.action";
import { createShowtime } from "../../../redux/actions/admin.action";
import validationShowtime from "./validationShowtime";

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
      fontSize: "12px",
    },
  },
  btnList: {
    border: "1px solid #3e515d",
    color: "#3e515d",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
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

export default function ModalCreateShowTime(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let dateFormat = require("dateformat");
  const movieList = useSelector((state) => state.filmReducer.movieList);
  const [openCreate, setOpenCreate] = useState(false);
  useEffect(() => {
    dispatch(fetchFilm());
  }, []);
  const [values, setValues] = useState({
    maPhim: +"",
    maRap: props.maRap,
    ngayChieuGioChieu: dateFormat("", "dd/mm/yyyy HH:mm:ss"),
    giaVe: +"",
  });
  const [error, setError] = useState({
    maPhim: "",
    ngayChieuGioChieu: "",
    giaVe: "",
  });

  //Reset Form

  const resetForm = () => {
    setValues({
      maPhim: +"",
      maRap: props.maRap,
      ngayChieuGioChieu: dateFormat("", "dd/mm/yyyy HH:mm:ss"),
      giaVe: +"",
    });
  };

  //---Show hide pass--

  const handleOpen = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    resetForm();
  };

  //Dom data
  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  const renderListFilm = () => {
    return movieList?.map((movie, index) => {
      return (
        <MenuItem value={movie.maPhim} key={index}>
          {movie.tenPhim}
        </MenuItem>
      );
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setError(validationShowtime(values));
    if (
      values.maPhim !== "" &&
      values.ngayChieuGioChieu !== "" &&
      values.giaVe !== "" &&
      values.giaVe >= 70000
    ) {
      dispatch(createShowtime(values));
      console.log(values);
      handleCloseCreate();
      props.handleClose();
      resetForm();
    }
  }

  return (
    <div>
      <Button
        className={classes.btnList}
        onClick={() => {
          handleOpen();
          setValues({
            maPhim: +"",
            maRap: props.maRap,
            ngayChieuGioChieu: dateFormat("", "dd/mm/yyyy hh:mm:ss"),
            giaVe: +"",
          });
        }}
      >
        Tạo
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openCreate}
        onClose={handleCloseCreate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openCreate}>
          <div className={classes.paper}>
            <h2 className={classes.title}>
              Tạo lịch chiếu - Rạp {props.maRap}
            </h2>
            <form className={classes.root} onSubmit={handleSubmit} noValidate>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-taiKhoan">
                  Mã Rạp
                </InputLabel>
                <Input
                  id="standard-adornment-taiKhoan"
                  value={values.maRap}
                  disabled
                />
              </FormControl>

              <FormControl className={classes.divInput}>
                <InputLabel id="demo-simple-select-maLoai">Tên phim</InputLabel>
                <Select
                  labelId="demo-simple-select-maLoai"
                  id="demo-simple-select"
                  value={values.maPhim}
                  name="maPhim"
                  onChange={handleChange}
                >
                  {renderListFilm()}
                </Select>

                <p className={classes.error}>{error.maPhim}</p>
              </FormControl>
              <FormControl className={classes.divInput}>
                <TextField
                  id="datetime-local"
                  label="Ngày chiếu - Giờ chiếu"
                  type="datetime-local"
                  //defaultValue="2020-02-02T02:02"
                  name="ngayChieuGioChieu"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <p className={classes.error}>{error.ngayChieuGioChieu}</p>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.divInput)}>
                <InputLabel htmlFor="standard-adornment-taiKhoan">
                  Giá vé
                </InputLabel>
                <Input
                  id="standard-adornment-taiKhoan"
                  value={values.giaVe}
                  name="giaVe"
                  onChange={handleChange}
                />
                <p className={classes.error}>{error.giaVe}</p>
              </FormControl>
              <div className={classes.divBtn}>
                <Button
                  onClick={() => {
                    handleCloseCreate();
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
                  Tạo
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
