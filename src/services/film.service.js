import Axios from "axios";

export class FilmService {
  //Lấy danh sách phim
  fetchFilm() {
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
      method: "GET",
    });
  }

  //Lấy danh sách phim theo ngày
  fetchFilmFollowDay() {
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=GP09&soTrang=1&soPhanTuTrenTrang=10&tuNgay=01%2F08%2F2020&denNgay=31%2F12%2F2020",
      method: "GET",
    });
  }

  //Lấy danh sách phim phân trang
  fetchFilmFollowPage(page) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=${page}&soPhanTuTrenTrang=5`,
      method: "GET",
    });
  }

  //Lấy chi tiết phim
  fetchFilmDetail(id) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      method: "GET",
    });
  }

  //Lấy danh sách carousel
  fetchBannerFilm() {
    return Axios({
      url: "https://5fa04305e21bab0016dfd001.mockapi.io/api/v1/banner",
      method: "GET",
    });
  }

  //Lấy thông tin lịch chiếu phim
  fetchFilmShowTime(id) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
      method: "GET",
    });
  }
}
