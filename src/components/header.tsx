import { Input } from "@/components/ui/input"; // ShadCN Input component

// Add onMenuClick to the Header component's props interface
interface HeaderProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

export const Header = ({ isSidebarOpen, onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 bg-transparent z-10 w-full shadow-md pt-4 pb-4">
      {/* Hide on mobile devices */}
      {/* ShadCN Search Bar */}
      <div
        className={`flex items-center space-x-2 w-[calc(100%-51px)] rounded-md transition-all duration-300 ease-in-out ${
          !isSidebarOpen
            ? "pl-0 md:w-full md:w-[calc(100%-51px)] md:pl-12"
            : "md:w-full"
        }`}
      >
        <Input
          placeholder="Search..."
          className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400 w-full outline-none"
        />
      </div>
    </header>
  );
};
