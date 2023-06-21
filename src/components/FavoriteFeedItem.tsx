import { useContext } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import {
  FavoriteContext,
  FavoriteContextType,
  FavoriteType,
} from "../context/FavoriteProvider";

interface Props {
  feedItem: FavoriteType;
}
const FavoriteFeedItem = ({ feedItem }: Props) => {
  const { vendorFavoriteItemNames, isFavorite, onFavoriteClick } = useContext(
    FavoriteContext
  ) as FavoriteContextType;

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
      {Object.prototype.hasOwnProperty.call(feedItem, "directions") && (
        <p className="directions">{feedItem.directions}</p>
      )}
      {<p>{vendorFavoriteItemNames(feedItem.id).join(", ")}</p>}
    </article>
  );
};

export default FavoriteFeedItem;
