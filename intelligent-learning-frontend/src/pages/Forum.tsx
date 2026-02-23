import { useState } from "react";
import { motion } from "framer-motion";
import { forumPosts } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { MessageCircle, ThumbsUp, Send } from "lucide-react";

export default function Forum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(forumPosts);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const post = {
      id: `fp${Date.now()}`,
      authorId: user!.id,
      authorName: user!.name,
      title: newTitle,
      content: newContent,
      topicTag: "General",
      createdAt: new Date().toISOString().split("T")[0],
      upvotes: 0,
      replies: [],
    };
    setPosts([post, ...posts]);
    setNewTitle("");
    setNewContent("");
    setShowForm(false);
  };

  const addReply = (postId: string) => {
    if (!replyText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: [
                ...p.replies,
                {
                  id: `fr${Date.now()}`,
                  authorId: user!.id,
                  authorName: user!.name,
                  content: replyText,
                  createdAt: new Date().toISOString().split("T")[0],
                  upvotes: 0,
                },
              ],
            }
          : p
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Discussion Forum</h1>
          <p className="text-sm text-muted-foreground">Ask doubts and help peers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          + New Question
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-5 shadow-card space-y-3">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Question title..."
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Describe your question..."
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <button onClick={addPost} className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Post Question
          </button>
        </motion.div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{post.topicTag}</span>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{post.title}</h3>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs">{post.upvotes}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{post.content}</p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{post.authorName} • {post.createdAt}</span>
              <button
                onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {post.replies.length} replies
              </button>
            </div>

            {post.replies.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-border pt-3">
                {post.replies.map((r) => (
                  <div key={r.id} className="rounded-lg bg-secondary p-3">
                    <p className="text-sm text-foreground">{r.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.authorName} • {r.createdAt}</p>
                  </div>
                ))}
              </div>
            )}

            {replyingTo === post.id && (
              <div className="mt-3 flex gap-2">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && addReply(post.id)}
                />
                <button onClick={() => addReply(post.id)} className="rounded-lg gradient-primary p-2 text-primary-foreground hover:opacity-90">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
