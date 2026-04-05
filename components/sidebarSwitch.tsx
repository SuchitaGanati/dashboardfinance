"use client";
 
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
 
export default function SideBarSwitch() {
  const pathname = usePathname();
  const isOpen = pathname.includes("add-listing");
 
  // Just render the Sidebar directly — DashboardLayout.Sidebar
  // already handles hiding it on mobile via `hidden lg:block`
  return <Sidebar />;
}