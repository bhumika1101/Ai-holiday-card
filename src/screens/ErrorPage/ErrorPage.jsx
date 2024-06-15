import React from "react";
import "./ErrorPage.scss";
import Button from "../CreativeHub/Button";
import { useNavigate, useParams } from "react-router-dom";

const ErrorPage = (props) => {
  const startImageClass = props.startImageSrc ? "error-graphics" : "error-star";
  const { client_name } = useParams();
  const navigate = useNavigate("");

  return (
    <div className="error-page">
      <div className="logo-msg-btn">
        <div className="logo-mesgs">
          <div>
            <img
              src="./content/images/error-logo.svg"
              className="error-logo"
              alt="error-logo"
            />
          </div>
          <div className="error-messages">
            <p className="error-msg1">
              {props.errorMsg1
                ? props.errorMsg1
                : "Oops, even these algorithms can't"}
            </p>
            <p className="error-msg2">
              {props.errorMsg ? props.errorMsg : "handle the festivities!"}
            </p>
          </div>
        </div>
        <div
          className="error-btn"
          onClick={() => {
            if (client_name) {
              navigate(`/${client_name}/`);
            } else {
              navigate(`/`);
            }
          }}
        >
          <Button
            buttonLabel={props.buttonLabel || "Try Again"}
            className="errorpage-btn"
          />
          {/* <Button
            onMouseEnter={onFocus}
            onMouseLeave={onBlur}
            className="footer-btn"
            onClick={() => setContent((content) => content + 1)}
          >
            Try Again
            <img src={image} className="btn-arrow" alt="arrowIcon" />
          </Button> */}
        </div>
        <img
          src="./content/images/circle.svg"
          alt="circle"
          className="error-circle"
        />
        <img
          src="./content/images/triangle.svg"
          alt="triangle"
          className="error-triangle"
        />
        <img
          src={props.startImageSrc || "./content/images/error-star.svg"}
          alt="star"
          className={startImageClass}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
