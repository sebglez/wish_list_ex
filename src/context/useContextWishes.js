import { createContext, useContext, useReducer, useEffect } from "react";

import axios from "axios";

const initialState = [];

const WishesContext = createContext(initialState);

async function wishesReducer(state, action) {
  switch (action.type) {
    case "ADD_WISH":
      const newWish = {
        name: action.payload,
        checked: false,
      };

      const wishList = await axios.post("http://localhost:3001/wish", newWish);
      console.log("New state after ADD_WISH:");
      return wishList;

    case "GET_WISHES":
      return action.payload;

    case "DELETE_WISH":
      const id = action.payload;
      const wishListDeleted = await axios.delete(
        `http://localhost:3001/wish/${id}`
      );
      return wishListDeleted;

    case "CLEAR_WISHES":
      localStorage.setItem("wishes", JSON.stringify([]));
      return [];

    case "EDIT_WISH":
      const updatedStateEdit = state.map((wish, id) => {
        if (id === action.payload.idd) {
          return { ...wish, name: action.payload.newWish };
        }
        return wish;
      });
      localStorage.setItem("wishes", JSON.stringify(updatedStateEdit));
      return updatedStateEdit;

    case "SAVE_CHECKED":
      const updatedStateChecked = state.map((wish) => {
        if (wish.id === action.payload.id) {
          return { ...wish, checked: !action.payload.newChecked };
        }
        return wish;
      });
      localStorage.setItem("wishes", JSON.stringify(updatedStateChecked));
      return updatedStateChecked;

    default:
      return state;
  }
}

function ContextProvider({ children }) {
  const [wishes, dispatch] = useReducer(wishesReducer, initialState);

  useEffect(() => {
    const storedWishes = localStorage.getItem("wishes");
    console.log("Stored wishes:", storedWishes);
    if (storedWishes) {
      dispatch({ type: "LOAD_WISHES", payload: JSON.parse(storedWishes) });
    }
  }, []);

  const addWish = (newWish) => {
    dispatch({ type: "ADD_WISH", payload: newWish });
  };

  const getWishes = (wishList) => {
    dispatch({ type: "GET_WISHES", payload: wishList });
  };

  const deleteWish = (oldWishId) => {
    dispatch({ type: "DELETE_WISH", payload: oldWishId });
  };

  const clearWishes = () => {
    dispatch({ type: "CLEAR_WISHES" });
  };

  const editWish = (id, newWish) => {
    dispatch({ type: "EDIT_WISH", payload: { id, newWish } });
  };
  const saveChecked = (id, isChecked) => {
    console.log(`ID: ${id}, isChecked: ${isChecked}`);
    dispatch({ type: "SAVE_CHECKED", payload: { id, isChecked } });
  };

  const value = {
    wishes,
    getWishes,
    addWish,
    deleteWish,
    clearWishes,
    editWish,
    saveChecked,
  };

  return (
    <WishesContext.Provider value={value}>{children}</WishesContext.Provider>
  );
}

function useContextWishes() {
  const context = useContext(WishesContext);
  return context;
}

export { ContextProvider, useContextWishes };
