import React from "react";
import { Link } from "react-router-dom";

const withHome = (WrappedComponent) => {
  const WithHome = () => {
    return (
      <>
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>
        <WrappedComponent />
      </>
    );
  };
  return WithHome;
};

export default withHome;
