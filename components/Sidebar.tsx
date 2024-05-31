import Box from "./Box";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div>
      <Box>
        <div>Hello</div>
      </Box>
    </div>
  );
};

export default Sidebar;
