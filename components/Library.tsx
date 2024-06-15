"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
// import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import MediaItem from "./MediaItem";

import { Song } from "@/types";

const Library = () => {
  return (
    <div>
      <MediaItem></MediaItem>
    </div>
  );
};

export default Library;
