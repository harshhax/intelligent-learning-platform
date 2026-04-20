import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen, Layers, Tag } from "lucide-react";

interface Item { id: string; name: string; description: string; type: "course" | "subject" | "topic"; parentId?: string }

export default function CourseManagement() {
  const [items, setItems] = useState<Item[]>([
    { id: "c1", name: "B.Tech CSE", description: "Computer Science core subjects", type: "course" },
    { id: "s1", name: "C Programming", description: "Fundamentals of C", type: "subject", parentId: "c1" },
    { id: "s2", name: "DBMS", description: "Database Management Systems", type: "subject", parentId: "c1" },
  ]);
  const [tab, setTab] = useState<"course" | "subject" | "topic">("course");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const add = () => {
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: `${tab[0]}${Date.now()}`, name, description: desc, type: tab }]);
    setName("");
    setDesc("");
  };

  const tabs = [
    { key: "course" as const, label: "Courses", icon: BookOpen },
    { key: "subject" as const, label: "Subjects", icon: Layers },
    { key: "topic" as const, label: "Topics", icon: Tag },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Course Management</h1>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              tab === t.key ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Add New {tab}</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`${tab} name...`}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description..."
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button onClick={add} className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add {tab}
        </button>
      </div>

      <div className="space-y-2">
        {items.filter((i) => i.type === tab).map((i) => (
          <div key={i.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 shadow-card">
            <div>
              <p className="text-sm font-medium text-foreground">{i.name}</p>
              <p className="text-xs text-muted-foreground">{i.description}</p>
            </div>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-muted-foreground">{i.type}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
