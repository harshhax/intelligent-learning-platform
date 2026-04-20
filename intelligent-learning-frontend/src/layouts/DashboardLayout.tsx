import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, PenTool, BarChart3, AlertTriangle,
  CalendarDays, Lightbulb, Trophy, MessageCircle, User, LogOut,
  Settings, Users, Upload, FileText, Bell
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const studentMenu = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Take Quiz", url: "/quiz", icon: PenTool },
  { title: "Results", url: "/results", icon: BarChart3 },
  { title: "Weak Topics", url: "/weak-topics", icon: AlertTriangle },
  { title: "Study Plan", url: "/study-plan", icon: CalendarDays },
  { title: "Recommendations", url: "/recommendations", icon: Lightbulb },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Discussion Forum", url: "/forum", icon: MessageCircle },
  { title: "Profile", url: "/profile", icon: User },
];

const adminMenu = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Question Upload", url: "/admin/questions", icon: Upload },
  { title: "Study Materials", url: "/admin/materials", icon: FileText },
  { title: "Student Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "All Students", url: "/admin/students", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const menu = user?.role === "admin" ? adminMenu : studentMenu;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar — icon-only, expands on hover */}
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border shadow-sm transition-all duration-300 overflow-hidden",
          hovered ? "w-56" : "w-[72px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4 shrink-0">
          <img src={logo} alt="LDPS Logo" className="h-9 w-9 shrink-0 object-contain" />
          <span
            className={cn(
              "text-base font-bold text-foreground tracking-tight whitespace-nowrap transition-opacity duration-200",
              hovered ? "opacity-100" : "opacity-0"
            )}
          >
            LDPS
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
          {menu.map((item) => {
            const active = location.pathname === item.url;
            return (
              <Link
                key={item.url}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap",
                  active
                    ? "gradient-primary text-primary-foreground shadow-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    "transition-opacity duration-200",
                    hovered ? "opacity-100" : "opacity-0"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-sidebar-border px-2 py-3 shrink-0">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all whitespace-nowrap"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span
              className={cn(
                "transition-opacity duration-200",
                hovered ? "opacity-100" : "opacity-0"
              )}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col ml-[72px]">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-card">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {menu.find((m) => m.url === location.pathname)?.title || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative rounded-lg p-2 hover:bg-secondary transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card p-4 shadow-card-hover">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Notifications</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-warning bg-warning/10 rounded-lg p-2">⚠️ You haven't practiced DBMS for 5 days!</p>
                    <p className="text-sm text-primary bg-primary/10 rounded-lg p-2">📝 New quiz available: Binary Trees</p>
                    <p className="text-sm text-success bg-success/10 rounded-lg p-2">🎯 You're 550 XP away from Level 13!</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-1.5 hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                {user?.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-[11px] text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
