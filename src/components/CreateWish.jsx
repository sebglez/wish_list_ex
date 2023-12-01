import React, { useState } from "react";
import { useContextWishes } from "../context/useContextWishes";

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
    <form onSubmit={handleSubmit}>
      <input
        name="wishTitle"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your wish"
        autoComplete="off"
      />
      <button type="submit">Add to Wishlist</button>
    </form>
  );
};

export default CreateWish;
