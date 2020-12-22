import {
  ADD_FOOD,
  AMOUNT_MONEY,
  DELETE_FOOD,
  FETCH_FOOD,
  FETCH_TICKET_ROOM,
  FETCH_TICKET_ROOM_CHAIR,
  OPTIONAL_QUANTITY,
  SELECT_CHAIR,
  BOKING_TICKETS,
} from "../types/types";
import Swal from "sweetalert2";
const initialState = {
  danhSachGhe: [],
  infoMovie: [],
  foodList: [],
  cartFoodList: [],
  amountMoney: 0,
  danhSachChonVe: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKET_ROOM: {
      state.danhSachGhe = action.payload;
      return { ...state };
    }

    case FETCH_TICKET_ROOM_CHAIR: {
      state.infoMovie = action.payload;
      return { ...state };
    }

    case SELECT_CHAIR:
      const updateDsChonVe = [...state.danhSachChonVe];
      // tìm index vị trí của ghế trong arr danhSachGhe
      let mangUpdate = [...state.danhSachGhe];
      let index = mangUpdate.findIndex(
        (ghe) => ghe.maGhe === action.payload.maGhe
      );
      // ghế trong danh sách ghế
      let gheCu = mangUpdate[index];
      // ghế mới trong danh sách ghế :+  thêm thuộc tính đang chọn ==true
      let gheMoi = { ...gheCu, dangChon: !gheCu.dangChon };
      mangUpdate[index] = gheMoi;

      // chọn để push vào số lượng lớn hơn 10 thì post thông báo
      if (gheMoi.dangChon) {
        if (updateDsChonVe.length < 10) {
          updateDsChonVe.push(gheMoi);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Bạn không thể chọn quá 10 ghế",
            confirmButtonText: `OK`,
          });
        }
        state.danhSachChonVe = updateDsChonVe;
      } else {
        // tìm vị trí payload được chọn trong danh sách chọn để tìm index cần xóa
        let index = updateDsChonVe.findIndex(
          (ghe) => ghe.maGhe === action.payload.maGhe
        );
        updateDsChonVe.splice(index, 1);
        state.danhSachChonVe = updateDsChonVe;
      }

      // updateDsChonVe.sort()
      state.danhSachChonVe = updateDsChonVe;
      state.danhSachGhe = mangUpdate;
      return { ...state };

    case BOKING_TICKETS: {
      // đặt vé thành công thì gáng lại cho mảng vé bằng rỗng render lại giao diện ghế ngồi
      let updateDsChonVe = [...state.danhSachChonVe];
      updateDsChonVe = [];

      //renew card food
      let renew = [];
      state.cartFoodList = renew;

      state.danhSachChonVe = updateDsChonVe;
      return { ...state };
    }

    //------- Phần xử lý Bắp nước---------
    case FETCH_FOOD: {
      state.foodList = action.payload;
      return { ...state };
    }
    case ADD_FOOD: {
      let cartFoodList = [...state.cartFoodList];
      const index = cartFoodList.findIndex((cart) => {
        return cart.id === action.payload.id;
      });

      if (index !== -1) {
        cartFoodList[index].soLuong += 1;
      } else {
        cartFoodList = [...cartFoodList, action.payload];
      }
      // cartFoodList.push(action.payload);
      state.cartFoodList = cartFoodList;
      return { ...state };
    }
    case DELETE_FOOD: {
      let cartFoodList = [...state.cartFoodList];
      cartFoodList.splice(action.index, 1);
      state.cartFoodList = cartFoodList;
      return { ...state };
    }
    case OPTIONAL_QUANTITY: {
      let cartFoodList = [...state.cartFoodList];
      const index = cartFoodList.findIndex((cart) => {
        return cart.id === action.payload.id;
      });

      if (action.payload.status) {
        action.payload.product.soLuong += 1;
      } else {
        if (action.payload.product.soLuong > 1)
          action.payload.product.soLuong -= 1;
      }
      state.cartFoodList = cartFoodList;
      return { ...state };
    }

    case AMOUNT_MONEY: {
      // if (action.payload) {
      state.amountMoney = action.payload;

      Swal.fire({
        icon: "success",
        title: "Đã thêm vào Thanh Toán !",
      });
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Bạn chưa chọn sản phẩm",
      //   });
      // }
      return { ...state };
    }
    //------- Phần xử lý Bắp nước---------
    default:
      return state;
  }
};

export default bookingReducer;
