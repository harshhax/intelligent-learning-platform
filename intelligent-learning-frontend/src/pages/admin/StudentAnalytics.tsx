import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const subjectData = [
  { subject: "C Programming", accuracy: 72 },
  { subject: "DBMS", accuracy: 85 },
  { subject: "Operating Systems", accuracy: 45 },
  { subject: "DSA", accuracy: 60 },
  { subject: "Computer Networks", accuracy: 35 }
];

const students = [
  { id: 1, name: "Harsha", accuracy: 82, quizzes: 14 },
  { id: 2, name: "Rahul", accuracy: 55, quizzes: 10 },
  { id: 3, name: "Anita", accuracy: 92, quizzes: 18 },
  { id: 4, name: "Karthik", accuracy: 47, quizzes: 8 }
];

export default function StudentAnalytics() {
  const weakStudents = students.filter((s) => s.accuracy < 60);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >

      {/* Header */}

      <div>
        <h1 className="text-xl font-bold text-foreground">
          Student Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor student performance and identify weak learners
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="text-sm text-muted-foreground">Total Students</h3>
          <p className="text-2xl font-bold text-primary">
            {students.length}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="text-sm text-muted-foreground">Avg Accuracy</h3>
          <p className="text-2xl font-bold text-success">
            {Math.round(
              students.reduce((sum, s) => sum + s.accuracy, 0) /
                students.length
            )}
            %
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="text-sm text-muted-foreground">Weak Students</h3>
          <p className="text-2xl font-bold text-destructive">
            {weakStudents.length}
          </p>
        </div>

      </div>

      {/* Subject Performance Chart */}

      <div className="rounded-xl border bg-card p-6 shadow-card">

        <h2 className="font-semibold mb-4 text-foreground">
          Subject Performance
        </h2>

        <div className="h-[250px]">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#7c5cff" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Student Table */}

      <div className="rounded-xl border bg-card shadow-card overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="font-semibold text-foreground">
            Student Performance
          </h2>
        </div>

        <table className="w-full text-sm">

          <thead className="bg-secondary">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-center">Accuracy</th>
              <th className="p-3 text-center">Quizzes Taken</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>

            {students.map((s) => (

              <tr
                key={s.id}
                className="border-b hover:bg-secondary/40"
              >

                <td className="p-3">{s.name}</td>

                <td className="p-3 text-center font-medium">
                  {s.accuracy}%
                </td>

                <td className="p-3 text-center">
                  {s.quizzes}
                </td>

                <td className="p-3 text-center">

                  {s.accuracy < 60 ? (
                    <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                      Weak
                    </span>
                  ) : (
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                      Good
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}