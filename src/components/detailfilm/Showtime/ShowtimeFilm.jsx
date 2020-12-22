import React, { useState } from "react";
import { useSelector } from "react-redux";
import TimeFilm from "./TimeFilm";

function ShowtimeFilm(props) {
  const { movieShowTime } = props;
  const dateFormat = require("dateformat");
  const id = useSelector((state) => state.cinemaReducer.selectedCinema);
  const day = useSelector((state) => state.cinemaReducer.selectedDay);

  //let status = false;
  const renderImg = () => {
    if (id === "BHDStar") {
      return <img src="/images/rapbhd.jpg" alt="cinema" />;
    }
    if (id === "CGV") {
      return <img src="/images/rapcgv.jpg" alt="cinema" />;
    }
    if (id === "CineStar") {
      return <img src="/images/rapcinestar.jpg" alt="cinema" />;
    }
    if (id === "Galaxy") {
      return <img src="/images/rapgalaxy.jpg" alt="cinema" />;
    }
    if (id === "LotteCinima") {
      return <img src="/images/raplotte.jpg" alt="cinema" />;
    }
    if (id === "MegaGS") {
      return <img src="/images/rapmega.jpg" alt="cinema" />;
    }
  };

  if (id && day) {
    return movieShowTime.map((movie) => {
      let { maHeThongRap } = movie;
      return movie.cumRapChieu.map((item, index) => {
        const renderRap = () => {
          return (
            <div className="showtimes__right__content--address" key={index}>
              <div className="showtimes__right__content--address--imges">
                {renderImg()}
              </div>
              <div className="showtimes__right__content--address--title">
                <span style={{ textTransform: "uppercase" }}>
                  {movie.tenHeThongRap}
                </span>
                <p style={{ margin: "0" }}>{item.tenCumRap}</p>
              </div>
            </div>
          );
        };

        // -----------------Code fix mới---------------------
        // const renderTime = () => {
        //   if (maHeThongRap === id) {
        //     return item.lichChieuPhim.map((time) => {
        //       let { ngayChieuGioChieu } = time;
        //       let formatDay = ngayChieuGioChieu.slice(0, 10);
        //       if (formatDay === day) {
        //         return (
        //           <>
        //             <TimeFilm time={time} />
        //           </>
        //         );
        //       }
        //     });
        //   }
        // };
        let datencomparison = item.lichChieuPhim.filter((time) => {
          let { ngayChieuGioChieu } = time;
          let formatDay = ngayChieuGioChieu.slice(0, 10);
          return formatDay === day;
        });
        const renderTime = () => {
          if (maHeThongRap === id) {
            if (datencomparison.length < 1) {
              return (
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: " 600",
                    color: "#fb4226",
                  }}
                >
                  Rạp chưa có lịch chiếu !!!
                </p>
              );
            }
            return datencomparison?.map((time) => {
              return (
                <>
                  <TimeFilm time={time} />
                </>
              );
            });
          }
        };

        if (maHeThongRap === id) {
          return (
            <div className="index" key={index}>
              {renderRap()}
              <h4 style={{ fontSize: "13px" }}>
                Ngày: {dateFormat(day, "dd/mm")}
              </h4>
              <div className="showtimes__right__content--time">
                {renderTime()}
              </div>
            </div>
          );
        }
      });
    });
  }

  // -----------------Code cũ:Vì duyệt thêm trùng ngày nên bị Hiển thị ra nhiều rạp bị trùng tên ----------------
  // if (id && day) {
  //   return movieShowTime.map((movie) => {
  //     let { maHeThongRap } = movie;
  //     return movie.cumRapChieu.map((item, index) => {
  //       const renderPhim = () => {
  //         return (
  //           <div className="showtimes__right__content--address" key={index}>
  //             <div className="showtimes__right__content--address--imges">
  //               {renderImg()}
  //             </div>
  //             <div className="showtimes__right__content--address--title">
  //               <span style={{ fontSize: "16px", textTransform: "uppercase" }}>
  //                 {movie.tenHeThongRap}
  //               </span>
  //               <p style={{ margin: "0" }}>{item.tenCumRap}</p>
  //             </div>
  //           </div>
  //         );
  //       };
  //       if (maHeThongRap === id) {
  //         return item.lichChieuPhim.map((time, index) => {
  //           let { ngayChieuGioChieu } = time;
  //           let formatDay = ngayChieuGioChieu.slice(0, 10);
  //           if (formatDay === day) {
  //             return (
  //               <div className="index" key={index}>
  //                 {renderPhim()}
  //                 <h4 style={{ fontSize: "14px" }}>2D Digital</h4>
  //                 <div className="showtimes__right__content--time">
  //                   <TimeFilm time={time} />
  //                 </div>
  //               </div>
  //             );
  //           }
  //         });
  //       }
  //     });
  //   });
  // }
  // ------------------------------------------Code cũ---------------------------------------
  return (
    <div className="error__showtime">
      <p>Vui lòng chọn thông tin !!!</p>
    </div>
  );
}

export default ShowtimeFilm;

//  if (maHeThongRap === id) {
// return movie.cumRapChieu.map((item, index) => {
//   return (
//     <div className="index">
//       <div className="showtimes__right__content--address">
//         <div className="showtimes__right__content--address--imges">
//           <img
//             src="https://www.timeoutdubai.com/public/images/2020/05/27/VOX-Cinemas.jpg"
//             alt
//           />
//         </div>
//         <div className="showtimes__right__content--address--title">
//           <span style={{ fontSize: "18px", textTransform: "uppercase" }}>
//             {movie.tenHeThongRap}
//           </span>
//           <p style={{ margin: "0" }}>{item.tenCumRap}</p>
//         </div>
//       </div>
//       <h4>2D Digital</h4>
//       <div className="showtimes__right__content--time">
//         <TimeFilm time={item.lichChieuPhim} />
//       </div>
//     </div>
//   );
// });
// }
