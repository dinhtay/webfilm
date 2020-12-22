import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Swal from "sweetalert2";

import {
  addComment,
  deleteComment,
  fetchComment,
} from "../../redux/actions/comment.action";

export default function Review(props) {
  const { maPhim } = props;
  const listComment = useSelector((state) => state.commentReducer.comment);
  const dispatch = useDispatch();
  const taiKhoan = useSelector((state) => state.userReducer.credentials);
  let dateFormat = require("dateformat");
  const dateComment = new Date();
  const [state, setState] = useState({
    hoTen: "",
    binhLuan: "",
    maPhim: maPhim,
    taiKhoan: "",
    rating: +"",
    date: dateFormat("", "dd/mm/yyyy HH:mm"),
  });

  function handleChange(event) {
    let { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    if (state.binhLuan === "") {
      Swal.fire({
        title: "Bạn chưa chọn đánh giá",
      });
    } else if (state.rating == 0) {
      Swal.fire({
        title: "Bạn chưa nhập bình luận",
      });
    } else {
      setState({
        ...state,
        date: dateFormat(dateComment, "dd/mm/yyyy HH:mm"),
      });
      dispatch(addComment(state));
    }
  }

  // lấy user từ local
  const user1 = JSON.parse(localStorage.getItem("creadentials"));

  function handleDelete(id) {
    // duyệt
    let index = listComment.findIndex((comment) => comment.id === id);

    // Nếu tìm thấy
    if (index !== -1) {
      // tìm đúng của mình
      if (listComment[index].taiKhoan === user1.taiKhoan) {
        dispatch(deleteComment(id, index));
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi...",
          text: "Bạn không thể xóa bình luận của Tài khoản khác",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi...",
        text: "Bạn không thể xóa bình luận của Tài khoản khác",
      });
    }
  }

  useEffect(() => {
    dispatch(fetchComment());
  }, []);

  const renderComment = () => {
    return listComment.map((user, index) => {
      if (user.maPhim === maPhim) {
        return (
          <div className="media media-comment" key={index}>
            <div className="media-avatar">
              <img src="/images/avatardefault.png" alt="avatar user" />
            </div>
            <div className="media-body">
              <span className="media-body-name">{user.hoTen}</span>
              {user1 ? (
                <button
                  style={{ float: "right", fontSize: "10px" }}
                  className="btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Xóa
                </button>
              ) : (
                ""
              )}
              <div className="media-date">
                <span>{user.date}</span>
              </div>

              <div className="media-rating">
                <Box component="fieldset" borderColor="transparent">
                  <Rating
                    style={{ fontSize: "12px", margin: "0" }}
                    name="rating"
                    value={user.rating}
                    readOnly
                  />
                </Box>
              </div>

              <p>{user.binhLuan}</p>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="introduce__title1__content2">
      <div className="avaluate">
        <div className="media-danhGia">
          <form onSubmit={handleSubmit}>
            <Box component="fieldset" borderColor="transparent">
              <Rating name="rating" onChange={handleChange} />
            </Box>

            <div className="input-group mb-3">
              <input
                type="text"
                name="binhLuan"
                style={{ padding: "25px" }}
                className="form-control"
                placeholder="Bạn nghĩ gì về Phim này ?"
                onChange={handleChange}
              />

              <div className="input-group-append">
                {taiKhoan !== null ? (
                  <button
                    onClick={() => {
                      setState({
                        ...state,
                        hoTen: taiKhoan.hoTen,
                        taiKhoan: taiKhoan.taiKhoan,
                        rating: state.rating,
                      });
                      console.log(state);
                    }}
                    className="input-group-text"
                  >
                    Bình luận
                  </button>
                ) : (
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Swal.fire({
                        icon: "error",
                        title: "Bạn cần phải đăng nhập..",
                      });
                    }}
                  >
                    Bình luận
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
        {renderComment()}
      </div>
    </div>
  );
}
