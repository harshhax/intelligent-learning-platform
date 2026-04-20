import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
import { Video, FileText, PenTool } from "lucide-react";

const typeConfig = {
  video: { icon: Video, color: "text-primary", bg: "bg-primary/10" },
  notes: { icon: FileText, color: "text-accent", bg: "bg-accent/10" },
  quiz: { icon: PenTool, color: "text-success", bg: "bg-success/10" },
};

export default function Recommendations() {

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const res = await API.get("/student/recommendations");

        // remove records with null topic
        const valid = res.data.filter((r: any) => r.topic);

        // remove duplicate topics
        const unique = Array.from(
          new Map(valid.map((r: any) => [r.topic._id, r])).values()
        );

        setRecommendations(unique);
      } catch (err) {
        console.log(err);
      }
    };

    loadRecommendations();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      
      <div>
        <h1 className="text-xl font-bold text-foreground">Recommended Resources</h1>
        <p className="text-sm text-muted-foreground">
          Personalized resources for your weak topics
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((r) => {
          const type = "quiz";
          const cfg = typeConfig[type];
          const Icon = cfg.icon;

          return (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${cfg.bg}`}
                >
                  <Icon className={`h-5 w-5 ${cfg.color}`} />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Weak Topic
                  </p>
                  <h3 className="text-sm font-semibold text-foreground">
                    {r.topic?.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                {r.message}
              </p>

              <button
                onClick={() => navigate("/quiz")}
                className="w-full rounded-lg border border-primary/30 bg-primary/5 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                {r.recommendedAction === "retake_quiz"
                  ? "Retake Quiz"
                  : r.recommendedAction === "practice"
                  ? "Start Practice"
                  : "Revise Topic"}
              </button>

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}