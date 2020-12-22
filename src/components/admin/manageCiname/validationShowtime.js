import validationFilm from "../manageFilm/validationFilm";

const validationInfomation = [
  "Bạn chưa chọn Phim",
  "Bạn chưa chọn Thời gian chiếu phim",
  "Giá vé không được để trống",
  "Giá vé phải là số và thuộc khoảng [70000 ~ 150000]",
];

export default function validationShowtime(values) {
  let regexNumber = /^[0-9]+$/;
  let error = {};
  if (!values.maPhim) {
    error.maPhim = validationInfomation[0];
  }
  if (!values.ngayChieuGioChieu) {
    error.ngayChieuGioChieu = validationInfomation[1];
  }
  if (values.giaVe < 1) {
    error.giaVe = validationInfomation[2];
  } else if (values.giaVe < 70000 && regexNumber.test(values.giaVe)) {
    error.giaVe = validationInfomation[3];
  }
  return error;
}
