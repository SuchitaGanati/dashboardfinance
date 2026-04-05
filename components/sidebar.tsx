"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  CreditCard,
  LayoutDashboard,
  Settings,
  Target,
  Menu,
  X,
} from "lucide-react";
import { useRole } from "@/src/context/RoleContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NAV_ITEMS = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/",
    roles: ["admin", "viewer"],
  },
  {
    label: "Transactions",
    icon: ArrowLeftRight,
    href: "transaction",
    roles: ["admin"],
  },
  {
    label: "Accounts",
    icon: CreditCard,
    href: "accounts_cards",
    roles: ["admin"],
  },
  {
    label: "Insight",
    icon: Target,
    href: "insight",
    roles: ["admin", "viewer"],
  },
  {
    label: "Settings",
    icon: Settings,
    href: "settings",
    roles: ["admin", "viewer"],
  },
];

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(`/${href}`);
}

export default function Sidebar() {
  const pathname = usePathname();
  const { role, setRole } = useRole();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const filteredNav = NAV_ITEMS.filter((i) => i.roles.includes(role));
  const mainNav = filteredNav.filter((i) => i.label !== "Settings");
  const settingsNav = filteredNav.filter((i) => i.label === "Settings");

  const NavItem = ({ label, icon: Icon, href }: (typeof NAV_ITEMS)[0]) => {
    const active = isActive(href, pathname);
    return (
      <Link href={`/${href}`} className="block">
        <div
          className={[
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150",
            active
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          ].join(" ")}
        >
          <Icon size={18} strokeWidth={active ? 2 : 1.6} />
          <span className="text-sm font-medium">{label}</span>
          {active && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
          )}
        </div>
      </Link>
    );
  };

  const DesktopSidebar = () => (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 bg-background border-r border-border flex-col px-4 py-6 z-30">
      <SidebarContent
        NavItem={NavItem}
        mainNav={mainNav}
        settingsNav={settingsNav}
        role={role}
        setRole={setRole}
      />
    </aside>
  );

  const MobileDrawer = () => (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed top-3.5 left-4 z-40 w-9 h-9 rounded-xl bg-background border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div
        onClick={() => setDrawerOpen(false)}
        className={[
          "lg:hidden fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "lg:hidden fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 flex flex-col px-4 py-6",
          "shadow-2xl transition-transform duration-300 ease-in-out",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
        <SidebarContent
          NavItem={NavItem}
          mainNav={mainNav}
          settingsNav={settingsNav}
          role={role}
          setRole={setRole}
        />
      </aside>
    </>
  );

  const BottomTabBar = () => (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background border-t border-border flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
      {filteredNav.map(({ label, icon: Icon, href }) => {
        const active = isActive(href, pathname);
        return (
          <Link
            key={label}
            href={`/${href}`}
            className="flex flex-col items-center gap-0.5 min-w-13"
          >
            <div
              className={[
                "w-10 h-8 rounded-lg flex items-center justify-center transition-all duration-150",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              <Icon size={17} strokeWidth={active ? 2 : 1.5} />
            </div>
            <span
              className={[
                "text-[10px] font-medium tracking-wide",
                active ? "text-foreground" : "text-muted-foreground",
              ].join(" ")}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileDrawer />
      <BottomTabBar />
    </>
  );
}

function SidebarContent({
  NavItem,
  mainNav,
  settingsNav,
  role,
  setRole,
}: {
  NavItem: any;
  mainNav: typeof NAV_ITEMS;
  settingsNav: typeof NAV_ITEMS;
  role: "admin" | "viewer";
  setRole: (v: "admin" | "viewer") => void;
}) {
  return (
    <>
      <div className="mb-8 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-[11px] font-bold tracking-tight">
              D
            </span>
          </div>
          <h1 className="text-[15px] font-semibold text-foreground tracking-tight">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="mb-6 px-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
          Role
        </p>
        <Select
          value={role}
          onValueChange={(v: "admin" | "viewer") => setRole(v)}
        >
          <SelectTrigger className="w-full h-8 text-xs rounded-lg border-border bg-muted text-foreground focus:ring-1 focus:ring-ring">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-2">
        Menu
      </p>
      <nav className="flex flex-col gap-0.5">
        {mainNav.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="mt-auto">
        <div className="h-px bg-border mb-3" />
        {settingsNav.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </>
  );
}
