import { createAction } from ".";
import { commentService } from "../../services";
import { FETCH_COMMENT, ADD_COMMENT, DELETE_COMMENT } from "../types/types";

// lấy dữ liệu cơmment
export const fetchComment = () => {
  return (dispatch) => {
    commentService
      .fetchComment()
      .then((res) => {
        dispatch(createAction(FETCH_COMMENT, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// thêm comment
export const addComment = (user) => {
  return (dispatch) => {
    commentService
      .addComment(user)
      .then((res) => {
        dispatch(createAction(ADD_COMMENT, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// xóa comment
export const deleteComment = (id, index) => {
  return (dispatch) => {
    commentService
      .deleteComment(id)
      .then((res) => {
        dispatch(createAction(DELETE_COMMENT, index));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
