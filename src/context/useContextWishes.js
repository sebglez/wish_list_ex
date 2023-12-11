import { createContext, useContext, useReducer } from "react";

const initialState = [];
const WishesContext = createContext(initialState);

function wishesReducer(state, action) {
  switch (action.type) {
    case "ADD_WISH":
      return [...state, { name: action.payload, checked: false }];

    case "DELETE_WISH":
      const newState = state.filter((wish, index) => index !== action.payload);
      return newState;

    case "CLEAR_WISHES":
      return [];

    case "EDIT_WISH":
      return state.map((wish, index) => {
        if (index === action.payload.idx) {
          return { ...wish, name: action.payload.newWish };
        }
        return wish;
      });

    case "SAVE_CHECKED":
      return state.map((wish, index) => {
        if (index === action.payload.idx) {
          return { ...wish, checked: !wish.checked };
        }
        return wish;
      });

    default:
      break;
  }
}

function ContextProvider({ children }) {
  const [wishes, dispatch] = useReducer(wishesReducer, []);

  const addWish = (newWish) => {
    dispatch({ type: "ADD_WISH", payload: newWish });
  };

  const deleteWish = (oldWishIndex) => {
    dispatch({ type: "DELETE_WISH", payload: oldWishIndex });
  };

  const clearWishes = () => {
    dispatch({ type: "CLEAR_WISHES" });
  };

  const editWish = (idx, newWish) => {
    dispatch({ type: "EDIT_WISH", payload: { idx, newWish } });
  };

  const saveChecked = (idx, newChecked) => {
    dispatch({ type: "SAVE_CHECKED", payload: { idx } });
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
