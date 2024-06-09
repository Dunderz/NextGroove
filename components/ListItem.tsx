"use client";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    // Add authentication before push
    router.push(href);
  };

  return (
    <button>
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p></p>
      <div></div>
    </button>
  );
};

export default ListItem;
