import React, { useState } from "react";
import LoaderContext from "./Loader";

export default function LoaderProvider({ children }) {
  const [loader, setLoader] = useState(false);
  return (
    <LoaderContext.Provider value={[loader, setLoader]}>
      {children}
    </LoaderContext.Provider>
  );
}
