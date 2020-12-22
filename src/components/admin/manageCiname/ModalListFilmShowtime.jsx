import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectedIdCinema } from "../../../redux/actions/cinema.action";
import ModalTime from "./ModalTime";

const useStyles = makeStyles((theme) => ({
  modal: {    overflowY:"scroll",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  
  },
  paper: {

    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: theme.spacing(2),
    },
  },
  tableContainer:{
    height:"500px",
    [theme.breakpoints.down("sm")]: {
      height:"400px"
    },
  },
  tableCell: {
    padding: "5px",
    width: "30%",
  },
  tableCellDetail: {
    padding: "5px",
    width: "40%",
  },
  cellTitle: {
    fontWeight: "700",
  },
  btnList: {
    border: "1px solid #964040",
    color: "#964040",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },

  table: {
    height: "80%",
    overflowY: "scroll",
  },
  title: {
    textAlign: "center",
    color: "#4a90e2",
    fontSize: "18px",
  },
}));

export default function ModalListFilmShowtime(props) {
  const classes = useStyles();
  const movieFowllowCinema = useSelector(
    (state) => state.cinemaReducer.movieFowllowCinema
  );
  const selectedCinema = useSelector(
    (state) => state.cinemaReducer.selectedCinema
  );
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let arrFilm = movieFowllowCinema.filter(
    (movie) => movie.maCumRap === selectedCinema
  );

  function renderListCinema() {
    if (arrFilm.length < 1) {
      return (
        <TableRow>
          <TableCell colSpan="3" className={classes.tableCell} align="center">
            <p
              style={{
                fontSize: "14px",
                fontWeight: " 600",
              }}
            >
              Rạp chưa có lịch chiếu !!!
            </p>
          </TableCell>
        </TableRow>
      );
    }
    return arrFilm?.map((movie) => {
      return movie.danhSachPhim?.map((item, index) => {
        return (
          <TableRow>
            <TableCell className={classes.tableCell} align="center">
              {item.tenPhim}
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              <img style={{ width: "25%" }} src={item.hinhAnh} alt="film" />
            </TableCell>
            <TableCell className={classes.tableCellDetail} align="center">
              <ModalTime showTime={item.lstLichChieuTheoPhim} />
            </TableCell>
          </TableRow>
        );
      });
    });
  }

  return (
    <>
      <Button
        className={classes.btnList}
        onClick={() => {
          handleOpen();
          dispatch(selectedIdCinema(props.maRap));
        }}
      >
        Phim Chiếu
      </Button>
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
            <p className={classes.title}>Danh sách phim Chiếu</p>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={(classes.tableCell, classes.cellTitle)}
                      align="center"
                    >
                      Tên phim
                    </TableCell>
                    <TableCell
                      className={(classes.tableCell, classes.cellTitle)}
                      align="center"
                    >
                      Hình ảnh
                    </TableCell>
                    <TableCell
                      className={(classes.tableCellDetail, classes.cellTitle)}
                      align="center"
                    >
                      Xem chi tiết xuất chiếu
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> {renderListCinema()}</TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
