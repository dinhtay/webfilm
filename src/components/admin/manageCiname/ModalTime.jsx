import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  Button,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTicketRoom } from "../../../redux/actions/booking.actions";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    width: "100%",
  },
  btnDetail: {
    border: "1px solid #964040",
    color: "#964040",
    marginTop: "5%",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },
}));

export default function ModalTime(props) {
  const dateFormat = require("dateformat");
  const classes = useStyles();
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setDate(event.target.value);
  };
  const renderTime = () => {
    return props.showTime?.map((time, index) => {
      let item = time.maLichChieu;
      return (
        <MenuItem value={item}>
          <NavLink
            exact
            to={`/admin/showtime/${item}`}
            onClick={() => dispatch(fetchTicketRoom(item))}
            className="linkBook"
          >
            {dateFormat(time.ngayChieuGioChieu, "HH:MM dd/mm/yyyy")}
          </NavLink>
        </MenuItem>
      );
    });
  };
  return (
    <>
      <form>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Chọn Thời gian chiếu
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={date}
                onChange={handleChange}
              >
                {renderTime()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
