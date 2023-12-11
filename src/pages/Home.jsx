import React from "react";
import WishList from "../components/WishList";
import CreateWish from "../components/CreateWish";
import Counter from "../components/Counter";
import withHome from "../hoc/WithHome";

const Home = () => {
  return (
    <div>
      <WishList />
      <CreateWish />
      <Counter />
    </div>
  );
};

export default withHome(Home);
