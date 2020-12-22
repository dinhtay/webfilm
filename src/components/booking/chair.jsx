import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import useStyles from "../../screens/booking/style";
export default function Chair(props) {
  let { listChair } = props;
  const dispatch = useDispatch();

  const classes = useStyles();
  // trang thái ghế
  function trangThaiGhe(daDat, dangChon, type) {
    if (daDat) return classes.daDat;
    else if (dangChon) {
      return classes.dangChon;
    } else if (type === "Thuong") {
      return classes.chuaDatGheThuong;
    } else {
      return classes.chuaDatGheVip;
    }
  }

  // render giao diện
  const renderChair = () => {
    return listChair.map((ghe, index) => {
      if (index < 160) {
        return (
          <button
            className={trangThaiGhe(ghe.daDat, ghe.dangChon, ghe.loaiGhe)}
            key={index}
            onClick={() => {
              if (ghe.daDat !== true) {
                dispatch({
                  type: "SELECT_CHAIR",
                  payload: ghe,
                });
              } else {
                Swal.fire({
                  title: "Ghế đã được đặt",
                });
              }
            }}
          >
            {ghe.tenGhe}
          </button>
        );
      }
    });
  };

  return <>{renderChair()}</>;
}
