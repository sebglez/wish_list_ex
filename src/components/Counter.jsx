import React from "react";
import { useContextWishes } from "../context/useContextWishes";
import { Link } from "react-router-dom";
import style from "./Counter.module.scss";

const Counter = () => {
  const { wishes } = useContextWishes();
  const totalItems = wishes.length;

  return (
    <footer className={style.footerContainer}>
      <p>Total Wishes: {totalItems}</p>
      <Link to={"/completed"}>
        <p>Completed Wishes</p>{" "}
      </Link>
      <Link to={"/active"}>
        <p>Active Wishes</p>
      </Link>
    </footer>
  );
};

export default Counter;
