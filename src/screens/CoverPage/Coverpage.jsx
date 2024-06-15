import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WOW from "wowjs";
import "animate.css";

import "./cover-page-style.scss";
import DataMapping from "../../context/DataMapping";
import ThemeContext from "../../context/ThemeContext";

export default function Coverpage() {
  const { client_name } = useParams();
  const [data] = useContext(DataMapping);
  const [, setContent] = useContext(ThemeContext);
  const navigate = useNavigate();
  const [animation, setAnimation] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();
    setTimeout(() => {
      if (data.clientDetails[0].response) {
        navigate(`/${client_name}/home-page`);
      } else {
        navigate(`/home-page`);
      }
    }, 5500);
    setTimeout(() => {
      setAnimation("end");
    }, 2000);
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    setContent(0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="coverPage-section">
      <div className="coverPage-content">
        <img
          src={`${process.env.REACT_APP_CONTENT}/images/star1.svg`}
          className="star-img1 wow animate__rotateInDownLeft"
          alt="star"
        />
        <div
          className={`coverPage-text ${
            isVisible ? "visible-word" : "hidden-word"
          }`}
        >
          <p className="p-container">
            <p className={`coverPage-first-word ${animation}`}>LET THE</p>
          </p>
          <p className="p-container">
            <p className={`coverPage-second-word ${animation}`}>FESTIVITIES</p>
          </p>
          <p className="p-container">
            <p className={`coverPage-third-word ${animation}`}>BEGIN!</p>
          </p>
          {/* <p className="coverPage-third-word-mobile">TO</p>
          <p className="coverPage-fourth-word-mobile">CELEBRATE!</p> */}
        </div>
        <img
          src={`${process.env.REACT_APP_CONTENT}/images/star2.svg`}
          className="star-img2 wow animate__rotateInDownRight"
          alt="star"
        />
      </div>
    </div>
  );
}
