import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoleSettingsCard({ role }: { role: string }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>User Role</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Current Role
          </label>

          <Select value={role} disabled>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin (Full Access)</SelectItem>
              <SelectItem value="viewer">Viewer (Read Only)</SelectItem>
            </SelectContent>
          </Select>

          <p className="text-xs text-gray-500 mt-2">
            {role === "admin"
              ? "You can add, edit, and delete transactions"
              : "You can only view transactions"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}