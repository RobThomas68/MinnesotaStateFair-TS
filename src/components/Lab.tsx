import { useContext, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/Firestore";
import useAuth from "../hooks/useAuth";
import {
  FavoriteArrayType,
  FavoriteContext,
  FavoriteContextType,
} from "../context/FavoriteProvider";

const Lab = () => {
  const { favorites, setFavorites } = useContext(
    FavoriteContext
  ) as FavoriteContextType;

  const [user, setUser] = useState("");

  const { logout } = useAuth();

  const handleSaveClick = async () => {
    if (user) {
      console.log(user, favorites);
      await setDoc(doc(db, "users", user), { favorites });
    }
  };

  const handleLoadClick = async () => {
    if (user) {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const favs = docSnap.data().favorites as FavoriteArrayType;
        console.log("favs:", favs);
        setFavorites(favs);
      } else {
        console.log("No such document!");
      }
    }
  };

  const handleLogoutClick = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="Lab">
      <div>Lab</div>
      <div className="SaveLoadFavorites">
        <input
          type="text"
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
        <button type="button" onClick={handleLoadClick}>
          Load
        </button>
      </div>
      <div>
        <button type="button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
      <div>
        <button type="button" onClick={() => document.body.requestFullscreen()}>
          Request Fullscreen
        </button>
        <div>
          <button type="button" onClick={() => document.exitFullscreen()}>
            Exit Fullscreen
          </button>
        </div>
      </div>
    </main>
  );
};

export default Lab;
