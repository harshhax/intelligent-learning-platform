import { motion } from "framer-motion";
import { topics, subjects } from "@/data/mockData";
import { AlertTriangle, TrendingDown, Clock, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function WeakTopics() {
  const weakTopics = topics.filter((t) => t.isWeak);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Weak Topics</h1>
          <p className="text-sm text-muted-foreground">{weakTopics.length} topics need attention</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="rounded-xl border border-warning/30 bg-warning/5 p-4">
        <p className="text-sm text-foreground">
          <strong>How it works:</strong> DifficultyScore = (wrong_answers × 3) + (avg_time × 2) + (repeated_attempts × 4) + (inactivity_days × 1). Topics scoring above threshold are marked weak.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {weakTopics.map((t) => {
          const subj = subjects.find((s) => s.id === t.subjectId);
          return (
            <motion.div key={t.id} variants={item} className="rounded-xl border border-destructive/20 bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{subj?.name}</p>
                </div>
                <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                  Score: {t.difficultyScore}
                </span>
              </div>

              <Progress value={t.accuracy} className="mb-3 h-1.5" />

              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  <span>{t.accuracy}% acc</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{t.avgTime}s avg</span>
                </div>
                <div className="flex items-center gap-1">
                  <RotateCcw className="h-3 w-3" />
                  <span>{t.attempts} tries</span>
                </div>
              </div>

              {t.lastPracticed && (
                <p className="mt-2 text-xs text-muted-foreground">Last practiced: {t.lastPracticed}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
