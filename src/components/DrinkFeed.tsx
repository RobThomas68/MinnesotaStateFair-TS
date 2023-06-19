import { DrinkArrayType } from "../context/DrinkProvider";
import DrinkFeedItem from "./DrinkFeedItem";

interface Props {
  feedItems: DrinkArrayType;
}

const DrinkFeed = ({ feedItems }: Props) => {
  return (
    <>
      {feedItems.map((feedItem) => (
        <DrinkFeedItem key={feedItem.id} feedItem={feedItem} />
      ))}
    </>
  );
};

export default DrinkFeed;
