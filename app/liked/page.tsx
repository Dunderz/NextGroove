import Image from "next/image";

import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";

import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  return <div></div>;
};

export default Liked;
