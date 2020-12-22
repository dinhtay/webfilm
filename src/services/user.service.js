import Axios from "axios";

export class UserService {
  signIn(user) {
    return Axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user,
    });
  }
  signUp(data) {
    return Axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      data,
    });
  }
  fetchInFoBooking(user) {
    // console.log("axios", user);
    return Axios({
      method: "POST",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      data: {
        taiKhoan: user,
      },
    });
  }

  // //Fetch avatar của user
  // fetchAvatar() {
  //   return Axios({
  //     method: "GET",
  //     url: "https://5fa93e9ac9b4e90016e6a3be.mockapi.io/api/v1/avatar",
  //   });
  // }

  // //Tạo avatar cho user
  // createAvatar(data) {
  //   return Axios({
  //     method: "POST",
  //     url: `https://5fa93e9ac9b4e90016e6a3be.mockapi.io/api/v1/avatar`,
  //     data,
  //   });
  // }

  // //Sửa avatar
  // updateAvatar(data) {
  //   return Axios({
  //     method: "POST",
  //     url: `https://5fa93e9ac9b4e90016e6a3be.mockapi.io/api/v1/avatar`,
  //     data,
  //   });
  // }

  // //Xóa user và avatar
  // deleteAvatar(user) {
  //   return Axios({
  //     method: "DELETE",
  //     url: `https://5fa93e9ac9b4e90016e6a3be.mockapi.io/api/v1/avatar/${user}`,
  //   });
  // }
}
