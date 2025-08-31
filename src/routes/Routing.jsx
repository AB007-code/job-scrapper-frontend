import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Sign from "../Sign";
import Section from "../Section";

const Routing = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let [isTrue, setIsTrue] = useState(false);
  let x = JSON.parse(localStorage.getItem("message"));
  useEffect(() => {
    setIsTrue(x);
  }, [x]);
  console.log(isTrue, location.pathname);
  if (isTrue && location.pathname == "/sign") {
    navigate("/");
  }
  if (!isTrue && location.pathname == "/") {
    navigate("/sign");
  }
  return (
    <>
      <Routes>
        <Route
          path={isTrue ? "/" : "/sign"}
          element={isTrue ? <Section /> : <Sign />}
        />
        {isTrue && location.pathname === "/sign" && (
          <Route path={"/"} element={<Section />} />
        )}
      </Routes>
    </>
  );
};

export default Routing;
