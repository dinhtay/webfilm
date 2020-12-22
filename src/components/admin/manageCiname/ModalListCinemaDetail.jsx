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
import ModalCreateShowTime from "./ModalCreateShowtime";

const useStyles = makeStyles((theme) => ({
  modal: {
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
  tableCell: {
    padding: "5px",
  },
  cellTitle: {
    fontWeight: "700",
  },
  btnList: {
    border: "1px solid #3e515d",
    color: "#3e515d",
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

export default function ModalListCinemaDetail(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const { cinema } = props;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function renderListCinema() {
    return cinema.danhSachRap?.map((cinema, index) => {
      return (
        <TableRow key={index}>
          <TableCell className={classes.tableCell} align="center">
            {cinema.maRap}
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            {cinema.tenRap}
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            <ModalCreateShowTime
              maRap={cinema.maRap}
              handleClose={handleClose}
            />
          </TableCell>
        </TableRow>
      );
    });
  }

  return (
    <>
      <Button className={classes.btnList} onClick={handleOpen}>
        Danh sách Rạp
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
            <p className={classes.title}>Danh sách Rạp {cinema.tenCumRap}</p>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={(classes.tableCell, classes.cellTitle)}
                      align="center"
                    >
                      Mã Rạp
                    </TableCell>
                    <TableCell
                      className={(classes.tableCell, classes.cellTitle)}
                      align="center"
                    >
                      Tên Rạp
                    </TableCell>
                    <TableCell
                      className={(classes.tableCell, classes.cellTitle)}
                      align="center"
                    >
                      Tạo lịch chiếu
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
