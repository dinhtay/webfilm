import Axios from "axios";

export class NewsService {
  fetchNews() {
    return Axios({
      url: "https://5fa93e9ac9b4e90016e6a3be.mockapi.io/api/v1/news",
      method: "GET",
    });
  }
  fetchDetailNew(id) {
    return Axios({
      url: `https://5fa93e9ac9b4e90016e6a3be.mockapi.io/api/v1/news/${id}`,
      method: "GET",
    });
  }
}
