import { useContext, useState } from "react";
import {
  FavoriteArrayType,
  FavoriteContext,
  FavoriteContextType,
} from "../context/FavoriteProvider";
import FavoriteFeed from "./FavoriteFeed";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/Firestore";

const Favorites = () => {
  const {
    favorites,
    setFavorites,
    favoriteSearchResults,
    favoriteSearch,
    setFavoriteSearch,
  } = useContext(FavoriteContext) as FavoriteContextType;

  const [user, setUser] = useState("");

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

  return (
    <>
      <div className="searchBar">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Vendors</label>
          <input
            id="search"
            type="search"
            placeholder="Search Favorites"
            value={favoriteSearch}
            onChange={(e) => setFavoriteSearch(e.target.value)}
          />
        </form>
      </div>

      <div>
        <input
          type="text"
          id="user"
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

      <main className="Favorites">
        {favoriteSearchResults.length ? (
          <FavoriteFeed feedItems={favoriteSearchResults} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No favorites to display.</p>
        )}
      </main>
    </>
  );
};

export default Favorites;
