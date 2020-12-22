export default function validateInfo(user) {
  let errors = {};

  //TaiKhoan
  if (!user.taiKhoan.trim()) {
    errors.taiKhoan = "Tài khoản không được bỏ trống";
  }

  //MatKhau
  if (!user.matKhau) {
    errors.matKhau = "Mật khẩu không được bỏ trống";
  } else if (user.matKhau.length > 6) {
    errors.matKhau = "Mật khẩu tối đa 6 kí tự ,gồm số và chữ ";
  }
  return errors;
}
