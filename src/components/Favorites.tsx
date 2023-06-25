import { useContext } from "react";
import {
  FavoriteContext,
  FavoriteContextType,
} from "../context/FavoriteProvider";
import FavoriteFeed from "./FavoriteFeed";

const Favorites = () => {
  const { favoriteSearchResults, favoriteSearch, setFavoriteSearch } =
    useContext(FavoriteContext) as FavoriteContextType;

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
