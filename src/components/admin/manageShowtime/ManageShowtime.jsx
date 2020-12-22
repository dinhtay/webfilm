import React from "react";
import { useSelector } from "react-redux";
import useStyles from "../../../screens/booking/style";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
const useStyleTable = makeStyles((theme) => ({
  container: {
    maxHeight: "450px",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "350px",
    },
  },
  table: {
    overflowY: "scroll",
  },
  tableCell: {
    padding: "5px",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },
  tableCellTitle: {
    padding: "10px",
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },
  tableCellSum: {
    padding: "5px",
    fontWeight: "700",
    coler: "#ad1414",
    fontSize: "18px",
  },
}));
export default function ManageShowtime() {
  const listChair = useSelector((state) => state.bookingReducer.danhSachGhe);
  const classes = useStyles();
  const classestable = useStyleTable();
  let isLoading = useSelector((state) => state.commonReducer.isLoading);
  //Render Ghe
  const renderChair = () => {
    return listChair?.map((ghe, index) => {
      return (
        // <span className="chair--item" key={index}>
        //   <span
        //     style={{ padding: "20%", borderRadius: "5%", cursor: "pointer" }}
        //     className={trangThaiGhe(ghe.daDat, ghe.loaiGhe)}
        //   >
        //     {ghe.tenGhe}
        //   </span>
        // </span>
        <span className={trangThaiGhe(ghe.daDat, ghe.loaiGhe)} key={index}>
          {ghe.tenGhe}
        </span>
      );
    });
  };

  //Xet loai ghe
  const trangThaiGhe = (daDat, type) => {
    if (daDat) return classes.daDat;
    else if (type === "Thuong") return classes.chuaDatGheThuong;
    else return classes.chuaDatGheVip;
  };

  //Render danh sách tài khoản đặt
  const renderTableUserBooking = () => {
    return listChair?.map((user, index) => {
      if (user.daDat) {
        return (
          <TableRow key={index}>
            <TableCell className={classestable.tableCell} align="center">
              {user.tenGhe}
            </TableCell>
            <TableCell className={classestable.tableCell} align="center">
              {user.loaiGhe === "Thuong" ? "Ghế Thường" : "Ghế Vip"}
            </TableCell>
            <TableCell className={classestable.tableCell} align="center">
              {user.taiKhoanNguoiDat}
            </TableCell>
            <TableCell className={classestable.tableCell} align="center">
              {user.giaVe.toLocaleString()}
            </TableCell>
          </TableRow>
        );
      }
    });
  };

  //Tính tổng số ghế đã đặt
  let sumChair = 0;
  const renderSumChairBooked = () => {
    return listChair?.reduce((tongGhe, item) => {
      sumChair = tongGhe += item.daDat;
      return sumChair;
    }, 0);
  };

  //Tính tổng số tiền
  let sumMoney = 0;
  const renderSumMoney = () => {
    return listChair
      ?.reduce((amount, item) => {
        if (item.daDat) {
          sumMoney = amount += item.giaVe;
          return sumMoney;
        }
        return sumMoney;
      }, 0)
      .toLocaleString();
  };
  if (isLoading) {
    return (
      <div className="loadingAdmin">
        <CircularProgress classes="loadingAdmin__icon" />
      </div>
    );
  }

  return (
    <div className="managershowtime dashboard">
      <h1>Quản lý Rạp chiếu</h1>
      <div className="managershowtime__tab">
        <div className="managershowtime__tab__chair">
          <div className="list__chair">
            <div className="namescreen">
              <img src="/images/screen.png" alt />
            </div>
            <div className="list__chair--row">{renderChair()}</div>
          </div>
          <div className="list__chair-typeseat">
            <span className="typeseat colorseat colorvip">Vip</span>
            <span className="typeseat colorseat colordeluxe">Normal</span>
            <span className="typeseat colorseat colornotchosen">
              Ghế đã đặt
            </span>
          </div>
        </div>
        <div className="managershowtime__tab__table">
          <h3>Danh sách tài khoản đã đặt</h3>
          <p>
            Tổng số ghế đã đặt: {renderSumChairBooked()} / {listChair?.length}
          </p>
          <TableContainer className={classestable.container} component={Paper}>
            <Table className={classestable.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classestable.tableCellTitle}
                    align="center"
                  >
                    Số ghế
                  </TableCell>
                  <TableCell
                    className={classestable.tableCellTitle}
                    align="center"
                  >
                    Loại ghế
                  </TableCell>
                  <TableCell
                    className={classestable.tableCellTitle}
                    align="center"
                  >
                    Tài khoản đặt
                  </TableCell>
                  <TableCell
                    className={classestable.tableCellTitle}
                    align="center"
                  >
                    Giá vé
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderTableUserBooking()}
                <TableRow>
                  <TableCell
                    colSpan="3"
                    className={classestable.tableCellSum}
                    align="right"
                  >
                    Tổng tiền:
                  </TableCell>
                  <TableCell
                    className={classestable.tableCellSum}
                    align="center"
                  >
                    {renderSumMoney()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
