import Axios from "axios";
export class CommentService {
  fetchComment() {
    return Axios({
      method: "GET",
      url: "https://5f54b74139221c00167fa966.mockapi.io/DanhGia",
    });
  }
  addComment(user) {
    return Axios({
      method: "POST",
      url: "https://5f54b74139221c00167fa966.mockapi.io/DanhGia",
      data: user,
    });
  }
  deleteComment(id) {
    return Axios({
      method: "DELETE",
      url: "https://5f54b74139221c00167fa966.mockapi.io/DanhGia/" + id,
    });
  }
}
