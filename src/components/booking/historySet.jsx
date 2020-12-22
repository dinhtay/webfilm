import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../styles/page/booking.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  changeUserInFo,
  fetchInFoBooking,
} from "../../redux/actions/user.action";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  tablecontainer: {
    width: "100%",
    maxHeight: "500px",
    overflowY: "scroll",
  },
  table: {
    width: "100%",
  },

  tableCell: {
    width: "20%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "18%",
      padding: "2px",
      fontSize: "12px",
      textAlign: "left",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "11px",
    },
  },
}));

export default function HistorySet(props) {
  let { user } = props;

  const [state, setstate] = useState({
    taiKhoan: user.taiKhoan,
    matKhau: user.matKhau,
    email: user.email,
    soDt: user.soDT,
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",

    hoTen: user.hoTen,
  });
  const classes = useStyles();
  const nguoiDatVe = useSelector((state) => state.userReducer.userInfoBooking);
  const dispatch = useDispatch();
  let dateFormat = require("dateformat");
  const renderUserBooking = () => {
    return nguoiDatVe.map((tenPhim, index) => {
      return tenPhim.danhSachGhe.map((ghe, index) => {
        if (tenPhim) {
          return (
            <TableRow key={index}>
              <TableCell className={classes.tableCell}>
                {tenPhim.tenPhim}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {dateFormat(tenPhim.ngayDat, "HH:mm dd/mm/yyyy")}
              </TableCell>
              <TableCell className={classes.tableCell}>{ghe.tenGhe}</TableCell>
              <TableCell className={classes.tableCell}>
                {ghe.tenHeThongRap}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {tenPhim.giaVe}
              </TableCell>
            </TableRow>
          );
        }
      });

      return (
        <TableRow key={index}>
          <TableCell colSpan="4">Tài khoản chưa đặt vé</TableCell>
        </TableRow>
      );
    });
  };

  function handleChange(event) {
    let { name, value } = event.target;

    setstate({
      ...state,
      [name]: value,
    });
  }
  // xử lí lấy thông tin vé được đặt
  function handleInfoBooking() {
    dispatch(fetchInFoBooking(user.taiKhoan));
  }

  function handleSubmit() {
    // event.preventDefault();
    dispatch(changeUserInFo(state));
  }

  return (
    <div className="book__infoUser" id="thongTin">
      <div className="book__infoUser__logo">
        <div className="admin">
          <div className="admin__avata">
            <img src="/images/avatardefault.png" alt="avatar user" />
          </div>
          <div className="admin__sidebar">
            <p>{user.hoTen}</p>

            <Link onClick={handleInfoBooking}>
              <i className="fa fa-universal-access" />
              Xem chi tiết
            </Link>
          </div>
        </div>

        <div className="info">
          {/* <h3>Thông Tin Tài Khoản</h3>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >Tài Khoản</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >Số Điện Thoại</TableCell>
                    <TableCell >Sửa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell >{user.taiKhoan}</TableCell>
                    <TableCell >{user.email}</TableCell>

                    <TableCell >{user.soDT}</TableCell>
                    <TableCell  style={{ color: "blue" }}>
                      <i
                        type="button"
                        class="btn btn-info btn-lg"
                        data-toggle="modal"
                        data-target="#myModal"
                        class="fa fa-edit"
                      ></i>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer> */}
          {/* <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog" style={{ maxWidth: "550px" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Sửa Thông Tin</h4>
                    <button
                      type="button"
                      className="close close-dark"
                      data-dismiss="modal"
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <TextField
                        disabled
                        id="outlined-basic"
                        onChange={handleChange}
                        name="taiKhoan"
                        value={state.taiKhoan}
                        label="taiKhoan"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        onChange={handleChange}
                        name="matKhau"
                        value={state.matKhau}
                        label="matKhau"
                        variant="outlined"
                      />
                      <TextField
                        disabled
                        id="outlined-basic"
                        onChange={handleChange}
                        name="email"
                        value={state.email}
                        label="email"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        onChange={handleChange}
                        name="soDt"
                        label="soDT"
                        value={state.soDt}
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        onChange={handleChange}
                        name="hoTen"
                        label="hoTen"
                        value={state.hoTen}
                        variant="outlined"
                      />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      data-dismiss="modal"
                      onClick={() => handleSubmit()}
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

          <h3>Thông Tin Đặt Vé</h3>
          <TableContainer className={classes.tablecontainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>Tên Phim</TableCell>
                  <TableCell className={classes.tableCell}>Ngày Đặt</TableCell>
                  <TableCell className={classes.tableCell}>Số ghế</TableCell>
                  <TableCell className={classes.tableCell}>Rạp</TableCell>
                  <TableCell className={classes.tableCell}>Giá Vé</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderUserBooking()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
