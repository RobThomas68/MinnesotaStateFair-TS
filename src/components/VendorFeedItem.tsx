import { useContext } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";

import { VendorType } from "../context/VendorProvider";
import {
  FavoriteContext,
  FavoriteContextType,
} from "../context/FavoriteProvider";

interface Props {
  feedItem: VendorType;
}

const VendorFeedItem = ({ feedItem }: Props) => {
  const { isFavorite, onFavoriteClick } = useContext(
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
      <p className="directions">{feedItem.directions}</p>
    </article>
  );
};

export default VendorFeedItem;
