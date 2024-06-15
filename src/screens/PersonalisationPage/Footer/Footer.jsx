import React, { useContext, useEffect, useState } from "react";
import "./Footer.scss";
import ThemeContext from "../../../context/ThemeContext";
import Input from "../Input";
import Button from "../Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LoaderContext from "../../../context/Loader/Loader";
import DataMapping from "../../../context/DataMapping";
import { STOREDATA } from "../../../context/DataMapping/action/action.type";
import conversation from "../../../Apis/conversation";

const Footer = ({ screenWidth }) => {
  const { client_name } = useParams();
  const [content, setContent] = useContext(ThemeContext);
  const [loader, setLoader] = useContext(LoaderContext);
  const [data, dispatchData, personalisationData, setPersonalisationData] =
    useContext(DataMapping);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const onFocus = () => {
    setIsHovered(true);
  };

  const onBlur = () => {
    setIsHovered(false);
  };

  const image = isHovered
    ? `${process.env.REACT_APP_CONTENT}/images/left-arrow.svg`
    : `${process.env.REACT_APP_CONTENT}/images/black-left-arrow.svg`;

  const navigateToCreativeHub = () => {
    // setContent((content) => content + 1);
    return setTimeout(() => {
      setLoader(true);
    }, 700);
  };

  useEffect(() => {
    dispatchData({
      name: "userDetails",
      keyName: "userInputs",
      type: STOREDATA,
      payload: [],
    });
    setPersonalisationData({
      country: "",
      eod: "",
      genre: "",
      style: "",
    });
  }, []);
  useEffect(() => {
    if (loader) {
      console.log("userDetails: ", data?.userDetails);
      let requestObject = {
        header: {
          storyInit: true,
          clientId: client_name ? client_name : "",
          step: 1,
          storyId: "",
        },
        body: {
          messages: [
            {
              role: "assistant",
              content: "Which Country are you from?",
            },
            {
              role: "user",
              content: data?.userDetails[0]?.country
                ? JSON.stringify(data?.userDetails[0]?.country)
                : "This will help me set the scene in either a stunning summer or a winter wonderland for your holiday season!",
            },
            {
              role: "assistant",
              content:
                "Do you have any unique ways of celebrating the end-of-year holidays?",
            },
            {
              role: "user",
              content: data?.userDetails[0]?.eod
                ? JSON.stringify(data?.userDetails[0]?.eod)
                : "Maybe there's music and dancing? Some beloved sweet treats? Perhaps a feast with family and friends?",
            },
            {
              role: "assistant",
              content: "What genre are you in the mood for today?",
            },
            {
              role: "user",
              content: data?.userDetails[0]?.genre
                ? JSON.stringify(data?.userDetails[0]?.genre)
                : "sci-fi",
            },
            {
              role: "assistant",
              content: "What visual art style would you like to see?",
            },
            {
              role: "user",
              content: data?.userDetails[0]?.defination
                ? data?.userDetails[0]?.defination +
                  " " +
                  "let's start the story"
                : data?.userDetails[0]?.style
                ? JSON.stringify(
                    data?.userDetails[0]?.style + " " + "let's start the story"
                  )
                : "3d-art let's start the story",
            },
          ],
        },
      };
      conversation(requestObject)
        .then((response) => {
          console.log(JSON.stringify(response));
          setContent(0);
          if (response.header.status.toUpperCase() == "SUCCESS") {
            dispatchData({
              name: "storyData1",
              type: STOREDATA,
              payload: {
                promptMessage: response?.body?.promptMessage,
                promptImage: response.body.promptImage,
                storyId: response?.body.storyId,
              },
            });

            dispatchData({
              name: "initResponse",
              type: STOREDATA,
              payload: {
                messages: response?.body?.messages,
              },
            });
            // dispatchData({
            //   name: "userDetails",
            //   keyName: "userInputs",
            //   type: STOREDATA,
            //   payload: [],
            // });
            // setPersonalisationData({
            //   country: "",
            //   eod: "",
            //   genre: "",
            //   style: "",
            // });
            setTimeout(() => {
              setLoader(false);
              if (data.clientDetails[0].response) {
                navigate(`/${client_name}/creative-hub`);
              } else {
                navigate(`/creative-hub`);
              }
            }, 200);
            console.log("conversation ", response);
          } else {
            setLoader(false);
            if (client_name) {
              navigate(`/${client_name}/error-page`);
            } else {
              navigate(`/error-page`);
            }
          }
        })
        .catch((error) => {
          console.log("conversation error : ", error);
          setContent(0);
          setLoader(false);
          if (client_name) {
            navigate(`/${client_name}/error-page`);
          } else {
            navigate(`/error-page`);
          }
        });
    }
  }, [loader]);
  useEffect(() => {
    if (content == 1) {
      setIsHovered(false);
    }
    if (content > 1 && screenWidth <= 768) {
      setIsHovered(false);
    }
    if (content == 2) {
      // setIsHovered(true);
    }
    if (content == 5) {
      navigateToCreativeHub();
    }
    console.log("content: ", content);
  }, [content]);

  useEffect(() => {
    dispatchData({
      name: "userDetails",
      keyName: "userInputs",
      type: STOREDATA,
      payload: personalisationData,
    });
  }, [personalisationData]);

  const updateData = (event) => {
    if (event.key === "Enter") {
      setContent((count) => count + 1);
      console.log(event.target.value);
      setPersonalisationData((data) => {
        return {
          ...data,
          [event.target.getAttribute("data-variant")]: event.target.value,
        };
      });
    }
  };
  function renderFooterComponents() {
    switch (content) {
      case 0:
        return (
          <>
            <Button
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              className="homepage-btn ftr-btn"
              onClick={() => {
                setContent((content) => content + 1);
              }}
              onTouchEnd={() => {
                setIsHovered(true);
              }}
            >
              Let's get started
              <img src={image} className="btn-arrow" alt="arrowIcon" />
            </Button>
            <p className="footer-desc">
              This unique experience leverages the advanced capabilities of aI,
              including GPT-4 and DALL-E 3, to define your unique aura and
              deliver personaliSed content crafted just for you.
            </p>
          </>
        );

      case 1:
        return (
          <>
            <Input
              className="footer-inp"
              value={personalisationData.country}
              data-variant="country"
              onKeyPress={updateData}
              onChange={(e) => {
                setPersonalisationData((data) => {
                  return {
                    ...data,
                    country: e.target.value,
                  };
                });
              }}
              placeholder="Enter your country"
            />
            <Button
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              className="homepage-btn ftr-btn"
              onClick={() => {
                setContent((content) => content + 1);
              }}
              onTouchEnd={() => {
                setIsHovered(true);
              }}
            >
              Next
              <img src={image} className="btn-arrow" alt="arrowIcon" />
            </Button>
          </>
        );

      case 2:
        return (
          <>
            <Input
              className="footer-inp"
              value={personalisationData.eod}
              data-variant="eod"
              onKeyPress={updateData}
              onChange={(e) => {
                setPersonalisationData((data) => {
                  return {
                    ...data,
                    eod: e.target.value,
                  };
                });
              }}
              placeholder="Enter any end-of-year holiday"
            />
            <Button
              className="homepage-btn ftr-btn"
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              onClick={() => {
                setContent((content) => content + 1);
              }}
              onTouchEnd={() => {
                setIsHovered(true);
              }}
            >
              Next
              <img src={image} className="btn-arrow" alt="arrowIcon" />
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Input
              className="footer-inp"
              value={personalisationData.genre}
              data-variant="genre"
              onKeyPress={updateData}
              onChange={(e) => {
                setPersonalisationData((data) => {
                  return {
                    ...data,
                    genre: e.target.value,
                  };
                });
              }}
              placeholder="Enter any genre "
            />
            <Button
              className="homepage-btn ftr-btn"
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              onClick={() => {
                setContent((content) => content + 1);
              }}
              onTouchEnd={() => {
                setIsHovered(true);
              }}
            >
              Next
              <img src={image} className="btn-arrow" alt="arrowIcon" />
            </Button>
          </>
        );
      case 4:
      case 5:
      case 6:
        return (
          <>
            <Input
              className="footer-inp"
              value={personalisationData.style}
              data-variant="style"
              onKeyPress={updateData}
              onChange={(e) => {
                setPersonalisationData((data) => {
                  return {
                    ...data,
                    style: e.target.value,
                  };
                });
              }}
              placeholder="Enter any art style"
            />
            <Button
              className="homepage-btn ftr-btn"
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              onClick={() => {
                setContent((content) => content + 1);
              }}
              onTouchEnd={() => {
                setIsHovered(true);
              }}
            >
              Ready to explore?
              <img src={image} className="btn-arrow" alt="arrowIcon" />
            </Button>
          </>
        );

      default:
        break;
    }
  }
  return <div className="footer">{renderFooterComponents()}</div>;
};

export default Footer;
