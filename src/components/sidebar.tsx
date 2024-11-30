import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Rss,
  Calendar,
  Lightbulb,
  Trophy,
  Image,
  Menu,
  Moon,
  Sun,
  LogOut,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "next-themes";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Rss, label: "Feed", id: "feed" },
  { icon: Calendar, label: "Events", id: "events" },
  { icon: Lightbulb, label: "Idea Hub", id: "idea-hub" },
  { icon: Trophy, label: "Tournaments", id: "tournaments" },
  { icon: Image, label: "Gallery", id: "gallery" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-4 w-fit z-50 transition-all duration-300 ${
          isOpen ? "md:left-[203px]" : "md:left-4"
        } right-4`}
      >
        <Button
          className="bg-transparent hover:bg-zinc-900/70 z-50 border-white border-opacity-40"
          variant="outline"
          size="icon"
          onClick={onClose}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-900 border-r border-gray-800 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center h-16 px-4">
            <h1 className="text-xl font-bold text-white">EASYVENT</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-violet-500/20 hover:text-white transition duration-300"
                    onClick={onClose}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer with Dropdown */}
          <div className="p-4 pb-3 border-t border-gray-600">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full h-full justify-start p-2 hover:bg-violet-600/10 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user?.photoURL || ""} />
                      <AvatarFallback>
                        {user?.displayName?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white text-start font-medium truncate">
                        {user?.displayName}
                      </p>
                      <p className="text-xs text-gray-300 text-start truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 cursor-pointer"
                align="end"
                side="top"
                sideOffset={10}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                {mounted && (
                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    className="cursor-pointer"
                  >
                    {theme === "light" ? (
                      <Moon className="mr-2 h-4 w-4" />
                    ) : (
                      <Sun className="mr-2 h-4 w-4" />
                    )}
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
