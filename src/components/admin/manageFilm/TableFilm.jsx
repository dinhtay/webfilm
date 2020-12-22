import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import ModalTrailer from "./ModalTrailer";
import { deleteFilm, resetNotify } from "../../../redux/actions/admin.action";
import { fetchFilmFollowPage } from "../../../redux/actions/film.action";
import UpdateFilm from "./UpdateFilm";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4a90e2",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  body: {
    fontSize: 13,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
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
  tablecontainer: {
    width: "100%",
  },
  table: {
    width: "90%",
    marginLeft: "5%",
  },
  btnHistory: {
    border: "1px solid #00ac4d",
    color: "#00ac4d",
  },
  tableCell: {
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
      marginLeft: "2px",
      width: "20%",
      textAlign: "center",
      border: "1px solid #fff",
    },
  },
  tableCellBanner: {
    width: "20%",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
      marginLeft: "2px",
      width: "35%",
      textAlign: "center",
      border: "1px solid #fff",
    },
  },
  tableCellMoTa: {
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
      marginLeft: "2px",
      width: "35%",
      textAlign: "left",
      border: "1px solid #fff",
    },
  },
  bannerFilm: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "98%",
    },
  },
  btnDelete: {
    border: "1px solid #f7b500",
    color: "#f7b500",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },
}));

function TableFilm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let dateFormat = require("dateformat");
  const { movieList } = props;
  const { search } = props;
  const { page } = props;

  const renderFilmSearch = () => {
    return search?.map((movie, index) => {
      return (
        <StyledTableRow key={index}>
          <StyledTableCell
            className={classes.tableCell}
            component="th"
            scope="row"
          >
            {movie.maPhim}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            {movie.tenPhim}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            {movie.biDanh}
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCellBanner}
            // className="manageCinema__img"

            align="center"
          >
            <img
              className={classes.bannerFilm}
              src={movie.hinhAnh}
              alt="poster"
            />
            {/* <div className="manageCinema__img__full">
              <img src={movie.hinhAnh} alt="poster" />
            </div> */}
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCellMoTa}
            className="manageCinema__discrible"
            align="left"
          >
            {movie.moTa.slice(0, 50) + "..."}
            <div className="manageCinema__discrible__full">
              <p>{movie.moTa}</p>
            </div>
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            <ModalTrailer trailer={movie.trailer} />
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCell}
            align="center"
            style={{ width: "10%" }}
          >
            {dateFormat(movie.ngayChieuGioChieu, "dd-mm-yyyy")}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            {movie.danhGia}
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCell}
            style={{ width: "15%" }}
            align="center"
          >
            <UpdateFilm movie={movie} page={page} />
            <Button
              className={classes.btnDelete}
              onClick={() => {
                dispatch(deleteFilm(parseInt(movie.maPhim)));
                dispatch(fetchFilmFollowPage(page));
              }}
            >
              Xóa
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  const renderListFilm = () => {
    return movieList.items?.map((movie, index) => {
      return (
        <StyledTableRow key={index}>
          <StyledTableCell
            className={classes.tableCell}
            component="th"
            scope="row"
          >
            {movie.maPhim}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            {movie.tenPhim}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            {movie.biDanh}
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCellBanner}
            //className="manageCinema__img"

            align="center"
          >
            <img
              className={classes.bannerFilm}
              src={movie.hinhAnh}
              alt="poster"
            />
            {/* <div className="manageCinema__img__full">
              <img src={movie.hinhAnh} alt="poster" />
            </div> */}
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCellMoTa}
            className="manageCinema__discrible"
            align="left"
          >
            {movie.moTa.slice(0, 50) + "..."}
            <div className="manageCinema__discrible__full">
              <p>{movie.moTa}</p>
            </div>
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            <ModalTrailer trailer={movie.trailer} />
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCell}
            align="center"
            style={{ width: "10%" }}
          >
            {dateFormat(movie.ngayKhoiChieu, "dd-mm-yyyy")}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="center">
            {movie.danhGia}
          </StyledTableCell>
          <StyledTableCell
            className={classes.tableCell}
            style={{ width: "15%" }}
            align="center"
          >
            <UpdateFilm movie={movie} page={page} />
            <Button
              className={classes.btnDelete}
              onClick={() => {
                dispatch(deleteFilm(parseInt(movie.maPhim)));
                dispatch(fetchFilmFollowPage(page));
              }}
            >
              Xóa
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  if (search.length > 0) {
    return (
      <div>
        <TableContainer className={classes.tablecontainer}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.tableCell} align="center">
                  Mã phim
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  Tên phim
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  Bí danh
                </StyledTableCell>
                <StyledTableCell
                  className={classes.tableCellBanner}
                  align="center"
                >
                  Hình ảnh
                </StyledTableCell>
                <StyledTableCell
                  className={classes.tableCellMoTa}
                  align="center"
                >
                  Mô tả
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  Trailer
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  Ngày chiếu
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  Đánh giá
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  Chức năng
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderFilmSearch()}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return (
    <div>
      <TableContainer className={classes.tablecontainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableCell} align="center">
                Mã phim
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Tên phim
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Bí danh
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Hình ảnh
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Mô tả
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Trailer
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Ngày chiếu
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Đánh giá
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="center">
                Chức năng
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderListFilm()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default TableFilm;
