import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedIdCinema } from "../../../redux/actions/cinema.action";

function CinemaReserve(props) {
  const { cum } = props;

  let substrTen = cum.maCumRap.substr(0, 3);

  const dispatch = useDispatch();
  const renderImg = () => {
    if (substrTen === "bhd") {
      return <img src="/images/rapbhd.jpg" alt="cinema" />;
    }
    if (substrTen === "cgv") {
      return <img src="/images/rapcgv.jpg" alt="cinema" />;
    }
    if (substrTen === "cns") {
      return <img src="/images/rapcinestar.jpg" alt="cinema" />;
    }
    if (substrTen === "glx") {
      return <img src="/images/rapgalaxy.jpg" alt="cinema" />;
    }
    if (substrTen === "lot") {
      return <img src="/images/raplotte.jpg" alt="cinema" />;
    }
    if (substrTen === "meg") {
      return <img src="/images/rapmega.jpg" alt="cinema" />;
    }
  };
  // useEffect(() => {
  //   dispatch(selectedIdCinema(cum[0]?.maCumRap));
  // }, []);
  return (
    <div>
      <span onClick={() => dispatch(selectedIdCinema(`${cum.maCumRap}`))}>
        <div className="cinema__rap--detail ">
          <div className="cinema__rap--img">{renderImg()}</div>
          <div className="cimena__rap--titile">
            <p>
              <span>{cum.tenCumRap}</span>
            </p>
            <p>{cum.diaChi}</p>
            {/* <a href="#">
              <i className="fas fa-pencil-alt" />
              Chi tiết
            </a> */}
          </div>
        </div>
      </span>
    </div>
  );
}

export default CinemaReserve;
