import React, { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import HeaderMobile from "../../components/layout/HeaderMobile";
import Header from "../../components/layout/Header";
import NewsDetail from "../../components/home/News/NewsDetail";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewDetail } from "../../redux/actions/news.action";

export default function NewDetail({ match }) {
  let newDetail = useSelector(
    (state) =>
      state.newsReducer.newDetail || {
        id: "",
        title: "",
        date: "",
        brief: "",
        image: "",
        content: "",
      }
  );
  let isLoading = useSelector((state) => state.commonReducer.isLoading);
  //   const id = useParams(props.match.params.newID);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNewDetail(match.params.newID));
  }, []);
  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <HeaderMobile />
      <NewsDetail newDetail={newDetail} />
      <Footer />
    </div>
  );
}
