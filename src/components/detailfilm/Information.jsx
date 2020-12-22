import React, { Component } from "react";

class Information extends Component {
  render() {
    const { movieDetail } = this.props;
    let dateFormat = require("dateformat");
    return (
      <div className="introduce__title1__content1" id="notification">
        <div className="introduce__content1--info">
          <div className="introduce__content1--table">
            <table>
              <thead>
                <tr className="table__content">
                  <td>Ngày công chiếu</td>
                  <td>Tên phim</td>
                  <td>Thể loại</td>
                  <td>Diễn viên</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dateFormat(movieDetail.ngayKhoiChieu, "dd-mm-yyyy")}</td>
                  <td>{movieDetail.tenPhim}</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="introduce__content1--detail">
            <p>Nội dung</p>
            <p>{movieDetail.moTa}</p>
          </div>
          <div className="introduce__content1--trailer">
            <p className="content1">Trailer</p>

            <iframe
              src={movieDetail.trailer}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Information;
