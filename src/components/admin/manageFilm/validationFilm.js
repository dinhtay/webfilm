const validationInfomation = [
  "Mã phim không được để trống",
  "Tên phim không được để trống",
  "Bí danh không được để trống",
  "Trailer không được để trống",
  "Vui lòng chọn hình ảnh theo đúng định dạng:jpg, png hoặc gif",
  "Mô tả không được để trống",
  "Bạn chưa chọn Ngày khởi chiếu",
  "Mã phim phải là số có 4 chữ số",
  "Bạn chưa chọn hình ảnh",
];

export default function validationFilm(values) {
  let regexNumber = /^[0-9]+$/;

  let error = {};
  if (!values.maPhim) {
    error.maPhim = validationInfomation[0];
  } else if (values.maPhim.length < 4 && !regexNumber.test(values.maPhim)) {
    error.maPhim = validationInfomation[7];
  }
  if (!values.tenPhim.trim()) {
    error.tenPhim = validationInfomation[1];
  }
  if (!values.biDanh.trim()) {
    error.biDanh = validationInfomation[2];
  }
  if (!values.trailer.trim()) {
    error.trailer = validationInfomation[3];
  }
  if (!values.hinhAnh.name) {
    error.hinhAnh = validationInfomation[8];
  } else if (!values.hinhAnh.name.match(/\.(jpg|png|gif)$/)) {
    error.hinhAnh = validationInfomation[4];
  }
  if (!values.moTa.trim()) {
    error.moTa = validationInfomation[5];
  }
  if (!values.ngayKhoiChieu.trim()) {
    error.ngayKhoiChieu = validationInfomation[6];
  }
  return error;
}
