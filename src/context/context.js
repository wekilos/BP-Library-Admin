import React, { useState, useEffect, createContext } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  let [dil, setDil] = useState("TM");
  useEffect(() => {
    let dilData = localStorage.getItem("Dil");
    if (dilData) {
      setDil(JSON.parse(dilData));
    } else {
      setDil("TM");
      localStorage.setItem("Dil", JSON.stringify("TM"));
    }
  }, []);

  const ChangeDil = (event) => {
    setDil(event);
    localStorage.setItem("Dil", JSON.stringify(event));
  };

  //---------------------------------------------------------------------------------------------

  return (
    <Context.Provider
      value={{
        dil,
        ChangeDil,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
