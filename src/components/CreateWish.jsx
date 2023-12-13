import React, { useState } from "react";
import { useContextWishes } from "../context/useContextWishes";
import style from "./WishList.module.scss";

const CreateWish = () => {
  const { addWish } = useContextWishes();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addWish(inputValue);
      setInputValue(""); // Limpiar el campo de entrada después de enviar el deseo
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={style.styleForm}>
      <input
        name="wishTitle"
        type="text"
        className={style.labelWish}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your wishes"
        autoComplete="off"
      />
      <button type="submit" className={style.btnAdd}>
        Add to Wishlist
      </button>
    </form>
  );
};

export default CreateWish;
