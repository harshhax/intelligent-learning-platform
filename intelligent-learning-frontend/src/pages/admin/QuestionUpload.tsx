import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Plus, Trash2 } from "lucide-react";

interface QuestionForm {
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: string;
  topic: string;
}

export default function QuestionUpload() {
  const [questions, setQuestions] = useState<QuestionForm[]>([]);
  const [form, setForm] = useState<QuestionForm>({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Pointers",
  });

  const updateOption = (idx: number, val: string) => {
    const opts = [...form.options];
    opts[idx] = val;
    setForm({ ...form, options: opts });
  };

  const addQuestion = () => {
    if (!form.text.trim() || form.options.some((o) => !o.trim())) return;
    setQuestions([...questions, form]);
    setForm({ text: "", options: ["", "", "", ""], correctAnswer: 0, difficulty: "medium", topic: form.topic });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Question Upload</h1>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Topic</label>
            <select
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Pointers</option>
              <option>Arrays</option>
              <option>SQL Joins</option>
              <option>Normalization</option>
              <option>Process Scheduling</option>
              <option>Deadlocks</option>
              <option>Binary Trees</option>
              <option>TCP/IP</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Question Text</label>
          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Options</label>
          {form.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name="correct"
                checked={form.correctAnswer === i}
                onChange={() => setForm({ ...form, correctAnswer: i })}
                className="accent-primary"
              />
              <input
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + i)}`}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Select the radio button for the correct answer</p>
        </div>

        <button onClick={addQuestion} className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Question
        </button>
      </div>

      {questions.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Added Questions ({questions.length})</h3>
          <div className="space-y-2">
            {questions.map((q, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{q.text}</p>
                  <p className="text-xs text-muted-foreground">{q.topic} • {q.difficulty}</p>
                </div>
                <button onClick={() => setQuestions(questions.filter((_, j) => j !== i))} className="text-destructive hover:text-destructive/80">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
