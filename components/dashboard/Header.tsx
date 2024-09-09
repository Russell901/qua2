import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white/10">
      <Button variant="ghost" className="md:hidden" onClick={onMenuClick}>
        <LayoutDashboard className="h-6 w-6" />
      </Button>
      <Input type="search" placeholder="Search..." className="w-64" />
      <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </header>
  );
};

export default Header;