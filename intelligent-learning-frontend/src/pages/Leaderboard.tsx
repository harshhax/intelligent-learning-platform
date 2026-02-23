import { motion } from "framer-motion";
import { leaderboard } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Trophy, Flame, Target } from "lucide-react";

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const { user } = useAuth();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">See how you rank among peers</p>
      </div>

      {/* Top 3 */}
      <div className="grid gap-4 sm:grid-cols-3">
        {leaderboard.slice(0, 3).map((e, i) => (
          <motion.div
            key={e.userId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border bg-card p-5 text-center shadow-card ${
              e.userId === user?.id ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
          >
            <span className="text-4xl">{medals[i]}</span>
            <div className="mt-3 mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-xl font-bold text-primary-foreground">
              {e.name.charAt(0)}
            </div>
            <h3 className="mt-2 text-sm font-semibold text-foreground">{e.name}</h3>
            <p className="text-2xl font-bold text-primary mt-1">{e.xp} XP</p>
            <div className="mt-2 flex justify-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Target className="h-3 w-3" />{e.accuracy}%</span>
              <span className="flex items-center gap-1"><Flame className="h-3 w-3" />{e.streak}d</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full list */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        {leaderboard.map((e) => (
          <div
            key={e.userId}
            className={`flex items-center gap-4 border-b border-border px-5 py-3 last:border-0 ${
              e.userId === user?.id ? "bg-primary/5" : "hover:bg-secondary/50"
            } transition-colors`}
          >
            <span className="w-8 text-center text-sm font-bold text-muted-foreground">#{e.rank}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
              {e.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{e.name} {e.userId === user?.id && <span className="text-xs text-primary">(You)</span>}</p>
              <p className="text-xs text-muted-foreground">Level {e.level}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{e.xp} XP</p>
              <p className="text-xs text-muted-foreground">{e.accuracy}% acc</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
