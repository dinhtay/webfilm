import { createAction } from ".";
import { adminService } from "../../services";
import {
  ADD_FILM,
  ADD_USER,
  CREATE_SHOWTIME,
  DELETE_MOVIE,
  DELETE_USER,
  FETCH_USER,
  SEARCH_FILM,
  SEARCH_USER,
  UPDATE_FILM,
  UPDATE_NOTIFY,
  UPDATE_USER,
} from "../types/types";
import { startLoading, stopLoading } from "./common.action";
import Swal from "sweetalert2";
import { fetchFilmFollowPage } from "./film.action";

/*-----USER-----*/
export const fetchUserPage = (page) => {
  return (dispatch) => {
    // dispatch(startLoading());
    adminService
      .fetchUserPage(page)
      .then((res) => {
        dispatch(createAction(FETCH_USER, res.data));
        // dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        // dispatch(stopLoading());
      });
  };
};

export const searchUser = (keyword) => {
  return (dispatch) => {
    adminService
      .searchUser(keyword)
      .then((res) => {
        dispatch(createAction(SEARCH_USER, res.data));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không tìm thấy",
        });
      });
  };
};

export const addUser = (data, page) => {
  // console.log(data);
  return (dispatch) => {
    //dispatch(startLoading());
    adminService
      .addUser(data)
      .then((res) => {
        dispatch(createAction(ADD_USER, res.data));
        dispatch(fetchUserPage(page));
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
        });
      })
      .catch((err) => {
        console.log(err);
        //   dispatch(stopLoading());
        Swal.fire({
          icon: "error",
          title: "Không thành công",
          text: err.response.data,
        });
      });
  };
};

export const updateUser = (data, page) => {
  return (dispatch) => {
    dispatch(startLoading());
    adminService
      .updateUser(data)
      .then((res) => {
        dispatch(createAction(UPDATE_USER, res.data));
        dispatch(fetchUserPage(page));
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
        });
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không thành công",
          text: err.response.data,
        });
        dispatch(stopLoading());
      });
  };
};

export const deleteUser = (user) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn muốn xóa ?",
      text: "Khi tài khoản bị xóa sẽ không phục hồi lại dữ liệu được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          adminService.deleteUser(user).then((res) => {
            dispatch(createAction(DELETE_USER, res.data));
          });
          Swal.fire("Tài khoản đã bị xóa!", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không thành công",
          text: "Tài khoản đã mua vé",
        });
      });
  };
};

export const resetNotify = () => {
  return (dispatch) => {
    dispatch(createAction(UPDATE_NOTIFY));
  };
};
/*-----USER-----*/

/*-----FILM-----*/
export const deleteFilm = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn muốn xóa ?",
      text: "Khi Phim đã bị xóa sẽ không phục hồi lại dữ liệu được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          adminService.deleteMovie(id).then((res) => {
            dispatch(createAction(DELETE_MOVIE, res.data));
            // dispatch(fetchFilmFollowPage(page));
          });
          Swal.fire("Phim đã bị xóa!", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không thành công",
          text: "Phim đã có lịch chiếu",
        });
      });
  };
};

export const searchFilm = (keyword) => {
  return (dispatch) => {
    adminService
      .searchFilm(keyword)
      .then((res) => {
        dispatch(createAction(SEARCH_FILM, res.data));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không tìm thấy",
        });
      });
  };
};

export const addFilm = (data, page) => {
  return (dispatch) => {
    adminService
      .addFilm(data)
      .then((res) => {
        dispatch(createAction(ADD_FILM, res.data));
        dispatch(fetchFilmFollowPage(page));
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không thành công",
          text: err.response.data,
        });
      });
  };
};

export const updateFilm = (data, page) => {
  return (dispatch) => {
    adminService
      .updateFilm(data)
      .then((res) => {
        dispatch(createAction(UPDATE_FILM, res.data));
        dispatch(fetchFilmFollowPage(page));
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không thành công",
          text: err.response.data,
        });
      });
  };
};
/*-----FILM-----*/

/*-----CREATE SHOW TIME-----*/
export const createShowtime = (data) => {
  return (dispatch) => {
    adminService
      .createShowtime(data)
      .then((res) => {
        dispatch(createAction(CREATE_SHOWTIME, res.data));
        Swal.fire({
          icon: "success",
          title: "Tạo Lịch chiếu thành công",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Không thành công",
          text: err.response.data,
        });
      });
  };
};
