import { createAction } from ".";
import { adminService, userService } from "../../services";
import {
  SIGN_IN,
  SIGN_UP,
  USER__INFO_BOOKING,
  CHANGE__INFO,
} from "../types/types";
import { startLoading, stopLoading } from "./common.action";
import Swal from "sweetalert2";

export const loginRequest = (user, history) => {
  return (dispatch) => {
    dispatch(startLoading());
    userService
      .signIn(user)
      .then((res) => {
        dispatch(createAction(SIGN_IN, res.data));
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
        });

        //Lưu vào local
        localStorage.setItem("creadentials", JSON.stringify(res.data));

        history.push("/");
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Lỗi !!",
          text: "Tài khoản hoặc Mật khẩu không đúng ",
        });
        dispatch(stopLoading());
      });
  };
};

export const registerRequest = (data, history) => {
  return (dispatch) => {
    dispatch(startLoading());
    userService
      .signUp(data)
      .then((res) => {
        dispatch(createAction(SIGN_UP, res.data));
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công",
        });
        history.push("/sign-in");
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Lỗi !!",
          text: "Tài khoản hoặc Email đã tồn tại",
        });
        dispatch(stopLoading());
      });
  };
};

// lấy thông tin lịch sử người đặt vé
export const fetchInFoBooking = (user) => {
  return (dispatch) => {
    userService
      .fetchInFoBooking(user)
      .then((res) => {
        dispatch(createAction(USER__INFO_BOOKING, res.data.thongTinDatVe));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// thay đổi thông tin tài khoản
export const changeUserInFo = (user) => {
  console.log("action", user);
  return (dispatch) => {
    adminService
      .updateUser(user)
      .then((res) => {
        dispatch(createAction(CHANGE__INFO, res.data));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Không thành công ",
        });
      });
  };
};

// //Fetch avatar cho user
// export const fetchAvatar = (user) => {
//   return (dispatch) => {
//     userService
//       .fetchAvatar(user)
//       .then((res) => {
//         dispatch(createAction(FETCH_AVATAR, res.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// //Tạo avatar cho user
// export const createAvatar = (data) => {
//   return (dispatch) => {
//     userService
//       .createAvatar(data)
//       .then((res) => {
//         dispatch(createAction(CREATE_AVATAR, res.data));
//         Swal.fire({
//           icon: "success",
//           title: "Đã thêm Ảnh đại diện",
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: "error",
//           title: "Không thành công",
//         });
//       });
//   };
// };

// //Update avatar cho user
// export const updateAvatar = (data) => {
//   return (dispatch) => {
//     userService
//       .updateAvatar(data)
//       .then((res) => {
//         dispatch(createAction(UPDATE_AVATAR, res.data));
//         Swal.fire({
//           icon: "success",
//           title: "Đã cập nhật Ảnh đại diện",
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: "error",
//           title: "Không thành công",
//           text: err.response.data,
//         });
//       });
//   };
// };

// //Xóa user và xóa ảnh đại diện
// export const deleteAvatar = (user) => {
//   return (dispatch) => {
//     userService
//       .deleteAvatar(user)
//       .then((res) => {
//         dispatch(createAction(DELETE_AVATAR, res.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };
