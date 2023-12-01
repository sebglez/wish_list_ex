import React from "react";
import { useContextWishes } from "../context/useContextWishes";

export function Counter() {
  const { wishes } = useContextWishes();
  const totalItems = wishes.length;

  return (
    <footer>
      <p>Total Wishes: {totalItems}</p>
    </footer>
  );
}
