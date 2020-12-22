import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";

import { useSelector } from "react-redux";
import ModalListCinemaDetail from "./ModalListCinemaDetail";
import ModalListFilmShowtime from "./ModalListFilmShowtime";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f1f4f7",
    color: theme.palette.common.black,
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
      // backgroundColor: theme.palette.action.hover,
      backgroundColor: "#f1f4f7",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  tablecontainer: {
    width: "100%",
  },
  table: {
    width: "100%",
  },
  btnList: { border: "1px solid #3e515d", color: "#3e515d" },
});

export default function TableDetailCinema() {
  const classes = useStyles();
  const cinemaInfo = useSelector((state) => state.cinemaReducer.cinemaInfo);
  const renderCinemaInfo = () => {
    return cinemaInfo?.map((cinema, index) => {
      return (
        <StyledTableRow key={index}>
          <StyledTableCell style={{ width: "30%" }} align="center">
            {cinema.tenCumRap}
          </StyledTableCell>
          <StyledTableCell style={{ width: "40%" }} align="center">
            {cinema.diaChi}
          </StyledTableCell>
          <StyledTableCell style={{ width: "30%" }} align="center">
            <ModalListFilmShowtime maRap={cinema.maCumRap} />
            <ModalListCinemaDetail cinema={cinema} />
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };
  return (
    <TableContainer className={classes.tablecontainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tên cụm rạp</StyledTableCell>
            <StyledTableCell align="center">Địa chỉ</StyledTableCell>
            <StyledTableCell align="center">Chi tiết</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderCinemaInfo()}</TableBody>
      </Table>
    </TableContainer>
  );
}
