import React from "react";
import withHome from "../hoc/WithHome";
import { useContextWishes } from "../context/useContextWishes";

const CompletedWishes = () => {
  const { wishes } = useContextWishes();
  const completedWishes = wishes.filter((wish) => wish.checked === true);

  return (
    <div>
      <h3>Completed Wishes:</h3>
      <ul>
        {completedWishes.map((wish, idx) => (
          <li key={idx}>{wish.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default withHome(CompletedWishes);
