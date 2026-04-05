"use client";

import { useRole } from "@/src/context/RoleContext";
import { useUser } from "@/src/context/UserContext";

import SettingsHeader from "../../freatures/settings/SettingsHeader";
import RoleSettingsCard from "../../freatures/settings/RoleSettingsCard";
import ProfileSettingsCard from "../../freatures/settings/ProfileSettingsCard";
import SecuritySettingsCard from "../../freatures/settings/SecuritySettingsCard";

export default function SettingsPage() {
  const { role } = useRole();
  const { user, updateUser } = useUser();

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <SettingsHeader />

      <RoleSettingsCard role={role} />

      <ProfileSettingsCard user={user} updateUser={updateUser} />

      <SecuritySettingsCard />
    </div>
  );
}