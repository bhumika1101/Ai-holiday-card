import React, { useContext } from "react";

import "./header-style.scss";
import { useNavigate, useParams } from "react-router";
import DataMapping from "../../context/DataMapping";

export default function Header() {
  const [data] = useContext(DataMapping);
  const { client_name } = useParams();
  const navigate = useNavigate("");
  return (
    <div className="header-section">
      <img
        src={`${process.env.REACT_APP_CONTENT}/images/logo.svg`}
        alt="dept_logo"
        onClick={() => {
          if (client_name) {
            navigate(`/${client_name}/`);
          } else {
            navigate(`/`);
          }
        }}
      />
      <span>AI Holiday Greeting card</span>
    </div>
  );
}
