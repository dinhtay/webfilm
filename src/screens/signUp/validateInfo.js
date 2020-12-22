const validateinfomation = [
  "Tài khoản không được để trống",
  "Mật khẩu không được để trống",
  "Email không được để trống",
  "Số điện thoại không được để trống",
  "Họ tên không được để trống",
  "Xác nhận mật khẩu không đúng",
  "Email Không đúng định dạng",
  "Xác nhận mật khẩu không được để trống",
  "Định dạng số điện thoại không đúng",
];

export default function validateInfo(values) {
  console.log("aaa", values);
  // let ktramatkhau = /^[0-9]$/;
  let regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  let email = /^([\w\.])+@([a-zA-Z0-9\-])+\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
  let error = {};
  if (!values.taiKhoan.trim()) {
    error.taiKhoan = validateinfomation[0];
  } else if (values.taiKhoan.length < 6) {
    error.taiKhoan = "Tài khoản phải nhiều hơn 6 ký tự";
  }
  if (!values.matKhau) {
    error.matKhau = validateinfomation[1];
  } else if (values.matKhau.length < 6) {
    error.matKhau = "Mật khẩu phải nhiều hơn 6 ký tự";
  }

  if (values.xacNhanMK !== values.matKhau) {
    error.xacNhanMK = validateinfomation[5];
  }
  if (!values.email.trim()) {
    error.email = validateinfomation[2];
  } else if (!email.test(values.email)) {
    error.email = validateinfomation[6];
  }
  if (!values.hoTen.trim()) {
    error.hoTen = validateinfomation[4];
  }
  if (!values.soDt.trim()) {
    error.soDt = validateinfomation[3];
  } else if (!regexPhone.test(values.soDt)) {
    error.soDt = validateinfomation[8];
  }
  if (values.xacNhanMK === "") {
    error.xacNhanMK = validateinfomation[7];
  }
  // if (values.maLoaiNguoiDung === "") {
  //   error.maLoaiNguoiDung = validateinfomation[8];
  // }
  return error;
}
