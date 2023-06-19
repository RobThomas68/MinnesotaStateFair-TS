import { useContext } from "react";

import { FoodContext, FoodContextType } from "../context/FoodProvider";
import FoodFeed from "./FoodFeed";

const Foods = () => {
  const { foodSearchResults, foodSearch, setFoodSearch } = useContext(
    FoodContext
  ) as FoodContextType;
  return (
    <>
      <div className="searchBar">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Foods</label>
          <input
            id="search"
            type="search"
            placeholder="Search Foods"
            value={foodSearch}
            onChange={(e) => setFoodSearch(e.target.value)}
          />
        </form>
      </div>
      <main className="Foods">
        {foodSearchResults.length ? (
          <FoodFeed feedItems={foodSearchResults} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No foods to display.</p>
        )}
      </main>
    </>
  );
};

export default Foods;
