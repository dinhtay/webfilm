import React from "react";
import { NavLink } from "react-router-dom";
import Showtime from "./Showtime";

const FilmReserve = (props) => {
  const { movie } = props;
  const { danhSachPhim } = movie;

  return danhSachPhim.map((item, index) => {
    return (
      <div className="cinema__film--detail film__cgv" key={index}>
        <div className="cinema__film--img">
          <NavLink
            exact
            to={`/detail/${item.maPhim}`}
            style={{ textDecoration: "none" }}
          >
            <img src={item.hinhAnh} alt="film" />
          </NavLink>
        </div>

        <div className="cinema__film--book">
          <div className="film--title">
            <span className="film--age">C18</span>
            <span className="film--name">{item.tenPhim}</span>
            <p className="film--time">{movie.tenCumRap}</p>
            {/* <p className="film--time">110 phút </p> */}
            <p className="film-type">2D Digital</p>
          </div>
          <div className="film--reserve">
            <Showtime showTime={item.lstLichChieuTheoPhim} />
          </div>
        </div>
      </div>
    );
  });
};

export default FilmReserve;
