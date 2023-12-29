import React from "react";
import withHome from "../hoc/WithHome";
import { useContextWishes } from "../context/useContextWishes";

const ActiveWishes = () => {
  const { wishes } = useContextWishes();
  const activeWishes = wishes.filter((wish) => wish.checked === false);
  return (
    <div>
      <h3>Active Wishes:</h3>
      <ul>
        {activeWishes.map((wish, idx) => (
          <li key={idx}>{wish.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default withHome(ActiveWishes);
