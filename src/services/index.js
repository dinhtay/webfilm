import { AdminService } from "./admin.service";
import { BookingService } from "./booking.service";
import { CinemaService } from "./cinema.service";
import { CommentService } from "./comment.service";
import { FilmService } from "./film.service";
import { NewsService } from "./news.service";
import { UserService } from "./user.service";

export const filmService = new FilmService();
export const userService = new UserService();
export const cinemaService = new CinemaService();
export const bookingService = new BookingService();
export const newsService = new NewsService();
export const adminService = new AdminService();

export const commentService = new CommentService();
/* export const userSignUpService = new UserService(); */
