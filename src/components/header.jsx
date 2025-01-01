"use client";

import { MoonIcon, SunIcon, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const user=useSelector((state)=>state.user.data)
  console.log(user)
  return (
    <header className="flex items-center justify-end p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-20">
<div className="block md:hidden mr-32"><Logo size="sm"/></div>
<div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-700 dark:text-gray-300"
        >
          <SunIcon  className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon  className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              {user?<> <User className="mr-2 h-4 w-4" /><a href="/alumni/dashboard">dashboard</a>
               </>:<><Button>Log out</Button>
              <LogOut className="mr-2 h-4 w-4" /></>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
