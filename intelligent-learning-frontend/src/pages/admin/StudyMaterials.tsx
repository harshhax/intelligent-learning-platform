import { useState } from "react";
import { Upload, FileText, Video, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function StudyMaterials() {

  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Binary Trees Notes",
      subject: "Data Structures",
      topic: "Binary Trees",
      type: "notes",
      link: "#"
    },
    {
      id: 2,
      title: "Linked List Video Tutorial",
      subject: "Data Structures",
      topic: "Linked List",
      type: "video",
      link: "#"
    }
  ]);

  const removeMaterial = (id: number) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Study Materials
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload and manage learning resources
          </p>
        </div>

        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90">
          <Upload size={16} />
          Upload Material
        </button>
      </div>

      {/* Materials List */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {materials.map((material) => {

          const Icon = material.type === "video" ? Video : FileText;

          return (
            <div
              key={material.id}
              className="border border-border rounded-xl bg-card p-5 shadow-card hover:shadow-lg transition"
            >

              <div className="flex items-center gap-3 mb-3">

                <div className="bg-primary/10 p-2 rounded-lg">
                  <Icon className="text-primary" size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {material.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {material.subject}
                  </p>
                </div>

              </div>

              <div className="text-xs text-muted-foreground mb-3">
                Topic: {material.topic}
              </div>

              <div className="flex justify-between items-center">

                <a
                  href={material.link}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  View Resource
                </a>

                <button
                  onClick={() => removeMaterial(material.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </motion.div>
  );
}