import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import bookingReducer from "./booking.Reducer";
import CinemaReducer from "./cinemaReducer";
import commentReducer from "./commentReducer";
import CommonReducer from "./commonReducer";
import FilmReducer from "./filmReducer";
import NewsReducer from "./newsReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  filmReducer: FilmReducer,
  commonReducer: CommonReducer,
  userReducer: UserReducer,
  cinemaReducer: CinemaReducer,
  newsReducer: NewsReducer,
  bookingReducer: bookingReducer,
  adminReducer: adminReducer,
  commentReducer: commentReducer,
});

export default rootReducer;
