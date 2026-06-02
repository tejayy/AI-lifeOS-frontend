import {
  LayoutDashboard,
  Target,
  CheckSquare,
  FileText,
  Smile,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Habits",
    path: "/habits",
    icon: Target,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Notes",
    path: "/notes",
    icon: FileText,
  },
  {
    label: "Mood",
    path: "/mood",
    icon: Smile,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
