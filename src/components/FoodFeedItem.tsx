import { useContext } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";

import { FoodType } from "../context/FoodProvider";
import { LookupContext, LookupContextType } from "../context/LookupProvider";
import {
  FavoriteContext,
  FavoriteContextType,
} from "../context/FavoriteProvider";

interface Props {
  feedItem: FoodType;
}

const FoodFeedItem = ({ feedItem }: Props) => {
  const { isFavorite, onFavoriteClick } = useContext(
    FavoriteContext
  ) as FavoriteContextType;
  const { itemVendorNames } = useContext(LookupContext) as LookupContextType;

  return (
    <article className="post">
      <div className="postHeader">
        <h3>{feedItem.name}</h3>
        <div className="push">
          {isFavorite(feedItem) ? (
            <BsStarFill
              onClick={() => onFavoriteClick(feedItem)}
              role="button"
              tabIndex="0"
            />
          ) : (
            <BsStar
              onClick={() => onFavoriteClick(feedItem)}
              role="button"
              tabIndex="0"
            />
          )}
        </div>
      </div>
      <p>{itemVendorNames(feedItem.id).join(", ")}</p>
    </article>
  );
};

export default FoodFeedItem;
