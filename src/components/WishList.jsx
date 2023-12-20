import React, { useState } from "react";
import { useContextWishes } from "../context/useContextWishes";
import wishlistImg from "../wishlist.svg";
import style from "./WishList.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import travelImg from "../travel_together.svg";
import coffeeImg from "../coffee.svg";
import studyingImg from "../studying.svg";
import bikeImg from "../bike.svg";
import videogameImg from "../videogames.svg";

const WishList = () => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedName, setEditedName] = useState("");
  const { wishes, deleteWish, clearWishes, editWish, saveChecked } =
    useContextWishes();

  const handleDelete = (id) => {
    deleteWish(id);
  };

  const handleClear = () => {
    clearWishes();
  };

  const handleEdit = (id, currentName) => {
    setEditingIndex(id);
    setEditedName(currentName);
  };
  const handleSave = (id) => {
    console.log("Edited Name:", editedName);
    editWish(id, editedName);
    setEditingIndex(-1);
  };

  const handleCheck = (id) => {
    saveChecked(id);
  };

  return (
    <div className={style.container}>
      {wishes.length === 0 ? (
        <div className={style.flexContainer}>
          <div className={style.leftSection}>
            <h1 className={style.title}>Start creating your wish list...</h1>
            <img src={wishlistImg} alt="create a wishlist" width={550} />
          </div>
          <div className={style.rightSection}>
            <div className={style.miniImgTop}>
              <img src={travelImg} alt="travel together" width={150} />
              <img src={coffeeImg} alt="coffee with friends" width={150} />
              <img src={studyingImg} alt="studying" width={150} />
            </div>
            <div className={style.miniImgBot}>
              <img src={bikeImg} alt="travel together" width={150} />
              <img src={videogameImg} alt="coffee with friends" width={150} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ul className={style.gridList}>
            {wishes.map((wish, id, idx) => (
              <div className={style.divForm}>
                <li className={style.gridItem} key={id}>
                  {editingIndex === idx ? (
                    <form onSubmit={() => handleSave(id)}>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                      <button type="submit" className={style.btnDone}>
                        DONE
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className={style.wishChecked}>
                        <span onClick={() => handleEdit(id, wish.name)}>
                          {wish.name}
                        </span>
                        <input
                          type="checkbox"
                          checked={wish.checked}
                          onChange={() => handleCheck(id)}
                        />
                      </div>
                      <div className={style.divBtnDelete}>
                        <button
                          onClick={() => handleDelete(id)}
                          className={style.btnDelete}
                        >
                          DELETE
                        </button>
                      </div>
                    </>
                  )}
                </li>
              </div>
            ))}
          </ul>
          <div className={style.btnClearContainer}>
            <button onClick={handleClear} className={style.btnClear}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default WishList;
