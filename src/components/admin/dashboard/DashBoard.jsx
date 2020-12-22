import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCinemaInfoInSystem,
  fetchCinemaSystem,
} from "../../../redux/actions/cinema.action";
import Axios from "axios";
import { fetchFilmFollowPage } from "../../../redux/actions/film.action";
import { fetchUserPage } from "../../../redux/actions/admin.action";

export default function DashBoard() {
  const dispatch = useDispatch();
  const cinemaList = useSelector((state) => state.cinemaReducer.cinemaList);
  const cinemaInfo = useSelector((state) => state.cinemaReducer.cinemaInfo);
  const listUser = useSelector((state) => state.adminReducer.listUser);
  const movieListPage = useSelector((state) => state.filmReducer.movieListPage);
  const [cinema, setCinema] = useState({
    BHDStar: 0,
    CGV: 0,
    CineStar: 0,
    Galaxy: 0,
    LotteCinima: 0,
    MegaGS: 0,
  });
  const renderCinema = () => {
    return cinemaList.map((item) => item.maHeThongRap);
  };
  useEffect(() => {
    dispatch(fetchCinemaSystem());
    dispatch(fetchFilmFollowPage(1));
    dispatch(fetchUserPage(1));
  }, []);
  const chairCinema = () => {
    return (
      <div className="chart">
        <h3>THỐNG KÊ SỐ LƯỢNG RẠP</h3>
        <Bar
          className="chart__detail"
          data={{
            labels: renderCinema(),
            datasets: [
              {
                label: "Số lượng Rạp",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "#001529",
                ],
                data: [6, 21, 2, 8, 8, 1],
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard__manage">
        <div className="dashboard__manage--list">
          <NavLink
            className="dashboard__manage--item "
            exact
            to="/admin/manager-user"
          >
            <div className="lineR">
              <div className="dashboard__item--content ">
                <i className="fa fa-user" style={{ color: "#1ebfae" }}></i>
                <p>{listUser.totalCount}</p>
                <span>QUẢN LÝ NGƯỜI DÙNG</span>
              </div>
            </div>
          </NavLink>
          <NavLink
            exact
            to="/admin/manager-film"
            className="dashboard__manage--item"
          >
            <div className="lineR">
              <div className="dashboard__item--content ">
                <i className="fa fa-film" style={{ color: "#ffb53e" }}></i>
                <p>{movieListPage.totalCount}</p>
                <span>QUẢN LÝ PHIM</span>
              </div>
            </div>
          </NavLink>
          <NavLink
            className="dashboard__manage--item"
            exact
            to="/admin/manager-cinema"
          >
            <div>
              <div className="dashboard__item--content">
                <i className="fa fa-tv" style={{ color: "#f9243f" }}></i>
                <p>{cinemaList.length}</p>
                <span>QUẢN LÝ RẠP</span>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="dashboard__chair">{chairCinema()}</div>
    </div>
  );
}
