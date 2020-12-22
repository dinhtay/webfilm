import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import AddFilm from "./AddFilm";
import TableFilm from "./TableFilm";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { fetchFilmFollowPage } from "../../../redux/actions/film.action";
import { searchFilm } from "../../../redux/actions/admin.action";
const useStyles = makeStyles((theme) => ({
  input: {
    width: "70%",
    height: "50px",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  btnSearch: {
    height: "60px",
  },
}));

export default function ManagerFilm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const movieListPage = useSelector((state) => state.filmReducer.movieListPage);
  const notify = useSelector((state) => state.adminReducer.notify);
  const search = useSelector((state) => state.adminReducer.searchFilm);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const [key, setKey] = useState("");
  const handleChangeSearch = (event) => {
    let key = event.target.value;
    setKey(key);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchFilm(key));
  };
  useEffect(() => {
    if (notify === "Xóa thành công!") {
      dispatch(fetchFilmFollowPage(page));
    }
  }, [notify]);
  useEffect(() => {
    dispatch(fetchFilmFollowPage(page));
  }, [page]);
  const renderPagination = () => {
    if (search.length < 1) {
      return (
        <div className="manager__pagination">
          <Pagination
            count={movieListPage.totalPages}
            page={page}
            color="primary"
            onChange={handleChangePage}
            onClick={() => dispatch(fetchFilmFollowPage(page))}
          />
        </div>
      );
    }
  };

  return (
    <div className="managerfilm dashboard">
      <h1>Quản lý Phim</h1>
      <div className="managerfilm__action">
        <div className="managerfilm__action--item">
          <TextField
            className={classes.input}
            id="key"
            onChange={handleChangeSearch}
            value={key}
            label="Tìm kiếm theo Tên.."
          />
          <Button onClick={handleSearch} className={classes.btnSearch}>
            <i
              className="fa fa-search"
              style={{ fontSize: "16px", color: "#4a90e2" }}
            ></i>
          </Button>
        </div>

        <div className="managerfilm__action--item">
          <AddFilm page={page} />
        </div>
      </div>
      <div className="managerfilm__table">
        <TableFilm movieList={movieListPage} page={page} search={search} />
        {renderPagination()}
      </div>
    </div>
  );
}
