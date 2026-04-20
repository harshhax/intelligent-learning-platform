import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { subjects, leaderboard, performanceData } from "@/data/mockData";
import { Users, BookOpen, FileText, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(239,84%,67%)", "hsl(270,70%,60%)", "hsl(142,72%,42%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)"];

const adminStats = [
  { label: "Total Students", value: 156, icon: Users },
  { label: "Courses", value: 5, icon: BookOpen },
  { label: "Questions", value: 420, icon: FileText },
  { label: "Avg. Accuracy", value: "68%", icon: BarChart3 },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  const subjectData = subjects.map((s) => ({ name: s.name, students: Math.floor(Math.random() * 80) + 50, accuracy: s.progress }));
  const weakStudents = leaderboard.filter((s) => s.accuracy < 60);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="rounded-2xl gradient-primary p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm opacity-90">Welcome, {user?.name}. Here's your class overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <s.icon className="mb-3 h-8 w-8 text-primary" />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Subject-wise Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                {subjectData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Weak Students (Accuracy &lt; 60%)</h3>
          {weakStudents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No weak students detected!</p>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((s) => (
                <div key={s.userId} className={`flex items-center justify-between rounded-lg p-3 ${s.accuracy < 60 ? "bg-destructive/10" : "bg-secondary"}`}>
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                  <span className={`text-sm font-bold ${s.accuracy < 60 ? "text-destructive" : "text-success"}`}>
                    {s.accuracy}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
