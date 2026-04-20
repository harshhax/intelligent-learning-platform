import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Calendar, Zap, Flame, Trophy } from "lucide-react";

export default function Profile() {

  const { user } = useAuth();
  const u: any = user;

  if (!u) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-2xl space-y-6"
    >

      {/* Profile Card */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">

        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full gradient-primary text-3xl font-bold text-primary-foreground shadow-primary">
          {u.name?.charAt(0) || "U"}
        </div>

        <h2 className="text-xl font-bold text-foreground">{u.name}</h2>
        <p className="text-sm text-muted-foreground">{u.email}</p>

        <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold capitalize text-primary">
          {u.role}
        </span>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">

          <div className="rounded-lg bg-secondary p-3">
            <Zap className="mx-auto mb-1 h-5 w-5 text-primary" />
            <p className="text-lg font-bold text-foreground">{u.xp || 0}</p>
            <p className="text-xs text-muted-foreground">XP Points</p>
          </div>

          <div className="rounded-lg bg-secondary p-3">
            <Flame className="mx-auto mb-1 h-5 w-5 text-warning" />
            <p className="text-lg font-bold text-foreground">{u.streak || 0}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>

          <div className="rounded-lg bg-secondary p-3">
            <Trophy className="mx-auto mb-1 h-5 w-5 text-accent" />
            <p className="text-lg font-bold text-foreground">Lv. {u.level || 1}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>

        </div>

      </div>

      {/* Badges */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">

        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Badges Earned
        </h3>

        <div className="grid grid-cols-2 gap-3">

          {(u.badges || []).map((b: any) => (
            <div
              key={b.id}
              className="flex items-center gap-3 rounded-lg bg-secondary p-3"
            >
              <span className="text-2xl">{b.icon}</span>

              <div>
                <p className="text-sm font-medium text-foreground">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* Account Info */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-3">

        <h3 className="mb-2 text-sm font-semibold text-foreground">
          Account Info
        </h3>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{u.name}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{u.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Joined {u.joinedAt || "Recently"}</span>
        </div>

      </div>

    </motion.div>
  );
}