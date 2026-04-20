import { motion } from "framer-motion";
import { useState } from "react";
import { Search, User } from "lucide-react";

const mockStudents = [
  {
    id: 1,
    name: "Harsha",
    email: "harsha@test.com",
    xp: 420,
    level: 3,
    streak: 5,
    accuracy: 82
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@test.com",
    xp: 210,
    level: 2,
    streak: 2,
    accuracy: 55
  },
  {
    id: 3,
    name: "Anita",
    email: "anita@test.com",
    xp: 640,
    level: 5,
    streak: 9,
    accuracy: 91
  },
  {
    id: 4,
    name: "Karthik",
    email: "karthik@test.com",
    xp: 150,
    level: 1,
    streak: 1,
    accuracy: 47
  }
];

export default function AllStudents() {
  const [search, setSearch] = useState("");

  const students = mockStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >

      {/* Header */}

      <div>
        <h1 className="text-xl font-bold text-foreground">
          All Students
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and monitor student progress
        </p>
      </div>

      {/* Search */}

      <div className="relative w-full md:w-80">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />

        <input
          type="text"
          placeholder="Search student..."
          className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-secondary">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-center">XP</th>
              <th className="p-3 text-center">Level</th>
              <th className="p-3 text-center">Streak</th>
              <th className="p-3 text-center">Accuracy</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {students.map((s) => (

              <tr
                key={s.id}
                className="border-b border-border hover:bg-secondary/40 transition"
              >

                {/* Student Info */}

                <td className="p-3 flex items-center gap-3">

                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>

                  <div>
                    <p className="font-medium text-foreground">
                      {s.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.email}
                    </p>
                  </div>

                </td>

                {/* XP */}

                <td className="p-3 text-center font-medium">
                  {s.xp}
                </td>

                {/* Level */}

                <td className="p-3 text-center">
                  {s.level}
                </td>

                {/* Streak */}

                <td className="p-3 text-center">
                  🔥 {s.streak}
                </td>

                {/* Accuracy */}

                <td className="p-3 text-center">

                  {s.accuracy >= 80 ? (
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                      {s.accuracy}%
                    </span>
                  ) : s.accuracy >= 50 ? (
                    <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                      {s.accuracy}%
                    </span>
                  ) : (
                    <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                      {s.accuracy}%
                    </span>
                  )}

                </td>

                {/* Action */}

                <td className="p-3 text-center">
                  <button className="text-sm text-primary hover:underline">
                    View Profile
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}