"use client";

import useLoadImage from "@/hooks/useLoadImage";
// import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  // const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    //return player.play(data);
  };

  return (
    <div onClick={handleClick}>
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          className="object-cover"
          alt="Media Item"
        />
      </div>
      <div>
        <p>{data.title}</p>
        <p>{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
