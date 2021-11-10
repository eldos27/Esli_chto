import React from "react";
import "./Footer.css";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col">
          <p className="title text">
            {" "}
            <LocationOnIcon /> Наш Адрес
          </p>
          <p className="subtitle text">ул.Логвиненко, 12</p>
        </div>
        <div className="col">
          <p className="title text">
            {" "}
            <PhoneInTalkIcon />
            Контактная информация
          </p>
          <p className="subtitle text">+996 (312) 69 99 99</p>
        </div>
        <div className="col">
          <p className="title text">
            <AlternateEmailIcon /> Наша почта
          </p>
          <p className="subtitle text">Makers@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
