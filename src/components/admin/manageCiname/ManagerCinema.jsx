import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCinema from "./TableCinema";

const useStyles = makeStyles({});

export default function ManagerCinema() {
  const classes = useStyles();

  return (
    <div className="managercinema dashboard">
      <h1>Quản lý Rạp</h1>
      <div className="managercinema__table">
        <TableCinema />
      </div>
    </div>
  );
}
