import React from "react";
import { NavLink } from "react-router-dom";

const Showtime = (props) => {
  const { showTime } = props;
  const dateFormat = require("dateformat");
  // console.log("Tong time", showTime);
  return showTime?.map((time, index) => {
    if (index < 8) {
      return (
        <NavLink exact to={`/booking/${time.maLichChieu}`} className="linkBook">
          {dateFormat(time.ngayChieuGioChieu, "HH:MM")}
        </NavLink>
      );
    }
  });
  //   // return <NavLink className="linkBook">a</NavLink>;
  //   console.log(time);
  //   //console.log(time.ngayChieuGioChieu);
  // });
};

export default Showtime;
