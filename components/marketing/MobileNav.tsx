import {
    Sheet,
    SheetContent,    
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Separator } from "@/components/ui/separator";
  import NavItems from "./NavItems";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
  
  const MobileNav = () => {
    return (
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Menu/>
          </SheetTrigger>
          <SheetContent className=" flex flex-col justify-between py-6 gap-6 md:hidden bg-background/60 backdrop-blur-md border-none">
            
            <Separator className="border border-gray-50/5"/>
            <NavItems/>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    );
  };
  
  export default MobileNav;