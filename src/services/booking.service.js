import Axios from "axios";

export class BookingService {
  fetchTicketRoom(maLichChieu) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      method: "GET",
    });
  }

  //Lấy danh sách bắp nước
  fetchFood() {
    return Axios({
      url: "https://5fa93e9ac9b4e90016e6a3be.mockapi.io/api/v1/food",
      method: "GET",
    });
  }
  postBookingRequest(maLichChieu, danhSachVe, user) {
    return Axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      data: {
        maLichChieu,
        danhSachVe,
        taiKhoanNguoiDung: user.taiKhoan,
      },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }
}

/* // ĐẶT VÉ
export function postBookingRequest(maLichChieu, danhSachVe) {
  return async function (dispatch) {
    try {
      // getlocal
      const user = JSON.parse(localStorage.getItem("creadentials"));
      // call api
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        data: {
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung: user.taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Đặt vé thành công",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Không thành công ",
        text: "Vui lòng đăng nhập trước khi đặt vé !",
      });
    }
  };
}
 */
