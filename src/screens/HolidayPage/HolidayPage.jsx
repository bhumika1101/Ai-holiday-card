import React, { useContext, useEffect } from "react";
import Button from "./Button";

//SCSS
import "./holiday-page-style.scss";
import { useNavigate, useParams } from "react-router";
import reducer from "../../context/DataMapping/reducer";
import DataMapping from "../../context/DataMapping";
import OpenAiTextCreation from "../../utility/OpenAiTextCreation";
import ThemeContext from "../../context/ThemeContext";

export default function HolidayPage() {
  const { client_name } = useParams();
  const [data] = useContext(DataMapping);
  const [, setContent] = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.storyData4 === undefined) {
      navigate("/");
    }
  });

  function shareStory() {
    if (navigator.share) {
      let url = "";
      if (data.clientDetails[0].response) {
        url =
          window.location.origin +
          window.location.pathname +
          `/#/${client_name}/summary?storyid=${data.storyData1[0].storyId}`;
      } else {
        url =
          window.location.origin +
          window.location.pathname +
          `/#/summary?storyid=${data.storyData1[0].storyId}`;
      }
      navigator
        .share({
          title: "Dept Ai Holiday card.",
          text: "Checkout My Story!",
          url: url,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    data?.storyData4 !== undefined && (
      <div className="last-page-container">
        <div className="last-page-content">
          <div className="last-page-left-content">
            <img
              src={
                data?.storyData4[0]?.promptImage
                  ? data?.storyData4[0]?.promptImage
                  : `${process.env.REACT_APP_CONTENT}/images/happy-holidays.svg`
              }
            />
          </div>
          <div className="last-page-right-content">
            <div className="last-page-heading-content">
              <div className="headings">
                <h1>Happy Holidays, </h1>
              </div>
              <div className="headings">
                <h1>Love DEPT! </h1>
              </div>
            </div>
            <div className="last-page-para-content">
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.storyData4[0]?.promptMessage
                    ? OpenAiTextCreation(data?.storyData4[0]?.promptMessage)
                    : "Happy holidays!",
                }}
              ></p>
            </div>
          </div>
        </div>

        <img
          src={`${process.env.REACT_APP_CONTENT}/images/full-star.svg`}
          className="lastpageStar-img1"
          alt="lastpageStar-img1"
        />

        <img
          src={`${process.env.REACT_APP_CONTENT}/images/homepageStar3.svg`}
          className="lastpageStar-img2"
          alt="star"
        />

        <div className="last-page-footer-container">
          <div className="last-page-footer-content">
            <div className="last-page-footer-left-content"></div>
            <div className="last-page-footer-right-content">
              <p>Do you want to do another story together?</p>

              <div className="last-page-footer-right-content-btns">
                <Button
                  onClick={() => {
                    if (data.clientDetails[0].response) {
                      navigate(`/${client_name}/`);
                    } else {
                      navigate(`/`);
                    }
                  }}
                  buttonLabel="Create new Story"
                />
                <Button
                  buttonLabel="Share this Story"
                  onClick={() => {
                    // shareStory();
                    if (data.clientDetails[0].response) {
                      navigate(
                        `/${client_name}/summary?storyid=${data.storyData1[0].storyId}`
                      );
                    } else {
                      navigate(
                        `/summary?storyid=${data.storyData1[0].storyId}`
                      );
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
