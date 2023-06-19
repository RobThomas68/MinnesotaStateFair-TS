import { VendorArrayType } from "../context/VendorProvider";
import VendorFeedItem from "./VendorFeedItem";

interface Props {
  feedItems: VendorArrayType;
}

const VendorFeed = ({ feedItems }: Props) => {
  return (
    <>
      {feedItems.map((feedItem) => (
        <VendorFeedItem key={feedItem.id} feedItem={feedItem} />
      ))}
    </>
  );
};

export default VendorFeed;
