import React, { PureComponent } from "react";

class Footer extends PureComponent {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="footer__contact">
            <div className=" footer__contact__client">
              <p>Đối Tác</p>
              <div className="footer__client--list">
                <div className="footer__client--item">
                  <img src="/images/cgv.png" alt />
                </div>
                <div className="footer__client--item">
                  <img src="/images/bhd.png" alt />
                </div>
                <div className="footer__client--item">
                  <img src="/images/galaxycine.png" alt />
                </div>
                <div className="footer__client--item">
                  <img
                    data-toggle="tooltip"
                    data-placement="right"
                    title="bhl"
                    src="/images/megags.png"
                    alt
                  />
                </div>
              </div>
            </div>
            <div className="footer__contact__info">
              <div className="row footer__contact mx-0">
                <div className="text-center  col-12">
                  <p>CyberFilm – SẢN PHẨM CỦA TRẦN ĐÌNH TÂY</p>
                  <div className="footer__contact__address">
                    <span>
                      Địa chỉ:số 484, đường Chi Lăng, Phường Phú Hậu ,Thừa Thiên
                      Huế
                    </span>
                  </div>
                  <div className="footer__contact__link">
                    <p>Số Điện Thoại (Hotline): 037 924 3337</p>
                    <p style={{ color: "red" }}>
                      Email: trandinhtay161193@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" footer__contact__app">
              <p>Mobile App</p>
              <div className="footer__social">
                <a href="#">
                  <img src="/images/apple-logo.png" alt="img_contact" />
                </a>
                <a href="#">
                  <img src="/images/android-logo.png" alt="img_contact" />
                </a>
              </div>
            </div>
            <div className=" footer__contact__social">
              <p>Social</p>
              <div className="footer__social">
                <a href="#">
                  <img src="/images/facebook-logo.png" alt="img_contact" />
                </a>
                <a href="#">
                  <img src="/images/zalo-logo.png" alt="img_contact" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
