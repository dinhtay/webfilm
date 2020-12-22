import { createAction } from ".";
import Swal from "sweetalert2";
import { bookingService } from "../../services";

import {
  ADD_FOOD,
  AMOUNT_MONEY,
  DELETE_FOOD,
  FETCH_FOOD,
  FETCH_TICKET_ROOM,
  FETCH_TICKET_ROOM_CHAIR,
  OPTIONAL_QUANTITY,
  BOKING_TICKETS,
} from "../types/types";
import { startLoading, stopLoading } from "./common.action";

// lấy danh sách ghế
export const fetchTicketRoom = (maLichChieu) => {
  return (dispatch) => {
    dispatch(startLoading());
    bookingService
      .fetchTicketRoom(maLichChieu)
      .then((res) => {
        dispatch(createAction(FETCH_TICKET_ROOM, res.data.danhSachGhe));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

// lấy thông tin phim
export const fetchTicketRoomChair = (maLichChieu) => {
  return (dispatch) => {
    dispatch(startLoading());
    bookingService
      .fetchTicketRoom(maLichChieu)
      .then((res) => {
        dispatch(createAction(FETCH_TICKET_ROOM_CHAIR, res.data.thongTinPhim));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

// đặt vé
export const postBookingRequest = (maLichChieu, danhSachVe) => {
  return async function (dispatch) {
    try {
      // getlocal
      const user = JSON.parse(localStorage.getItem("creadentials"));
      // call api
      const res = await bookingService.postBookingRequest(
        maLichChieu,
        danhSachVe,
        user
      );
      /*  localStorage.setItem("NguoiDatVe", JSON.stringify(res.data)); */

      dispatch(createAction(BOKING_TICKETS, res));
      dispatch(fetchTicketRoom(maLichChieu));
    } catch (error) {
      Swal.fire({
        title: "Bạn chưa đăng nhập tài khoản",
        confirmButtonText: `OK`,
      });
    }
  };
};

//Lấy danh sách đồ ăn
export const fetchFood = () => {
  return (dispatch) => {
    bookingService
      .fetchFood()
      .then((res) => {
        dispatch(createAction(FETCH_FOOD, res.data));
      })
      .catch((err) => console.log(err));
  };
};

//Thêm đồ ăn
export const addFood = (product) => {
  const foodCart = {
    id: product.id,
    hinhAnh: product.hinhAnh,
    tenDoAn: product.tenDoAn,
    gia: product.gia,
    soLuong: 1,
  };
  return (dispatch) => {
    dispatch(createAction(ADD_FOOD, foodCart));
  };
};

//Xóa đồ ăn
export const deleteFood = (product) => {
  return (dispatch) => {
    dispatch(createAction(DELETE_FOOD, product));
  };
};

//Tăng giảm số lượng của đồ ăn
export const optionalQuantity = (product, status) => {
  return (dispatch) => {
    dispatch(createAction(OPTIONAL_QUANTITY, { product, status }));
  };
};

// Tổng tiền đồ ăn
export const amountMoney = (money) => {
  return (dispatch) => {
    dispatch(createAction(AMOUNT_MONEY, money));
  };
};
