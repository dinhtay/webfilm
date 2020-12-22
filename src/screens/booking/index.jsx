import React, { useEffect, useState } from "react";
import "../../styles/page/booking.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTicketRoom,
  fetchTicketRoomChair,
  postBookingRequest,
} from "../../redux/actions/booking.actions";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import useStyles from "./style";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BookRight from "../../components/booking/BookRight";
import HistorySet from "../../components/booking/historySet";
import Chair from "../../components/booking/chair";
import HeaderMobile from "../../components/layout/HeaderMobile";
import Header from "../../components/layout/Header";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

export default function Booking() {
  /* jss */
  const history = useHistory();
  const [value, setValue] = React.useState("one");
  const { maLichChieu } = useParams();
  const classes = useStyles();
  const [stringTime, settimeString] = useState();
  // const [state, setstate] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /* jss */

  // lấy dữ liệu redux về
  const dispatch = useDispatch();
  const listChair = useSelector((state) => state.bookingReducer.danhSachGhe);
  const infoMovie = useSelector((state) => state.bookingReducer.infoMovie);
  const danhSachChonVe = useSelector(
    (state) => state.bookingReducer.danhSachChonVe
  );
  const amountMoney = useSelector((state) => state.bookingReducer.amountMoney);
  const user = useSelector((state) => state.userReducer.credentials);
  let isLoading = useSelector((state) => state.commonReducer.isLoading);

  // gởi action lên
  useEffect(() => {
    // thong tin rap
    dispatch(fetchTicketRoomChair(maLichChieu));
    // danh sach ghe
    dispatch(fetchTicketRoom(maLichChieu));

    // count down
    formatDate(300);
    // xóa khi rời trang khác
    return () => {
      clearInterval(interVal);
    };
  }, [maLichChieu]);

  let interVal;
  // thời gian đặt vé
  function formatDate(date) {
    if (!isNaN(date)) {
      var timer = date,
        minutes,
        seconds;

      // hàm đếm ngược interVal
      interVal = setInterval(function () {
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        settimeString(`${minutes}:${seconds}`);
        if (--timer < 0) {
          clearInterval(interVal);
          timer = date;
          Swal.fire({
            title: "Hết thời gian đặt vé",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Đặt Vé Lại",
            showCancelButton: true,
          }).then((result) => {
            if (result.value) {
              window.location.reload(true);
            } else {
              history.push("/");
            }
          });
        }
      }, 1000);
    }
  }
  // render danh sách ghế đặt
  const renderDanhSachGhe = () => {
    return danhSachChonVe.map((tenGhe, index) => {
      return <span key={index}>{tenGhe.tenGhe},</span>;
    });
  };
  // render ra tiền đặt vé
  const renderMoney = () => {
    return danhSachChonVe.reduce((total, item) => {
      return (total += item.giaVe);
    }, 0);
  };
  // render tiền người đặt thức ăn + ghế
  let total = Number(renderMoney()) + Number(amountMoney);

  // xử lí điều kiện onclick booking
  function handleBooking() {
    let danhSachVe = listChair.filter((ghe) => ghe.dangChon);
    danhSachVe = danhSachVe.map((ghe) => ({
      maGhe: ghe.maGhe,
      giaVe: ghe.giaVe,
    }));
    if (danhSachChonVe.length < 1) {
      Swal.fire({
        title: "Bạn chưa chọn vé",
        confirmButtonText: `OK`,
      });
    } else {
      Swal.fire({
        title: "Bạn có muốn đặt vé không?",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Đặt vé thành công", "", "success");
          dispatch(postBookingRequest(maLichChieu, danhSachVe));
          // dispatch(fetchTicketRoom(maLichChieu));
          // Swal.fire({
          //   icon: "success",
          //   title: "Đặt vé thành công",
          //   text: "Chúng tôi sẽ liên lạc với bạn sớm !",
          //   width: 600,
          //   padding: "3em",
          //   background: "#fff url(/images/trees.png)",
          //   backdrop: `
          //     rgba(0,0,123,0.4)
          //     url("/images/successBooking.gif")
          //     left top
          //     no-repeat
          //   `,
          // });

          /*  history.push("/");
          history.push("/booking/" + maLichChieu); */
        } else if (result.isDenied) {
          Swal.fire("Bạn Đã hủy đặt vé", "", "info");
        }
      });
    }
  }
  if (isLoading) {
    return (
      <div>
        <div className="loader">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <HeaderMobile />
      <section className="container-fluid book__section">
        <div className="row book__row">
          <div className="col-sm-12 col-md-8 section--left">
            <div className="book__section--left">
              <div className="book__left-header">
                <div className={classes.root1}>
                  <AppBar
                    style={{ background: "white", color: "black" }}
                    position="static"
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="wrapped label tabs example"
                    >
                      <Tab
                        value="one"
                        label="Chọn Ghế & Thanh Toán"
                        {...a11yProps("one")}
                      />
                      {user !== null ? (
                        <Tab
                          value="two"
                          label="Thông tin Đã Đặt"
                          {...a11yProps("two")}
                        />
                      ) : (
                        <Tab label="Thông tin Đã Đặt" disabled />
                      )}
                    </Tabs>
                  </AppBar>
                </div>
              </div>

              <TabPanel value={value} index="one">
                <div className="book__left--body">
                  <div className="book__body--title">
                    <div className="left--title">
                      <div className="title--logocinema">
                        <img src={infoMovie.hinhAnh} alt />
                      </div>
                      <div className="title-content">
                        <p style={{ color: "#ce3017" }}>
                          {infoMovie.tenCumRap}
                        </p>
                        <p>
                          {infoMovie.ngayChieu} - {infoMovie.gioChieu} -{" "}
                          {infoMovie.tenRap}
                        </p>
                      </div>
                    </div>
                    <div className="right--title">
                      <p>Thời gian giữ chỗ</p>
                      <p>
                        <span>{stringTime}</span>
                      </p>
                    </div>
                  </div>
                  <div className="book__body--seatmap">
                    <div className="book__seatmap--resever">
                      <div className="book__resever--screen">
                        <div className="namescreen">
                          <img src="../images/screen.png" alt />
                        </div>
                      </div>
                      <div>
                        {/* <div className="day">
                          <Button>A</Button>
                          <Button>B</Button>
                          <Button>C</Button>
                          <Button>D</Button>
                          <Button>E</Button>
                          <Button>F</Button>
                          <Button>G</Button>
                          <Button>H</Button>
                          <Button>I</Button>
                          <Button>K</Button>
                        </div> */}
                        <div className="book__resever--listseat">
                          <div className="book__listseat--rowseat ">
                            <div className="book__listseat--chair">
                              <Chair listChair={listChair} />
                            </div>
                          </div>
                        </div>
                        <div className="right" style={{ width: "5%" }}></div>
                      </div>
                    </div>
                    <div className="book__seatmap-typeseat">
                      <span className="typeseat colorseat colorvip">Vip</span>
                      <span className="typeseat colorseat colordeluxe">
                        Normal
                      </span>
                      <span className="typeseat colorseat colorchosen">
                        Đã chọn
                      </span>
                      <span className="typeseat colorseat colornotchosen">
                        Đã có người chọn
                      </span>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index="two">
                <HistorySet user={user} />
              </TabPanel>
            </div>
          </div>

          <div className="col-sm-12 col-md-4 section--right">
            <div className="book__section--right">
              <div className="book__right--amount">
                <span>{total.toLocaleString()}</span>
              </div>
              <div className="book__right--name">
                <p>
                  <span className="book__name--age">C16</span>
                  {infoMovie.tenPhim}
                </p>
                <p>{infoMovie.diaChi} </p>
                <p>
                  {infoMovie.ngayChieu} - {infoMovie.gioChieu} -{" "}
                  {infoMovie.tenRap}
                </p>
              </div>
              <div className="book__right--chair">
                <div className="book__chair--number">
                  <span>Ghế</span>
                </div>
                <div className="book__chair--price">{renderDanhSachGhe()}</div>
              </div>
              <div className="book__right--combo">
                <div className="book__combo--title">
                  <BookRight />
                </div>
              </div>
              <div className="book__right--input input--discount">
                <div className="input__discount--text">
                  <TextField
                    id="outlined-basic"
                    label="Mã Giảm Giá"
                    variant="outlined"
                  />
                </div>
                <div className="input__discount--btn">
                  <button className="btn--discount">Áp dụng</button>
                </div>
              </div>
              <div className="book__right--checkout">
                <div className="book__right--typeCheckout">
                  <p>Hình thức thanh toán</p>
                  <div className="input-checkout">
                    <input type="radio" id="checkout1" name="checkout-online" />
                    <label htmlFor="checkout1">
                      <img src="../images/checkout1.png" alt />
                    </label>
                  </div>
                  <div className="input-checkout">
                    <input type="radio" id="checkout2" name="checkout-online" />
                    <label htmlFor="checkout2">Chuyển khoản</label>
                  </div>
                </div>
                <div className="book__right--note">
                  <i className="fa fa-exclamation-circle" />
                  <span>Vé đã mua không thể đổi hoặc hoàn tiền</span>
                </div>
                <div className="book__right--btn">
                  <button
                    className="btn--book"
                    type="button"
                    onClick={handleBooking}
                  >
                    Đặt vé
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
