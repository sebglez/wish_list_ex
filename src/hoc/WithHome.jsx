import React from "react";
import { Link } from "react-router-dom";
import style from "./WithHome.module.css";

const withHome = (WrappedComponent) => {
  const WithHome = () => {
    return (
      <>
        <Link to={"/"}>
          <navbar className={style.home}>Home</navbar>
        </Link>
        <WrappedComponent />
      </>
    );
  };
  return WithHome;
};

export default withHome;
