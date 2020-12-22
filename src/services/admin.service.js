import Axios from "axios";
const users = JSON.parse(localStorage.getItem("creadentials"));
export class AdminService {
  //Lấy danh sách user phân trang
  fetchUserPage(page) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP08&soTrang=${page}&soPhanTuTrenTrang=8`,
      method: "GET",
    });
  }

  //Thêm người dùng
  addUser(data) {
    //const users = JSON.parse(localStorage.getItem("creadentials"));
    return Axios({
      method: "POST",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      data,
      headers: {
        Authorization: `Bearer ${users.accessToken}`,
      },
    });
  }

  //Xóa người dùng
  deleteUser(user) {
    // const users = JSON.parse(localStorage.getItem("creadentials"));
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${users.accessToken}`,
      },
    });
  }

  //Cập nhật thông tin người dùng
  updateUser(data) {
    const users = JSON.parse(localStorage.getItem("creadentials"));
    return Axios({
      method: "PUT",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",

      data,
      headers: {
        Authorization: `Bearer ${users.accessToken}`,
      },
    });
  }

  //Tìm kiếm User
  searchUser(keyword) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP08&tuKhoa=${keyword}`,
      method: "GET",
    });
  }

  //Tìm phim
  searchFilm(keyword) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09&tenPhim=${keyword}`,
      method: "GET",
    });
  }

  //Delete Phim
  deleteMovie(id) {
    //const users = JSON.parse(localStorage.getItem("creadentials"));
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${users.accessToken}`,
      },
    });
  }

  //Thêm phim
  addFilm(data) {
    //const users = JSON.parse(localStorage.getItem("creadentials"));
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${users.accessToken}`,
      },
    });
  }

  //Update film
  updateFilm(data) {
    //const users = JSON.parse(localStorage.getItem("creadentials"));
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${users.accessToken}`,
      },
    });
  }

  //Tạo lịch chiếu
  createShowtime(data) {
    return Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${users.accessToken}`,
      },
    });
  }
}
