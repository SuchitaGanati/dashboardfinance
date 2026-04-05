



"use client";

import { Bell, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/src/context/UserContext";
import SearchInput from "./searchInput";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Morning";
  if (h < 18) return "Afternoon";
  return "Evening";
};

export default function DashboardNavbar() {
  const greeting = getGreeting();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  return (
    <header className="h-14 lg:h-16 flex items-center justify-between px-4 lg:px-6 bg-background border-b border-border w-full gap-3">

      {/* LEFT */}
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
         {/* ❌ DO NOT SHRINK */}
         <h1 className="text-sm font-semibold text-stone-800 dark:text-stone-100 whitespace-nowrap shrink-0">
           Finance Dashboard
         </h1>

         {/* Divider */}
         <div className="h-6 w-px bg-stone-200 dark:bg-stone-700 shrink-0" />

         {/* ✅ ALLOW SHRINK */}
         <div className="hidden sm:flex items-center gap-2 min-w-0 flex-1">
           <p className="text-[11px] text-stone-400 uppercase whitespace-nowrap shrink-0">
             Good {greeting}
           </p>

           {/* 👇 THIS WILL SHRINK/TRUNCATE */}
           <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 truncate">
             {user?.name ?? "Suchita"}
           </p>
         </div>
       </div>
      </div>

      {/* CENTER — search */}
      <div className="flex-1 min-w-0 max-w-md">
        <SearchInput />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1 lg:gap-2 shrink-0">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark"
            ? <Sun size={16} className="text-amber-400" />
            : <Moon size={16} className="text-muted-foreground" />}
        </button>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
        </button>

        <div className="h-5 w-px bg-border mx-1" />

        {/* User chip */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-accent transition-colors">
          <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground shrink-0">
            SK
          </div>
          <div className="hidden md:flex flex-col items-start leading-none">
            <span className="text-xs font-semibold text-foreground">
              {user?.name ?? "Suchita K"}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Personal</span>
          </div>
          <ChevronDown size={13} className="hidden md:block text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
