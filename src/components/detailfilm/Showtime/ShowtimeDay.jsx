import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectedDate } from "../../../redux/actions/cinema.action";

export default function ShowtimeDay(props) {
  // const id = useSelector((state) => state.cinemaReducer.selectedCinema);
  // const { movieShowTime } = props;
  // const dateFormat = require('dateformat');
  // return movieShowTime.map((movie, index) => {
  //   let { maHeThongRap } = movie;
  //   if (maHeThongRap === id) {
  //     return movie.cumRapChieu.map((time, index) => {
  //       return time.lichChieuPhim.map((calendar,index)=>{
  //         if (index<5){
  //            return (
  //            <div className="showtimes__right__date--scroll1 ">
  //              <button>
  //                 <p>{dateFormat(calendar.ngayChieuGioChieu,"dddd")}</p>
  //                 <p>{dateFormat(calendar.ngayChieuGioChieu,"dd-mm")}</p>
  //            </button>
  //         </div>
  //       );
  //         }

  //       })

  //     });
  //   }
  // });

  function changeZero(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
  const dispatch = useDispatch();
  const dateFormat = require("dateformat");
  let date = new Date("2019-01-01");
  // console.log("d:", date);
  let changeDay = [];
  for (let i = 0; i < 10; i++) {
    let increateDay =
      date.getFullYear() +
      "-" +
      changeZero(date.getMonth() + 1) +
      "-" +
      changeZero(date.getDate() + i).toString();
    changeDay = [...changeDay, increateDay];
  }
  useEffect(() => {
    dispatch(selectedDate("2019-01-01"));
  }, []);
  return changeDay.map((day, index) => {
    return (
      <div className="showtimes__right__date--scroll1 " key={index}>
        <button
          onClick={() => {
            dispatch(selectedDate(day));
          }}
        >
          <p>{dateFormat(day, "dddd")}</p>
          <p>{dateFormat(day, "dd-mm")}</p>
        </button>
      </div>
    );
  });
}
