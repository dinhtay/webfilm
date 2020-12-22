import React from "react";
import { connect } from "react-redux";

function NewsDetail(props) {
  //   let newDetail = useSelector((state) => state.newsReducer.newDetail);
  //   const { id } = useParams(props.match.params.newID);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchNewDetail(id));
  //   }, []);
  const { newDetail } = props;
  // console.log(newDetail);
  return (
    <section className="news__sections">
      <div className="news__sections__container">
        <div className="news__sections__content">
          <h1 className="news__content--title">{newDetail.title}</h1>
          <p className="news__content--day">
            {new Date(newDetail.date).toLocaleString()}
          </p>
          <p className="news__content--brief">{newDetail.brief}</p>
          <div className="news__content--img">
            <img src={newDetail.image} />
          </div>
          <p className="news__content--describe">{newDetail.content}</p>
        </div>
      </div>
    </section>
  );
}
export default connect()(NewsDetail);
