import React, { memo } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, resetNotify } from "../../../redux/actions/admin.action";
import ModalUpdate from "./ModalUpdate";
import ModalHistoryUser from "./ModalHistoryUser";

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
      width: "19%",
      border: "1px solid #fff",
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

function TableUser(props) {
  const classes = useStyles();
  const { listUser } = props;
  const { search } = props;
  const { page } = props;
  const dispatch = useDispatch();

  const renderUserSearch = () => {
    return search?.map((user, index) => {
      return (
        <StyledTableRow key={index}>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.taiKhoan}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.hoTen}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.email}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.soDt}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            <span style={{ border: "3px dotted #fb4226", padding: "5px" }}>
              {user.maLoaiNguoiDung}
            </span>
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            <ModalHistoryUser user={user} />
            <ModalUpdate page={page} user={user} />
            <Button
              className={classes.btnDelete}
              onClick={() => {
                dispatch(deleteUser(user.taiKhoan));
                dispatch(resetNotify());
              }}
            >
              Xóa
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };
  const renderUser = () => {
    return listUser.items?.map((user, index) => {
      return (
        <StyledTableRow key={index}>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.taiKhoan}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.hoTen}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.email}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            {user.soDt}
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            <span style={{ border: "3px dotted #fb4226", padding: "5px" }}>
              {user.maLoaiNguoiDung}
            </span>
          </StyledTableCell>
          <StyledTableCell className={classes.tableCell} align="left">
            <ModalHistoryUser user={user} />
            <ModalUpdate user={user} page={page} />

            {/* <Update page={page} userDom={userDom} user={user} /> */}

            <Button
              className={classes.btnDelete}
              onClick={() => {
                dispatch(deleteUser(user.taiKhoan));
                dispatch(resetNotify());
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
      <TableContainer className={classes.tablecontainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableCell} align="left">
                Tài khoản
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Họ tên
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Email
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Loại
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Chức năng
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderUserSearch()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <>
      <TableContainer className={classes.tablecontainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableCell} align="left">
                Tài khoản
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Họ tên
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Email
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Loại
              </StyledTableCell>
              <StyledTableCell className={classes.tableCell} align="left">
                Chức năng
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderUser()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default memo(TableUser);
