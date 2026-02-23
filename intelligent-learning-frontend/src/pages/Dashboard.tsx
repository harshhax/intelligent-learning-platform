import { motion } from "framer-motion";
import { dashboardStats, performanceData, subjects } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, Flame, Target, AlertTriangle, TrendingUp, BookOpen } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const statCards = [
  { label: "XP Points", value: dashboardStats.xp, icon: Zap, gradient: "gradient-primary" },
  { label: "Learning Streak", value: `${dashboardStats.streak} days`, icon: Flame, gradient: "gradient-warning" },
  { label: "Quizzes Taken", value: dashboardStats.quizzesAttempted, icon: BookOpen, gradient: "gradient-success" },
  { label: "Accuracy", value: `${dashboardStats.overallAccuracy}%`, icon: Target, gradient: "gradient-primary" },
  { label: "Weak Topics", value: dashboardStats.weakTopicsCount, icon: AlertTriangle, gradient: "gradient-warning" },
  { label: "Level", value: dashboardStats.level, icon: TrendingUp, gradient: "gradient-success" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const { user } = useAuth();

  const topicAccuracy = subjects.map((s) => ({ name: s.name, accuracy: s.progress, quizzes: s.quizzesCompleted }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome */}
      <motion.div variants={item} className="rounded-2xl gradient-primary p-6 text-primary-foreground shadow-primary">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
        <p className="mt-1 text-sm opacity-90">You're on a {dashboardStats.streak}-day learning streak. Keep it up!</p>
      </motion.div>

      {/* Notification */}
      {dashboardStats.notifications[0] && (
        <motion.div variants={item} className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <p className="text-sm font-medium text-foreground">{dashboardStats.notifications[0]}</p>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-card-hover transition-shadow">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.gradient}`}>
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Topic Accuracy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topicAccuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Recent Activity</h3>
        <div className="space-y-3">
          {dashboardStats.recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{a.action}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
