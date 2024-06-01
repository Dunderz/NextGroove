import { twMerge } from "tailwind-merge";
import Box from "./Box";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div>
      <div
        className={twMerge(
          `hidden md:flex flex-col gap-y-2 h-full w-[300px] bg-black p-2`
        )}
      >
        <Box>
          <div
            className="
              flex
              flex-col
              gap-y-4
              px-5
              py-4"
          ></div>
        </Box>
        <Box>
          <div>Hello</div>
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
