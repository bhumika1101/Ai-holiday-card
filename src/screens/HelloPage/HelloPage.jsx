import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//SCSS
import "./hello-page-style.scss";
import fetchClientDetails from "../../Apis/fetch-client-detail";
import DataMapping from "../../context/DataMapping";
import { STOREDATA } from "../../context/DataMapping/action/action.type";
import ThemeContext from "../../context/ThemeContext";
import { flushSync } from "react-dom";

export default function HelloPage() {
  const { client_name } = useParams();
  const navigate = useNavigate();

  const [animation, setAnimation] = useState("");
  const [, setContent] = useContext(ThemeContext);
  const [customerName, setCustomerName] = useState("");
  const [customerUrl, setCustomerUrl] = useState("");
  const [displayHello, setDisplayHello] = useState(false);

  const [data, dispatchData] = useContext(DataMapping);
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (client_name) {
      let request = {
        header: {},
        body: {
          clientId: client_name,
        },
      };
      fetchClientDetails(request)
        .then((response) => {
          console.log("Response: ", response);
          if (response.header.status.toUpperCase() == "SUCCESS") {
            flushSync(() => {
              setCustomerUrl(response.body.imageUrl);
              setCustomerName(response.body.companyName);
              setAnimation("start");
              dispatchData({
                name: "clientDetails",
                type: STOREDATA,
                payload: {
                  response,
                },
              });
            });
            setTimeout(() => {
              setAnimation("end");
            }, 2000);
          } else {
            navigate("/error-page");
          }
        })
        .catch((error) => {
          navigate("/error-page");
        });
    } else {
      flushSync(() => {
        setCustomerName("Guest");
        setAnimation("start");
        dispatchData({
          name: "clientDetails",
          type: STOREDATA,
          payload: {},
        });
      });
      setTimeout(() => {
        setAnimation("end");
      }, 2000);
    }
    setContent(0);

    setTimeout(function () {
      if (client_name) {
        navigate(`/${client_name}/cover-page`);
      } else {
        navigate(`/cover-page`);
      }
    }, 13000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDisplayHello(true);
    }, 10000);
  }, []);

  return (
    <div className="helloPage-section">
      <div className="helloPage-content">
        {/* <div className='welcome'>
          <p className="welcome-text">Welcome</p>
        </div> */}
        <p className={`welcome-text ${animation ? animation : "d-none"}`}>
          Welcome
        </p>
        <div className="hello-circle-images">
          {/* <img
            src={`${process.env.REACT_APP_CONTENT}/images/circle.svg`}
            className="circle-img"
            alt="circle"
          /> */}

          <div className="icon circle circle-img">
            <svg
              id="etDsHKTlJvu1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 480"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
            >
              <g clip-path="url(#etDsHKTlJvu5)">
                <g transform="matrix(.952966 0 0 0.945825 11.287972 13.002)">
                  <path
                    d="M90.4242,48.6498h13.8388v-6.9798h6.996v-6.9397h13.952v-6.9075h13.815v-7.0601h13.983v-6.9236h20.932v-6.93158h34.786v-6.90752h62.674v6.93161h34.69v6.86739h20.859v6.9155h13.896v7.036h14.064v6.8995h13.799v6.8834h6.979v7.1164h13.912v6.8352h7.044v7.0119h6.827v7.0361h7.02v6.7629h6.964v7.0923h6.907v7.0199h7.061v13.8069h6.867v6.98h6.883v13.992h7.141v13.799h6.883v13.975h6.884v20.892h7.028v41.734h6.883v48.666h-6.723v41.726h-7.076v20.883h-6.883v13.96h-6.98v14.048h-7.06v13.839h-6.828v7.044h-7.003v6.819h-7.036v14h-6.796v6.827h-7.011v7.052h-7.004v6.948h-6.892v6.867h-13.992v7.108h-6.899v6.932h-6.972v6.827h-13.823v7.124h-14.128v6.972h-13.879v6.827h-20.892v7.077h-41.798v6.867h-48.594v-6.787h-41.734v-7.028h-20.819v-6.883h-14.112v-6.956h-13.799v-7.06h-13.847v-6.892h-7.109v-6.947h-13.7985v-7.061h-7.02v-6.827h-7.036v-7.028h-6.8272v-7.02h-7.036v-6.827h-7.02v-7.044h-6.7549v-13.751h-7.1243v-7.14h-6.9558v-13.799h-6.8272v-13.992h-7.1083v-13.976h-6.9235v-20.859h-6.8674v-34.682h-7.0039v-62.601h6.87539v-34.859h6.85931v-20.859h6.9878v-14.048h7.0682v-13.823h6.8272v-13.879h7.0119v-7.06h7.0601v-13.8477h6.8272v-6.9878h6.9557v-7.036h7.0602v-6.787h6.787v-7.0682h7.0441v-7.028h7.0601v-6.8995-.008Z"
                    fill="none"
                    stroke="#000"
                    stroke-width="13"
                  />
                </g>
                <clipPath id="etDsHKTlJvu5">
                  <rect width="480" height="480" rx="0" ry="0" fill="#fff" />
                </clipPath>
              </g>
            </svg>
          </div>

          {/* <div className="icon circle circle-img">
            <svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2295_4621)">
                <path d="M90.4242 48.6498H104.263V41.67H111.259V34.7303H125.211V27.8228H139.026V20.7627H153.009V13.8391H173.941V6.90752H208.727V0H271.401V6.93161H306.091V13.799H326.95V20.7145H340.846V27.7505H354.91V34.65H368.709V41.5334H375.688V48.6498H389.6V55.485H396.644V62.4969H403.471V69.533H410.491V76.2959H417.455V83.3882H424.362V90.4081H431.423V104.215H438.29V111.195H445.173V125.187H452.314V138.986H459.197V152.961H466.081V173.853H473.109V215.587H479.992V264.253H473.269V305.979H466.193V326.862H459.31V340.822H452.33V354.87H445.27V368.709H438.442V375.753H431.439V382.572H424.403V396.572H417.607V403.399H410.596V410.451H403.592V417.399H396.7V424.266H382.708V431.374H375.809V438.306H368.837V445.133H355.014V452.257H340.886V459.229H327.007V466.056H306.115V473.133H264.317V480H215.723V473.213H173.989V466.185H153.17V459.302H139.058V452.346H125.259V445.286H111.412V438.394H104.303V431.447H90.5045V424.386H83.4845V417.559H76.4485V410.531H69.6213V403.511H62.5853V396.684H55.5653V389.64H48.8104V375.889H41.6861V368.749H34.7303V354.95H27.9031V340.958H20.7948V326.982H13.8713V306.123H7.0039V271.441H0V208.84H6.87539V173.981H13.7347V153.122H20.7225V139.074H27.7907V125.251H34.6179V111.372H41.6298V104.312H48.6899V90.4643H55.5171V83.4765H62.4728V76.4405H69.533V69.6535H76.32V62.5853H83.3641V55.5573H90.4242V48.6578V48.6498ZM167.009 459.253H194.912V465.92H285.272V459.189H313.208V452.249H327.015V445.109H340.934V438.314H354.974V431.358H368.781V424.282H375.809V417.415H382.692V410.483H396.66V403.391H403.584V396.532H410.612V382.5H417.607V375.68H424.33V368.717H431.487V354.781H438.434V340.806H445.318V326.894H452.306V313.079H459.318V285.136H465.992V194.712H459.189V166.881H452.249V152.913H445.149V132.094H438.322V125.114H431.366V111.235H424.306V104.223H417.471V90.3599H410.443V83.3078H403.471V76.3602H396.58V69.4767H389.56V62.4166H375.761V55.4609H368.717V48.6418H354.878V41.5656H347.817V34.6259H334.01V27.7184H313.103V20.6744H285.16V13.8953H194.76V20.7466H166.929V27.855H146.046V34.7464H132.094V41.5897C130.175 41.5897 128.432 41.6379 126.697 41.5736C125.54 41.5254 125.163 41.9913 125.203 43.0997C125.259 44.8908 125.219 46.682 125.219 48.698H111.267V55.5734H104.295V62.5291H90.4242V69.5812H83.4042V76.4003H76.3682V83.4364H69.549V90.4563H62.4969V104.263H55.5252V111.38H48.6337V125.235H41.5736V132.207H34.6099V146.086H27.7907V166.977H20.7627V194.816H13.9917V285.216H20.7627V313.167H27.871V333.994H34.7705V347.866H41.6459V354.942H48.7783V368.773H55.6055V375.745H62.5612V389.616H69.6133V396.708H76.4967V403.455H83.4444V410.507H90.4965V417.535H104.352V424.362H111.364V431.406H125.179V438.37H132.295V445.27H153.122V452.378H167.001V459.237L167.009 459.253Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_2295_4621">
                  <rect width="480" height="480" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div> */}

          {!displayHello ? (
            <div className="hello-images">
              {/* <img 
              src='./content/images/hello-animate.png'
            /> */}
              <img
                src={`${process.env.REACT_APP_CONTENT}/images/h-vector-letter.svg`}
                className="letter-images h-letter"
                alt="h-letter"
              />

              <img
                src={`${process.env.REACT_APP_CONTENT}/images/e-vector-letter.svg`}
                className="letter-images e-letter"
                alt="e-letter"
              />

              <img
                src={`${process.env.REACT_APP_CONTENT}/images/L-image.svg`}
                className="letter-images l-letter" 
                alt="l-letter"
              />

              <img
                src={`${process.env.REACT_APP_CONTENT}/images/l-vector-letter-second.svg`}
                className="letter-images l-letter"
                alt="l-letter"
              />

              <img
                src={`${process.env.REACT_APP_CONTENT}/images/o-vector-letter.svg`}
                className="letter-images o-letter"
                alt="o-letter"
              />
            </div>
          ) : (
            <div className="hello-images">
              <img src="./content/images/hello.png" alt="hello image" />
            </div>
          )}
        </div>
        <div className="companyDetails">
          {customerUrl ? (
            <img
              src={customerUrl}
              className={`clientName-text img ${
                animation ? animation : "d-none"
              }`}
            />
          ) : (
            <p
              className={`clientName-text ${animation ? animation : "d-none"}`}
            >
              {customerName ? customerName : "Guest"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
