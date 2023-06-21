import { FavoriteArrayType } from "../context/FavoriteProvider";
import FavoriteFeedItem from "./FavoriteFeedItem";

interface Props {
  feedItems: FavoriteArrayType;
}

const FavoriteFeed = ({ feedItems }: Props) => {
  return (
    <>
      {feedItems.map((feedItem) => (
        <FavoriteFeedItem key={feedItem.id} feedItem={feedItem} />
      ))}
    </>
  );
};

export default FavoriteFeed;
