import Axios from "axios";

export class CinemaService {
  //Lấy thông tin hệ thống rạp
  fetchCinemaSystem() {
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });
  }

  //Lấy thông tin cụm rạp theo hệ thống
  fetchCinemaInfoInSystem(id) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`,
      method: "GET",
    });
  }

  //Lấy danh sách phim theo cụm rạp
  fetchFilmFollowCinema(id) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${id}&maNhom=GP09`,
      method: "GET",
    });
  }

  //Lấy chi tiết phim theo mã
  fetchCinemaInfoShowTimes(id) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
      method: "GET",
    });
  }
}
