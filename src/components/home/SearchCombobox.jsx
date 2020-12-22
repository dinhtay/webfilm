import React, { useCallback, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import fomat from "dateformat";
import Swal from "sweetalert2";

import { fetchFilm, fetchFilmShowTime } from "../../redux/actions/film.action";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import Booking from "../../screens/booking";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "18%",
    margin: "1%",
    marginTop: "0",
    zIndex: "10",
    [theme.breakpoints.down("sm")]: {
      width: "44%",
      margin: "0% 3%",
      fontSize: 13,
    },
  },
  formControlButton: {
    margin: theme.spacing(1),
    width: "18%",
    margin: "1%",
    marginTop: "0",
    zIndex: "10",
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      margin: "2% 3%",
    },
  },
  label: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  optionValue: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export default function SearchCombobox() {
  const listFilm = useSelector((state) => state.filmReducer.movieList);

  const nameTheater = useSelector(
    (state) => state.cinemaReducer.cinemaShowTimes
  );

  // const selectFilm = ({ listFilm }) => {};

  const dispatch = useDispatch();

  // chạy sau hàm render khi input thây đổi
  const [nameFilm, setNameFilm] = useState({
    maPhim: "",
    maRap: "",
    /*  maLichChieu: "", */
    ngayChieu: "",
    suat: "",
    maLichChieu: "",
  });

  // lấy dữ liệu
  useEffect(() => {
    dispatch(fetchFilm());
  }, []);

  useEffect(() => {
    dispatch(fetchFilmShowTime(nameFilm.maPhim));
  }, [nameFilm.maPhim]);

  const renderFilm = () => {
    return listFilm.map((film, index) => {
      return (
        <option value={film.maPhim} key={index}>
          {film.tenPhim}
        </option>
      );
    });
  };
  const renderTheater = () => {
    if (nameFilm.maPhim !== "") {
      return nameTheater.map((cinema) => {
        return cinema.cumRapChieu.map((cinema, index) => {
          return (
            <option value={cinema.maCumRap} key={index}>
              {cinema.tenCumRap}
            </option>
          );
        });
      });
    } else {
      return <option>Yêu cầu chọn tên phim</option>;
    }
  };

  const renderDate = () => {
    if (nameFilm.maRap !== "") {
      return nameTheater.map((cinema) => {
        return cinema.cumRapChieu.map((cinema) => {
          if (nameFilm.maRap === cinema.maCumRap) {
            return cinema.lichChieuPhim.map((cinema, index) => {
              return (
                <option
                  value={fomat(cinema.ngayChieuGioChieu, "dd-MM-yyyy")}
                  key={index}
                >
                  {fomat(cinema.ngayChieuGioChieu, "dddd,dd-MM-yyyy")}
                </option>
              );
            });
          }
        });
      });
    } else {
      return <option>Yêu cầu chọn rạp chiếu</option>;
    }
  };

  const renderShowtimes = () => {
    if (nameFilm.ngayChieu !== "") {
      return nameTheater.map((cinema) => {
        return cinema.cumRapChieu.map((cinema) => {
          if (nameFilm.maRap === cinema.maCumRap) {
            return cinema.lichChieuPhim.map((cinema, index) => {
              return (
                <option value={cinema.maLichChieu} key={index}>
                  {fomat(cinema.ngayChieuGioChieu, "h:MM:ss TT")}
                </option>
              );
            });
          }
        });
      });
    } else {
      return <option>Yêu cầu chọn rạp chiếu</option>;
    }
  };
  const classes = useStyles();
  const handleSubmit = (event) => {};

  const handleChangeFilm = (event) => {
    const { value } = event.target;
    setNameFilm({
      ...nameFilm,
      maPhim: value,
    });
  };
  const handleChangeTheater = (event) => {
    const { value } = event.target;
    setNameFilm({
      ...nameFilm,
      maRap: value,
    });
  };
  const handleChangeDate = (event) => {
    let { value } = event.target;
    setNameFilm({
      ...nameFilm,
      ngayChieu: value,
    });
  };

  const handleShowTimes = (event) => {
    let { value } = event.target;
    setNameFilm({
      ...nameFilm,
      maLichChieu: value,
    });
  };

  // console.log("đặt vé", nameFilm);
  return (
    <div className="swiper-tabs">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          className={classes.label}
          htmlFor="outlined-age-native-simple"
        >
          Tên Phim
        </InputLabel>
        <Select
          className={classes.optionValue}
          native
          label="Tên Phim"
          onChange={handleChangeFilm}
          autoWidth
          active
        >
          <option aria-label="None" value="" />
          {renderFilm()}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          className={classes.label}
          htmlFor="outlined-age-native-simple"
        >
          Rạp Chiếu
        </InputLabel>
        <Select
          className={classes.optionValue}
          native
          onChange={handleChangeTheater}
          label="Rạp Chiếu"
        >
          <option aria-label="None" value="" />
          {renderTheater()}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          className={classes.label}
          htmlFor="outlined-age-native-simple"
        >
          Ngày Xem
        </InputLabel>
        <Select
          className={classes.optionValue}
          native
          onChange={handleChangeDate}
          label="Ngày Xem"
        >
          <option aria-label="None" value="" />
          {renderDate()}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          className={classes.label}
          htmlFor="outlined-age-native-simple"
        >
          Xuất Chiếu
        </InputLabel>
        <Select
          className={classes.optionValue}
          native
          label="Xuất Chiếu"
          onChange={handleShowTimes}
        >
          <option aria-label="None" value="" />
          {renderShowtimes()}
        </Select>
      </FormControl>
      <FormControl className={classes.formControlButton}>
        {nameFilm.maLichChieu ? (
          <Link
            className="swipter-tabs__link"
            to={`/booking/${nameFilm.maLichChieu}`}
          >
            Mua Vé Ngay
          </Link>
        ) : (
          <button
            onClick={() => {
              Swal.fire({
                icon: "warning",
                title: "Vui lòng chọn đủ thông tin  ",
              });
            }}
            className="swipter-tabs__link"
          >
            Mua Vé Ngay
          </button>
        )}
      </FormControl>
    </div>
  );
}
