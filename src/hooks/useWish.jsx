import { useState } from "react";

export const useWishes = (initialState) => {
  const [wishes, setWishes] = useState(initialState);

  return [wishes, setWishes];
};
