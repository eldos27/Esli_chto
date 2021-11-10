import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  "https://i.ytimg.com/vi/AgKVx0dWCjk/maxresdefault.jpg",
  "https://www.wallpaperup.com/uploads/wallpapers/2013/12/15/196248/1304da438a9753fb2f97b49e1e7e3736.jpg",
  "https://wallpaperhook.com/wp-content/uploads/2020/11/muhammad-ali-1920x1080-boxer-hd-From-WallpaperHook.com-For-Free.jpg",
  "https://wallpaperaccess.com/full/1535429.jpg",
  "https://kloop.kg/wp-content/uploads/2020/01/Ww-62kg-gold-Aisuluu-TYNYBEKOVA-KGZ-df.-Taybe-Mustafa-YUSEIN-BUL-6.jpg",
  "https://wallpaperaccess.com/full/935430.jpg",
];

const SlideShow = () => {
  return (
    <div className="slide-container">
      <Slide>
        <div className="each-slide">
          <div
            style={{
              background: `url(${slideImages[0]}) no-repeat center `,
              width: "100%",
              height: "85vh",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="each-slide">
          <div
            style={{
              background: `url(${slideImages[1]}) no-repeat center`,
              width: "100%",
              height: "85vh",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="each-slide">
          <div
            style={{
              background: `url(${slideImages[2]}) no-repeat center`,
              width: "100%",
              height: "85vh",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="each-slide">
          <div
            style={{
              background: `url(${slideImages[3]}) no-repeat center `,
              width: "100%",
              height: "85vh",
              backgroundSize: "cover",
              backgroundPositionY: "top",
            }}
          ></div>
        </div>
        <div className="each-slide">
          <div
            style={{
              background: `url(${slideImages[4]}) no-repeat center `,
              width: "100%",
              height: "85vh",
              backgroundSize: "cover",
              backgroundPositionY: "top",
            }}
          ></div>
        </div>
        <div className="each-slide">
          <div
            style={{
              background: `url(${slideImages[5]}) no-repeat center `,
              width: "100%",
              height: "85vh",
              backgroundSize: "cover",
              backgroundPositionY: "top",
            }}
          ></div>
        </div>
      </Slide>
    </div>
  );
};

export default SlideShow;
