import React, { useState } from "react";
import { useContextWishes } from "../context/useContextWishes";

const WishList = () => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedName, setEditedName] = useState("");
  const { wishes, deleteWish, clearWishes, editWish, saveChecked } =
    useContextWishes();

  const handleDelete = (idx) => {
    deleteWish(idx);
  };

  const handleClear = () => {
    clearWishes();
  };

  const handleEdit = (idx, currentName) => {
    setEditingIndex(idx);
    setEditedName(currentName);
  };
  const handleSave = (idx) => {
    console.log("Edited Name:", editedName);
    editWish(idx, editedName);
    setEditingIndex(-1);
  };

  const handleCheck = (idx) => {
    saveChecked(idx);
  };

  return (
    <div>
      {wishes.length === 0 ? (
        <p>The WishList is empty</p>
      ) : (
        <ul>
          {wishes.map((wish, idx) => (
            <li key={idx}>
              {editingIndex === idx ? (
                <form onSubmit={() => handleSave(idx)}>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <button type="submit">DONE</button>
                </form>
              ) : (
                <>
                  <span onClick={() => handleEdit(idx, wish.name)}>
                    {wish.name}
                  </span>
                  <input type="checkbox" onChange={() => handleCheck(idx)} />
                  <button onClick={() => handleDelete(idx)}>DELETE</button>
                </>
              )}
            </li>
          ))}
          <button onClick={handleClear}>Clear</button>
        </ul>
      )}
    </div>
  );
};

export default WishList;
