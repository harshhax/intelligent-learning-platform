import { useState } from "react";
import { motion } from "framer-motion";
import { studyPlan } from "@/data/mockData";
import { Video, PenTool, BookOpen, FileText, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const typeIcons = { video: Video, practice: PenTool, revision: BookOpen, quiz: FileText };
const typeColors = { video: "text-primary", practice: "text-accent", revision: "text-warning", quiz: "text-success" };

export default function StudyPlan() {
  const [tasks, setTasks] = useState(studyPlan);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const completed = tasks.filter((t) => t.completed).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Smart Study Plan</h1>
        <p className="text-sm text-muted-foreground">Auto-generated based on your weak areas</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="mt-2 text-xs text-muted-foreground">{completed} of {tasks.length} tasks completed</p>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => {
          const Icon = typeIcons[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-4 rounded-xl border bg-card p-4 shadow-card transition-all ${
                t.completed ? "border-success/30 bg-success/5" : "border-border"
              }`}
            >
              <button onClick={() => toggleTask(t.id)} className="shrink-0">
                {t.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-success" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                )}
              </button>

              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary`}>
                <Icon className={`h-5 w-5 ${typeColors[t.type]}`} />
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${t.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {t.title}
                </p>
                <p className="text-xs text-muted-foreground">Day {t.day} • {t.topicName}</p>
              </div>

              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-muted-foreground">
                {t.type}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
