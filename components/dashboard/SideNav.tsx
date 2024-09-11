import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Settings,
  Home,
  DollarSign,
} from "lucide-react";
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div
      className={`bg-background w-64 min-h-screen ${
        isOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="flex items-center justify-center h-20">
        <span className="text-2xl text-foreground font-semibold">QUA2</span>
      </div>
      <nav className="mt-6">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => handleNavigation("/dashboard")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => handleNavigation("/dashboard/hostels")}
        >
          <Home className="mr-2 h-4 w-4" />
          Hostels
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => handleNavigation("/dashboard/guests")}
        >
          <Users className="mr-2 h-4 w-4" />
          Guests
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => handleNavigation("/dashboard/finances")}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Finances
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            console.log("Settings clicked");
            onClose();
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
