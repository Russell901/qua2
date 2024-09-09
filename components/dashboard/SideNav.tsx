import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Settings, Home, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`bg-white/10 w-64 min-h-screen ${isOpen ? 'block' : 'hidden'} md:block`}>
      <div className="flex items-center justify-center h-20">
        <span className="text-2xl font-semibold">QUA2</span>
      </div>
      <nav className="mt-6">
      <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Dashboard clicked")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
           <Link href={"/dashboard/hostels"}> <Home className="mr-2 h-4 w-4" />
           Hostels</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Bookings clicked")}>
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Guests clicked")}>
            <Users className="mr-2 h-4 w-4" />
            Guests
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Finances clicked")}>
            <DollarSign className="mr-2 h-4 w-4" />
            Finances
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Settings clicked")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
      </nav>
    </div>
  );
};

export default Sidebar;