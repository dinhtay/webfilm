import React from "react";
import TransitionsModal from "./TrailerModal";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFilmShowTime } from "../../redux/actions/film.action";

function FilmItem(props) {
  const { movie } = props;
  const dispatch = useDispatch();
  return (
    <div className="item">
      <div
        className="item__img"
        // style={{
        //   backgroundImage: `url(${movie.hinhAnh})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   width: "100%",
        // }}
      >
        <img src={movie.hinhAnh} alt="hinhAnh" />
        <div className="item__img--range">
          <span className="item__img--point">
            <p>{movie.danhGia}</p>
            <p>
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </p>
          </span>
        </div>
        {/* <button className="img--play">
            <i className="fa fa-play" />
          </button> */}
        <TransitionsModal movie={movie} />
      </div>
      <div className="item__title">
        <span className="item__title--age">C18</span>
        <span className="item__title--name">{movie.tenPhim}</span>
        {/* <p className="item__title--time">150 phút</p> */}
        <div className="showHover">
          <NavLink exact to={`/detail/${movie.maPhim}`}>
            <button
              onClick={() => dispatch(fetchFilmShowTime(`${movie.maPhim}`))}
              className="showHover--btn"
            >
              Đặt vé ngay
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default FilmItem;
