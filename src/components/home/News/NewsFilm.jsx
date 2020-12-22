import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchNewDetail, fetchNews } from "../../../redux/actions/news.action";
import { NavLink } from "react-router-dom";

function NewsFilm() {
  let news = useSelector((state) => state.newsReducer.news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  const renderNewsLarge = () => {
    return news.map((item, index) => {
      if (index < 2) {
        return (
          <div className="news__large--1" key={index}>
            <NavLink
              exact
              to={`/news/${item.id}`}
              onClick={() => dispatch(fetchNewDetail(item.id))}
            >
              <div className="news__large--img">
                <div
                  className="img__bg"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                ></div>
                {/* <img src={item.image} alt /> */}
              </div>
              <p className="news__large--title">{item.title}</p>
              <p className="news__large--detail">
                {item.brief.slice(0, 120) + "..."}
              </p>
            </NavLink>
          </div>
        );
      }
    });
  };

  const renderNewsMedium = () => {
    return news.map((item, index) => {
      if (index > 1 && index < 5) {
        return (
          <div className="news__medium--1" key={index}>
            <NavLink
              className="news__medium--link"
              exact
              to={`/news/${item.id}`}
              onClick={() => dispatch(fetchNewDetail(item.id))}
            >
              <div className="news__medium--img">
                <div
                  className="img__bgm"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                ></div>
                {/* <img src={item.image} alt /> */}
              </div>
              <div className="news__medium--content">
                <p className="news__medium--title">{item.title}</p>
                <p className="news__medium--detail">
                  {item.brief.slice(0, 120) + "..."}
                </p>
              </div>
            </NavLink>
          </div>
        );
      }
    });
  };

  return (
    <div>
      {/* NEW LARGE */}
      <div className="news__content--large">{renderNewsLarge()}</div>
      {/* NEW MEDIUM */}
      <div className="new__content--medium">{renderNewsMedium()}</div>
    </div>
  );
}

export default connect()(NewsFilm);
