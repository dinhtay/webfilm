import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TableDetailCinema from "./TableDetailCinema";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCinemaInfoInSystem,
  fetchCinemaSystem,
  fetchFilmFollowCinema,
} from "../../../redux/actions/cinema.action";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fafafa",
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
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  tablecontainer: {
    width: "100%",
  },
  table: {
    width: "94%",
    marginLeft: "3%",
  },
  show: {
    display: "block",
  },
  hide: {
    display: "none",
  },
  btnDelete: {
    border: "1px solid #f7b500",
    color: "#f7b500",
    outline: "none",
    fontSize: "18px",
  },
  tableChild: {
    width: "100%",
    padding: "0",
    paddingBottom: "1%",
    borderBottom: "1px solid #f7b500",
  },
  tableCell: {
    [theme.breakpoints.down("sm")]: {
      width: "17%",
      padding: "4px",
    },
  },
  tableCellLogo: {
    width: "35%",
    [theme.breakpoints.down("sm")]: {
      width: "30%",
      padding: theme.spacing(0),
    },
  },
  logo: {
    width: "15%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
}));

export default function TableCinema() {
  const classes = useStyles();
  const cinemaList = useSelector((state) => state.cinemaReducer.cinemaList);
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    id: "",
    isState: false,
  });
  const handleToggle = (id) => {
    setOpen({
      ...open,
      id: id,
      isState: !open.isState,
    });
  };
  useEffect(() => dispatch(fetchCinemaSystem()), []);
  function renderListCinema() {
    return cinemaList?.map((cinema, index) => {
      return (
        <>
          <StyledTableRow key={index}>
            <StyledTableCell
              className={classes.tableCellLogo}
              align="center"
              style={{ width: "35%" }}
            >
              <img className={classes.logo} src={cinema.logo} alt="logo" />
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="center">
              {cinema.maHeThongRap}
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="center">
              {cinema.tenHeThongRap}
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="center">
              {cinema.biDanh}
            </StyledTableCell>

            <StyledTableCell className={classes.tableCell} align="center">
              <Button
                className={classes.btnDelete}
                onClick={() => {
                  handleToggle(`${cinema.maHeThongRap}`);
                  dispatch(fetchCinemaInfoInSystem(cinema.maHeThongRap));
                  dispatch(fetchFilmFollowCinema(cinema.maHeThongRap));
                }}
              >
                {open.isState && open.id === `${cinema?.maHeThongRap}` ? (
                  <i className="fa fa-angle-down"></i>
                ) : (
                  <i className="fa fa-angle-up"></i>
                )}
              </Button>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow className={classes.tableChild}>
            <StyledTableCell
              className={classes.tableCell}
              style={{ padding: "0" }}
              colSpan="5"
            >
              {open.isState && open.id === `${cinema?.maHeThongRap}` && (
                <>
                  <TableDetailCinema />
                </>
              )}
            </StyledTableCell>
          </StyledTableRow>
        </>
      );
    });
  }

  return (
    <TableContainer className={classes.tablecontainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.tableCell} align="center">
              Logo
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="center">
              Mã cụm rạp
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="center">
              Tên cụm rạp
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="center">
              Bí danh
            </StyledTableCell>
            <StyledTableCell className={classes.tableCell} align="center">
              Chi tiết cụm Rạp
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderListCinema()} </TableBody>
      </Table>
    </TableContainer>
  );
}
