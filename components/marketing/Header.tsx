import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-2 px-10">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <h1 className="text-3xl font-black">QUA2</h1>
        </Link>
        <nav className="hidden md:flex justify-between w-full max-w-xs">
          <NavItems />
        </nav>
        <div className="flex w-32 justify-end gap-3">
          <MobileNav />
          <Button asChild className="hidden md:flex">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
