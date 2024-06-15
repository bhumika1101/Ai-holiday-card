import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "./Button";
import "./home-page-style.scss";
import DataMapping from "../../context/DataMapping";
import ThemeContext from "../../context/ThemeContext";

export default function HomePage() {
  const { client_name } = useParams();

  let [data, dispatchData] = useContext(DataMapping);
  console.log("Data: ", data);
  const navigate = useNavigate();

  const [animation, setAnimation] = useState(false);
  const [, setContent] = useContext(ThemeContext);

  useEffect(() => {
    setContent(0);
  }, []);
  function btnNextPage() {
    setTimeout(() => {
      if (data.clientDetails[0].response) {
        navigate(`/${client_name}/personalisation`);
      } else {
        navigate(`/personalisation`);
      }
    }, 1500);
    setAnimation(true);
  }

  return (
    <>
      <div className={`homepage ${animation ? "begin" : ""}`}>
        {data.clientDetails[0].response ? (
          <>
            {data.clientDetails[0].response.body.imageUrl ? (
              <img
                src={data.clientDetails[0].response.body.imageUrl}
                className="salesforce-img top"
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

        <div className="homepage-section">
          <div className="homepage-content">
            <div className="home-texts">
              <p className="home-first-text">Hello {data?.clientDetails[0]?.response?.body.companyName ? data.clientDetails[0].response.body.companyName : "Guest"},</p>
              <div className="salesforce">
                <p className="home-second-text">Design a holiday</p>
              </div>
              <p className="home-third-text">celebration with us!</p>

              <div className="home-two-paragraphs">
                <p className="home-fourth-text">
                  Hey there! We wanted to send you a holiday greeting that's as
                  unique as you—and we need your help to do it. Let's create a
                  festive card together!
                </p>
                <p className="home-fifth-text">
                  This holiday card will be one-of-a-kind, featuring a short
                  adventure story based on your input. In about five questions,
                  we'll gather the info we need to build a story together. Let's
                  get creative!
                </p>
              </div>
            </div>
          </div>

          <img
            src={`${process.env.REACT_APP_CONTENT}/images/full-star.svg`}
            className="homepageStar-img1"
            alt="homepageStar-img1"
          />

          <img
            src={`${process.env.REACT_APP_CONTENT}/images/homepageStar3.svg`}
            className="homepageStar-img2"
            alt="star"
          />
        </div>

        <div className="homepage-footer">
          <Button
            buttonLabel="Create your own holiday magic"
            className="homepage-btn"
            onClick={() => btnNextPage()}
          />
          {/* <button className="homepage-btn">
          Make your own story{" "}
          <img
            src={`${process.env.REACT_APP_CONTENT}/images/black-left-arrow.svg`}
          />
        </button> */}

          <p className="homepage-footer-text">
          This experience uses advanced AI, like GPT4 and DALL-E 3, to bring you holiday magic designed just for you. For best use, we recommend tablets or PCs. Sorry if there are any hiccups, errors, or typos – they’re out of our hands.
          </p>
        </div>
      </div>
      <div className="whiteLayer"></div>
    </>
  );
}
