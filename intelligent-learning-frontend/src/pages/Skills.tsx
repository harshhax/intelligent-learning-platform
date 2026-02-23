import { motion } from "framer-motion";
import { subjects } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

const masteryColor = {
  Beginner: "text-warning",
  Intermediate: "text-primary",
  Advanced: "text-success",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Skills() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-xl font-bold text-foreground">LDPS - Learning Difficulty Prediction System</h1>
        <p className="text-sm text-muted-foreground">Predict and analyze student learning difficulty across subjects</p>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <motion.div
            key={s.id}
            variants={item}
            className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                  <span className={`text-xs font-medium ${masteryColor[s.mastery]}`}>{s.mastery}</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">{s.progress}%</span>
            </div>

            <Progress value={s.progress} className="mb-4 h-2" />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{s.quizzesCompleted}/{s.totalQuizzes} quizzes</span>
              <span>Level {Math.ceil(s.progress / 33)}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
