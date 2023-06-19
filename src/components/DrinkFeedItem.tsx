import { Link } from "react-router-dom";
import { useContext } from "react";

import { DrinkType } from "../context/DrinkProvider";
import { LookupContext, LookupContextType } from "../context/LookupProvider";
// import { BsStarFill, BsStar } from 'react-icons/bs'

interface Props {
  feedItem: DrinkType;
}

const DrinkFeedItem = ({ feedItem }: Props) => {
  // const { isFavorite, onFavoriteClick } = useContext(DataContext);
  const { itemVendorNames } = useContext(LookupContext) as LookupContextType;

  return (
    <article className="post">
      <div className="postHeader">
        <Link to={`/drink/${feedItem.id}`}>
          <h3>{feedItem.name}</h3>
        </Link>
        {/* <div className="push">
                    {
                        isFavorite(feedItem) ?
                            <BsStarFill onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" /> :
                            <BsStar     onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />
                    }
                </div> */}
      </div>
      <p>{itemVendorNames(feedItem.id).join(", ")}</p>
    </article>
  );
};

export default DrinkFeedItem;
