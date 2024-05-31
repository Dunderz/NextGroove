import { twMerge } from "tailwind-merge";

interface BoxProps {
  className?: string;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ className, children }) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};

export default Box;
