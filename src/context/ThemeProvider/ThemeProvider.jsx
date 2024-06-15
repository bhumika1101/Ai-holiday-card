import React, { useState, useReducer, useEffect } from "react";
import ThemeContext from "../ThemeContext";

const ThemeProvider = ({ children }) => {
  const [content, setContent] = useState(0);
  return (
    <ThemeContext.Provider value={[content, setContent]}>
      {children}
    </ThemeContext.Provider>  
  );
};

export default ThemeProvider;
