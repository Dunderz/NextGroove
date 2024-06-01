import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import Link from "next/link";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  active,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex items-center h-auto gap-x-4 w-full hover:text-white transition text-neutral-400 font-medium py-1`,
        active && `text-white`
      )}
    >
      <Icon size={20} />
      <p>{label}</p>
    </Link>
  );
};

export default SidebarItem;
