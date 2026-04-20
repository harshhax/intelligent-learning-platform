import { motion } from "framer-motion";
import API from "@/api/axios";
import { useEffect, useState } from "react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Results() {

  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);

  useEffect(() => {
    const loadResults = async () => {
      try {

        const res = await API.get("/student/results");

        setQuizAttempts(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    loadResults();
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-xl font-bold text-foreground">Quiz Results</h1>
        <p className="text-sm text-muted-foreground">History of all your quiz attempts</p>
      </motion.div>

      <motion.div variants={item} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Topic</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Score</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Accuracy</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Time</th>
            </tr>
          </thead>

          <tbody>
            {quizAttempts.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{a.date}</td>
                <td className="px-4 py-3 text-sm text-foreground">{a.subjectName}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{a.topicName}</td>
                <td className="px-4 py-3 text-center text-sm font-semibold text-primary">
                  {a.score}/{a.totalQuestions}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      a.accuracy >= 80
                        ? "bg-success/10 text-success"
                        : a.accuracy >= 50
                        ? "bg-warning/10 text-warning"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {a.accuracy}%
                  </span>
                </td>

                <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                  {Math.round(a.timeTaken / 60)}m
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </motion.div>
    </motion.div>
  );
}