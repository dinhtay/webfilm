import React, { Component } from "react";

import Slider from "react-slick";

import slidermobile1 from "../../assets/slidermobile1.jpg";
import slidermobile2 from "../../assets/slidermobile2.jpg";
import slidermobile3 from "../../assets/slidermobile3.jpg";

class Advertise extends Component {
  render() {
    const settings = {
      dots: false,
      fade: true,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 1000,
      autoplay: true,
      arrows: false,
      slidesToShow: 1,
    };
    return (
      <section id="ungdung">
        <div className="adv__section">
          <div className="adv__section--content">
            <div className="adv__content--details">
              <h3>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h3>
              <p>
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <button className="btn_adv">Download Now</button>
            </div>
            <div className="adv__section--mobile">
              <div className="adv__mobile--bg">
                <img src="./images/mobile.png" alt />
                <div className="adv__mobile--slick">
                  <Slider {...settings}>
                    <div>
                      <img
                        src={slidermobile1}
                        alt="img_mobile"
                        style={{
                          marginLeft: "2px",
                        }}
                      />
                    </div>
                    <div>
                      <img
                        src={slidermobile2}
                        alt="img_mobile"
                        style={{
                          transform: "translate(101.5%, -101.5%)",
                        }}
                      />
                    </div>
                    <div>
                      <img
                        src={slidermobile3}
                        alt="img_mobile"
                        style={{
                          transform: "translate(203%, -202%)",
                        }}
                      />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="adv__mobile--slick"></div>
      </section>
    );
  }
}

export default Advertise;
