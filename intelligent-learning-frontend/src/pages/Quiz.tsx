import { useState } from "react";
import { motion } from "framer-motion";
import { getQuizByTopic, submitQuiz as submitQuizAPI } from "@/services/quizService";
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

type Phase = "subject" | "topic" | "quiz" | "result"; 

export default function Quiz() {

  const [phase, setPhase] = useState<Phase>("subject");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);

  const question = questions[currentQ];

  /* ---------- LOAD QUIZ ---------- */

  const startQuiz = async (topicId: string) => {
    try {

      setSelectedTopic(topicId);

      const data = await getQuizByTopic(topicId);
      setQuestions(data);

      setPhase("quiz");
      setCurrentQ(0);
      setAnswers({});

    } catch {
      alert("Failed to load quiz");
    }
  };

  /* ---------- SELECT ANSWER ---------- */

  const selectAnswer = (qId: string, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  /* ---------- SUBMIT QUIZ ---------- */

  const submitQuiz = async () => {
    try {

      const formattedAnswers = Object.keys(answers).map(qid => ({
        questionId: qid,
        selectedOption: answers[qid],
        responseTime: 15
      }));

      const res = await submitQuizAPI(selectedTopic!, formattedAnswers);

      setResult(res);
      setPhase("result");

    } catch {
      alert("Submission failed");
    }
  };

  /* ================= SUBJECT SCREEN ================= */

  if (phase === "subject") {

    return (
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-bold">Take a Quiz</h1>
          <p className="text-muted-foreground text-sm">
            Select a subject
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* DATA STRUCTURES */}
          <div
            onClick={() => {
              setSelectedSubject("dsa");
              setPhase("topic");
            }}
            className="cursor-pointer rounded-xl border bg-card shadow hover:shadow-lg transition"
          >

            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-3">

              <h3 className="font-semibold text-lg">
                Data Structures
              </h3>

              <p className="text-sm text-muted-foreground">
                Levels: 10
              </p>

              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 w-1/4 bg-primary rounded-full" />
              </div>

              <p className="text-xs text-muted-foreground">
                Progress: 2 / 10 levels
              </p>

            </div>

          </div>


          {/* C PROGRAMMING */}
          <div
            onClick={() => {
              setSelectedSubject("c");
              setPhase("topic");
            }}
            className="cursor-pointer rounded-xl border bg-card shadow hover:shadow-lg transition"
          >

            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c"
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-3">

              <h3 className="font-semibold text-lg">
                C Programming
              </h3>

              <p className="text-sm text-muted-foreground">
                Levels: 8
              </p>

              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 w-1/5 bg-primary rounded-full" />
              </div>

              <p className="text-xs text-muted-foreground">
                Progress: 1 / 8 levels
              </p>

            </div>

          </div>


          {/* DBMS */}
          <div
            onClick={() => {
              setSelectedSubject("dbms");
              setPhase("topic");
            }}
            className="cursor-pointer rounded-xl border bg-card shadow hover:shadow-lg transition"
          >

            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-3">

              <h3 className="font-semibold text-lg">
                DBMS
              </h3>

              <p className="text-sm text-muted-foreground">
                Levels: 6
              </p>

              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 w-1/6 bg-primary rounded-full" />
              </div>

              <p className="text-xs text-muted-foreground">
                Progress: 1 / 6 levels
              </p>

            </div>

          </div>


          {/* OPERATING SYSTEMS */}
          <div
            onClick={() => {
              setSelectedSubject("os");
              setPhase("topic");
            }}
            className="cursor-pointer rounded-xl border bg-card shadow hover:shadow-lg transition"
          >

            <img
              src="https://www.trentonsystems.com/hs-fs/hubfs/Operating%20System%20.jpeg?width=3099&name=Operating%20System%20.jpeg"
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-3">

              <h3 className="font-semibold text-lg">
                Operating Systems
              </h3>

              <p className="text-sm text-muted-foreground">
                Levels: 7
              </p>

              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 w-1/3 bg-primary rounded-full" />
              </div>

              <p className="text-xs text-muted-foreground">
                Progress: 3 / 7 levels
              </p>

            </div>

          </div>


          {/* COMPUTER NETWORKS */}
          <div
            onClick={() => {
              setSelectedSubject("cn");
              setPhase("topic");
            }}
            className="cursor-pointer rounded-xl border bg-card shadow hover:shadow-lg transition"
          >

            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-3">

              <h3 className="font-semibold text-lg">
                Computer Networks
              </h3>

              <p className="text-sm text-muted-foreground">
                Levels: 5
              </p>

              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 w-1/4 bg-primary rounded-full" />
              </div>

              <p className="text-xs text-muted-foreground">
                Progress: 1 / 5 levels
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }

  /* ================= TOPIC SCREEN ================= */

  if (phase === "topic") {

  return (
    <div className="space-y-8">

      <button
        onClick={() => setPhase("subject")}
        className="text-primary text-sm"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold">Select Topic</h2>

      <div className="space-y-6">

        {/* BINARY TREES */}
        <div
          onClick={() => startQuiz("699688f257c8200807b56df0")}
          className="cursor-pointer border rounded-xl p-6 bg-card shadow hover:shadow-lg transition"
        >

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>

              <h3 className="text-lg font-semibold">
                Binary Trees
              </h3>

            </div>

            <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">
              Attempts: 0
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-3">

              <div className="bg-muted rounded-lg p-3">
                1. Tree Traversals (Inorder, Preorder, Postorder)
              </div>

              <div className="bg-muted rounded-lg p-3">
                2. Binary Tree Properties
              </div>

            </div>

            <div className="space-y-3 text-sm">

              <div>
                <p className="font-semibold">XP Reward</p>
                <p>+60 xp</p>
              </div>

              <div>
                <p className="font-semibold">Pre Requisite</p>
                <p>Linked Lists</p>
              </div>

              <div>
                <p className="font-semibold">Assessment Type</p>
                <p>Programming</p>
              </div>

            </div>

          </div>

        </div>


        {/* LINKED LIST */}
        <div
          onClick={() => startQuiz("699bf64b2efe159610254c62")}
          className="cursor-pointer border rounded-xl p-6 bg-card shadow hover:shadow-lg transition"
        >

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>

              <h3 className="text-lg font-semibold">
                Linked Lists
              </h3>

            </div>

            <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">
              Attempts: 0
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-3">

              <div className="bg-muted rounded-lg p-3">
                1. Singly Linked List
              </div>

              <div className="bg-muted rounded-lg p-3">
                2. Doubly Linked List
              </div>

            </div>

            <div className="space-y-3 text-sm">

              <div>
                <p className="font-semibold">XP Reward</p>
                <p>+50 xp</p>
              </div>

              <div>
                <p className="font-semibold">Pre Requisite</p>
                <p>Arrays</p>
              </div>

              <div>
                <p className="font-semibold">Assessment Type</p>
                <p>Programming</p>
              </div>

            </div>

          </div>

        </div>


        {/* STACK & QUEUE */}
        <div
          onClick={() => startQuiz("699bf6562efe159610254c65")}
          className="cursor-pointer border rounded-xl p-6 bg-card shadow hover:shadow-lg transition"
        >

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>

              <h3 className="text-lg font-semibold">
                Stack & Queue
              </h3>

            </div>

            <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">
              Attempts: 0
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-3">

              <div className="bg-muted rounded-lg p-3">
                1. Stack Operations
              </div>

              <div className="bg-muted rounded-lg p-3">
                2. Queue Operations
              </div>

            </div>

            <div className="space-y-3 text-sm">

              <div>
                <p className="font-semibold">XP Reward</p>
                <p>+60 xp</p>
              </div>

              <div>
                <p className="font-semibold">Pre Requisite</p>
                <p>Linked Lists</p>
              </div>

              <div>
                <p className="font-semibold">Assessment Type</p>
                <p>Programming</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

  /* ================= RESULT SCREEN ================= */

  if (phase === "result") {

    return (
      <div className="mx-auto max-w-lg text-center space-y-6">

        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

        <h2 className="text-2xl font-bold">
          Quiz Complete!
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold">{result?.score}</p>
            <p>Score</p>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold">{result?.percentage}%</p>
            <p>Accuracy</p>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold">
              {result?.gamification?.xpEarned}
            </p>
            <p>XP Earned</p>
          </div>

        </div>

        <button
          onClick={() => setPhase("subject")}
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          Take Another Quiz
        </button>

      </div>
    );
  }

  /* ================= QUIZ SCREEN ================= */

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div className="flex justify-between">
        <span>
          Question {currentQ + 1} / {questions.length}
        </span>

        <Clock className="h-4 w-4" />
      </div>

      <motion.div
        key={question?._id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card p-6 rounded-xl border"
      >

        <h3 className="text-lg font-semibold mb-6">
          {question?.questionText}
        </h3>

        <div className="space-y-3">

          {question?.options.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => selectAnswer(question._id, i)}
              className={`w-full text-left p-3 border rounded-lg ${
                answers[question._id] === i
                  ? "bg-primary/10 border-primary"
                  : ""
              }`}
            >
              {opt}
            </button>
          ))}

        </div>

      </motion.div>

      <div className="flex justify-between">

        <button
          disabled={currentQ === 0}
          onClick={() => setCurrentQ(currentQ - 1)}
          className="px-4 py-2 border rounded-lg"
        >
          <ChevronLeft /> Prev
        </button>

        {currentQ === questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Next <ChevronRight />
          </button>
        )}

      </div>

    </div>
  );
}
