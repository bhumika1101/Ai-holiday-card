import React, { useState, useRef, useEffect } from "react";
import "./Summary.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../PersonalisationPage/Button";
import summary from "../../Apis/summary/summary";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LoaderContext from "../../context/Loader/Loader";
import { useContext } from "react";
import DataMapping from "../../context/DataMapping";
import OpenAiTextCreation from "../../utility/OpenAiTextCreation";
import ThemeContext from "../../context/ThemeContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FALSE } from "sass";

const Summary = (props) => {
  const [slider, setSlider] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onFocus = () => {
    setIsHovered(true);
  };

  const onBlur = () => {
    setIsHovered(false);
  };

  const image = isHovered
    ? `${process.env.REACT_APP_CONTENT}/images/left-arrow.svg`
    : `${process.env.REACT_APP_CONTENT}/images/black-left-arrow.svg`;
  const imagePrev = isHoveredPrev
    ? `${process.env.REACT_APP_CONTENT}/images/left-arrow.svg`
    : `${process.env.REACT_APP_CONTENT}/images/black-left-arrow.svg`;

  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [summaryData, setSummaryData] = useState(null);
  const [content, setContent] = useContext(ThemeContext);
  const [SlideCount, setSlideCount] = useState(0);
  const [loader, setLoader] = useContext(LoaderContext);
  const [searchParams] = useSearchParams();
  const { client_name } = useParams();

  const storyId = searchParams.get("storyid")
    ? searchParams.get("storyid")
    : "";

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (event) => {
      if (event === 3) {
        setIsLastPage(true);
      } else if (event === 0) {
        setIsFirstPage(true);
      } else {
        setIsLastPage(false);
        setIsFirstPage(false);
      }
    },
    beforeChange: (current, next) => {
      //   setIsLastPage(next === data.length - 1);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 968,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    // debugger;
    setLoader(true);
    if (storyId) {
      summaryCallApi();
    } else {
      navigate("/");
    }
    setContent(0);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (windowWidth <= 768) {
      setIsHovered(false);
      setIsHoveredPrev(false);
      console.log(content, "content");
    }
  }, [SlideCount]);
  const summaryCallApi = () => {
    let requestObject = {
      header: {},
      body: {
        clientId: client_name ? client_name : "",
        storyId: storyId,
      },
    };
    summary(requestObject)
      .then((response) => {
        console.log("response: ", response);
        if (
          response.header.status.toUpperCase() == "SUCCESS" &&
          response.body.length !== 0
        ) {
          setSummaryData(response.body.storySummary);
        } else {
          setLoader(false);
          navigate("/error-page");
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        navigate("/error-page");
      });
  };

  const handleNext = () => {
    setSlideCount((crnt) => crnt + 1);
    slider.slickNext();
  };

  const handlePrev = () => {
    setSlideCount((crnt) => crnt + 1);
    slider.slickPrev();
  };

  const handleFinish = () => {
    console.log("Finish button clicked");
  };

  const copyLink = () => {
    setSlideCount((crnt) => crnt + 1);
    // debugger
    let url = "";
    if (client_name) {
      url =
        window.location.origin +
        window.location.pathname +
        `#/${client_name}/summary?storyid=${storyId}`;
    } else {
      url =
        window.location.origin +
        window.location.pathname +
        `#/summary?storyid=${storyId}`;
    }
    navigator.clipboard.writeText(url);
    toast("Copied to clipboard!", {
      position: "bottom-center",
      autoClose: true,
      closeOnClick: false,
      closeButton: false,
      isLoading: false,
      progress: false,
      theme: "dark",
    });
  };

  return (
    <div className="all-summary">
      <div className="content-btns">
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {summaryData ? (
            Object.keys(summaryData).map((d, index) => (
              <div className={`summary-info layout-${index}`} key={index}>
                <>
                  <div className="information">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: OpenAiTextCreation(
                          summaryData[d].promptMessage,
                          true
                        ).split("Option")[0],
                      }}
                    ></p>
                  </div>
                  <div className="image">
                    <img
                      src={
                        summaryData[d].promptImage
                          ? summaryData[d].promptImage
                          : `${process.env.REACT_APP_CONTENT}/images/image-bg-texture.svg`
                      }
                      alt={summaryData[d].promptMessage}
                      className="data-image"
                    />
                  </div>
                </>
                {/* )} */}
              </div>
            ))
          ) : (
            <>
              <div></div>
            </>
          )}
        </Slider>

        {isLastPage ? (
          <div className="prev-next-btns prev-next-btns-last">
            {/* <Button
              buttonLabel={"Previous"}
              className="homepage-btn home-page prev prev-last"
              onClick={handlePrev}
            ></Button> */}

            <Button
              onMouseEnter={() => {
                setIsHoveredPrev(true);
              }}
              onMouseLeave={() => {
                setIsHoveredPrev(false);
              }}
              className="homepage-btn ftr-btn prev"
              onClick={handlePrev}
              onTouchEnd={() => {
                setIsHoveredPrev(true);
              }}
            >
              Previous
              <img src={imagePrev} className="btn-arrow" alt="arrowIcon" />
            </Button>
            <div className="text-copy-btn">
              <span className="copy-text">
                Share your story with your friends!
              </span>
              <div className="finish-btn">
                {/* <Button
                  buttonLabel={"Copy Link"}
                  onClick={copyLink}
                  className="homepage-btn home-page finish"
                ></Button> */}

                <Button
                  onMouseEnter={onFocus}
                  onMouseLeave={onBlur}
                  className="homepage-btn ftr-btn"
                  onClick={copyLink}
                  onTouchEnd={() => {
                    setIsHovered(true);
                  }}
                >
                  Copy Link
                  <img src={image} className="btn-arrow" alt="arrowIcon" />
                </Button>
                <ToastContainer limit={1} />
              </div>
              {/* <ToastContainer/> */}
            </div>
          </div>
        ) : isFirstPage ? (
          <div className="prev-next-btns flex-end">
            {/* <Button
              buttonLabel={"Next"}
              className="homepage-btn home-page next"
              onClick={handleNext}
            ></Button> */}

            <Button
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              className="homepage-btn ftr-btn"
              onClick={handleNext}
              onTouchEnd={() => {
                setIsHovered(true);
              }}
            >
              Next
              <img src={image} className="btn-arrow" alt="arrowIcon" />
            </Button>
          </div>
        ) : (
          <div className="prev-next-btns">
            {/* <Button
              buttonLabel={"Previous"}
              className="homepage-btn home-page prev"
              onClick={handlePrev}
            ></Button> */}

            <Button
              onMouseEnter={() => {
                setIsHoveredPrev(true);
              }}
              onMouseLeave={() => {
                setIsHoveredPrev(false);
              }}
              className="homepage-btn ftr-btn prev"
              onClick={handlePrev}
              onTouchEnd={() => {
                setIsHoveredPrev(true);
              }}
            >
              Previous
              <img src={imagePrev} className="btn-arrow" alt="arrowIcon" />
            </Button>
            {/* <Button
              buttonLabel={"Next"}
              className="homepage-btn home-page next"
              onClick={handleNext}
            ></Button>
             */}
            <Button
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              className="homepage-btn ftr-btn next"
              onClick={handleNext}
              onTouchEnd={() => {
                setIsHovered(true);
              }}
            >
              Next
              <img src={image} className="btn-arrow" alt="arrowIcon" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
