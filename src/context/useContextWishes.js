import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = [];
let idSum = 0;

const WishesContext = createContext(initialState);

function wishesReducer(state, action) {
  switch (action.type) {
    case "ADD_WISH":
      const newWish = {
        id: idSum++,
        name: action.payload,
        checked: false,
      };

      const newStateAdd = [...state, newWish];
      console.log("New state after ADD_WISH:", newStateAdd);
      localStorage.setItem("wishes", JSON.stringify(newStateAdd));
      return newStateAdd;

    case "DELETE_WISH":
      const newStateDelete = state.filter((wish, id) => id !== action.payload);
      localStorage.setItem("wishes", JSON.stringify(newStateDelete));
      return newStateDelete;

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
      const updatedStateChecked = state.map((wish, id) => {
        if (id === action.payload.idx) {
          return { ...wish, checked: !wish.checked };
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

  const deleteWish = (oldWishId) => {
    dispatch({ type: "DELETE_WISH", payload: oldWishId });
  };

  const clearWishes = () => {
    dispatch({ type: "CLEAR_WISHES" });
  };

  const editWish = (id, newWish) => {
    dispatch({ type: "EDIT_WISH", payload: { id, newWish } });
  };

  const saveChecked = (id, newChecked) => {
    dispatch({ type: "SAVE_CHECKED", payload: { id } });
  };

  const value = {
    wishes,
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
