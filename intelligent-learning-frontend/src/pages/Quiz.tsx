import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subjects, topics, quizQuestions } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

type Phase = "select" | "quiz" | "result";

export default function Quiz() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [submitted, setSubmitted] = useState(false);

  const questions = quizQuestions.filter((q) => q.topicId === selectedTopic);
  const question = questions[currentQ];

  const startQuiz = (topicId: string) => {
    setSelectedTopic(topicId);
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(300);
  };

  const selectAnswer = (qId: string, optIdx: number) => {
    if (!submitted) setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setPhase("result");
  };

  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);

  if (phase === "select") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Take a Quiz</h1>
          <p className="text-sm text-muted-foreground">Select a topic to begin</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => {
            const subTopics = topics.filter((t) => t.subjectId === s.id);
            return (
              <div key={s.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                </div>
                <div className="space-y-2">
                  {subTopics.map((t) => {
                    const hasQuestions = quizQuestions.some((q) => q.topicId === t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => hasQuestions && startQuiz(t.id)}
                        disabled={!hasQuestions}
                        className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-left text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {t.name}
                        {!hasQuestions && <span className="ml-2 text-xs text-muted-foreground">(Coming soon)</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  if (phase === "result") {
    const accuracy = Math.round((score / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-lg space-y-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
            <CheckCircle className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Quiz Complete!</h2>
          <p className="text-muted-foreground text-sm mt-1">{topics.find((t) => t.id === selectedTopic)?.name}</p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-2xl font-bold text-primary">{score}/{questions.length}</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-2xl font-bold text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-2xl font-bold text-primary">{Math.round((300 - timeLeft) / 60)}m</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {questions.map((q, i) => (
              <div key={q.id} className={`flex items-center gap-2 rounded-lg p-2 text-left text-sm ${answers[q.id] === q.correctAnswer ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                <span className="font-medium">Q{i + 1}:</span>
                <span className="flex-1 truncate">{q.text}</span>
                <span>{answers[q.id] === q.correctAnswer ? "✓" : "✗"}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={() => setPhase("select")} className="flex-1 rounded-lg border border-border bg-secondary py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Back to Topics
            </button>
            <button onClick={() => startQuiz(selectedTopic!)} className="flex-1 rounded-lg gradient-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Retry
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-2xl space-y-6">
      {/* Timer & Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQ + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-mono font-medium text-foreground">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="h-1.5 w-full rounded-full bg-secondary">
        <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={question?.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-6">{question?.text}</h3>
          <div className="space-y-3">
            {question?.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(question.id, i)}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                  answers[question.id] === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary text-foreground hover:border-primary/30"
                }`}
              >
                <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        {currentQ === questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            disabled={Object.keys(answers).length < questions.length}
            className="rounded-lg gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}
            className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
