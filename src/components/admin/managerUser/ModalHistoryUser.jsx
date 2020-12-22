import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchInFoBooking } from "../../../redux/actions/user.action";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    width: "60%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: theme.spacing(2),
    },
  },
  btnHistory: {
    border: "1px solid #964040",
    color: "#964040",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },
  divBtn: {
    marginTop: "3%",
  },
  title: {
    textAlign: "center",
    color: "#4a90e2",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
    },
  },
  imgNoData: {
    width: "10%",
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
  },
  tableCell: {
    [theme.breakpoints.down("sm")]: {
      width: "15%",
      padding: "5px 2px",
      border: "1px solid #fff",
    },
  },
}));

export default function ModalHistoryUser(props) {
  const classes = useStyles();
  const { user } = props;
  const [open, setOpen] = React.useState(false);
  const infoUser = useSelector((state) => state.userReducer.userInfoBooking);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const renderInfo = () => {
    let dateFormat = require("dateformat");
    if (infoUser.length > 0) {
      return infoUser.map((phim) => {
        return (
          <StyledTableRow>
            <StyledTableCell className={classes.tableCell} align="left">
              {phim.maVe}
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="left">
              {phim.tenPhim}
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="left">
              {dateFormat(phim.ngayDat, "dd-mm-yyyy")}
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="left">
              {phim.giaVe}
            </StyledTableCell>
          </StyledTableRow>
        );
      });
    }
    return (
      <StyledTableCell className={classes.tableCell} colSpan="7" align="left">
        <img
          className={classes.imgNoData}
          src="/images/noData.png"
          alt="No Data"
        />
        <p>Không có dữ liệu !!!</p>
      </StyledTableCell>
    );
  };
  const renderInfoBooking = () => {
    let dateFormat = require("dateformat");
    if (infoUser.length > 0) {
      return infoUser.map((phim) => {
        return phim.danhSachGhe.map((ghe) => {
          return (
            <StyledTableRow>
              <StyledTableCell className={classes.tableCell} align="left">
                {phim.maVe}
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                {phim.tenPhim}
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                {dateFormat(phim.ngayDat, "dd-mm-yyyy")}
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                {phim.giaVe}
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                {ghe.tenHeThongRap}
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                {ghe.tenRap}
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                {ghe.tenGhe}
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      });
    }

    return (
      <StyledTableCell className={classes.tableCell} colSpan="7" align="center">
        <img
          className={classes.imgNoData}
          src="/images/noData.png"
          alt="No Data"
        />
        <p>Không có dữ liệu !!!</p>
      </StyledTableCell>
    );
  };
  return (
    <>
      <Button
        className={classes.btnHistory}
        onClick={() => {
          handleOpen();
          dispatch(fetchInFoBooking(user.taiKhoan));
        }}
      >
        Lịch sử
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
            <h2 className={classes.title}>
              Lịch sử đặt vé - Tài khoản {user.taiKhoan}
            </h2>
            <div className={classes.divBtn}>
              <TableContainer className={classes.tablecontainer}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        className={classes.tableCell}
                        align="left"
                      >
                        Mã vé
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableCell}
                        align="left"
                      >
                        Tên phim
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableCell}
                        align="left"
                        style={{ width: "15%" }}
                      >
                        Ngày đặt
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableCell}
                        align="left"
                        style={{ width: "12%" }}
                      >
                        Giá vé
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableCell}
                        align="left"
                      >
                        Tên Rạp
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableCell}
                        align="left"
                      >
                        Phòng
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableCell}
                        align="left"
                        style={{ width: "10%" }}
                      >
                        Số Ghế
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderInfoBooking()}</TableBody>
                </Table>
              </TableContainer>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                Thoát
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
