import { FoodArrayType } from "../context/FoodProvider";
import FoodFeedItem from "./FoodFeedItem";

interface Props {
  feedItems: FoodArrayType;
}

const FoodFeed = ({ feedItems }: Props) => {
  return (
    <>
      {feedItems.map((feedItem) => (
        <FoodFeedItem key={feedItem.id} feedItem={feedItem} />
      ))}
    </>
  );
};

export default FoodFeed;
