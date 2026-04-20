export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  courseId: string;
  topics: Topic[];
  progress: number;
  mastery: "Beginner" | "Intermediate" | "Advanced";
  quizzesCompleted: number;
  totalQuizzes: number;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
  isWeak: boolean;
  difficultyScore: number;
  accuracy: number;
  avgTime: number;
  attempts: number;
  lastPracticed?: string;
}

export interface Question {
  id: string;
  topicId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizAttempt {
  id: string;
  topicId: string;
  topicName: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeTaken: number;
  date: string;
  answers: { questionId: string; selected: number; correct: number; isCorrect: boolean }[];
}

export interface StudyPlanTask {
  id: string;
  day: number;
  title: string;
  type: "video" | "practice" | "revision" | "quiz";
  topicName: string;
  completed: boolean;
  resource?: string;
}

export interface Recommendation {
  id: string;
  topicId: string;
  topicName: string;
  subjectName: string;
  type: "video" | "notes" | "quiz";
  title: string;
  url?: string;
  description: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  topicTag: string;
  createdAt: string;
  replies: ForumReply[];
  upvotes: number;
}

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  xp: number;
  accuracy: number;
  level: number;
  streak: number;
}

export interface DashboardStats {
  xp: number;
  streak: number;
  quizzesAttempted: number;
  overallAccuracy: number;
  weakTopicsCount: number;
  level: number;
  recentActivity: { date: string; action: string; detail: string }[];
  notifications: string[];
}

export interface PerformanceData {
  date: string;
  accuracy: number;
  score: number;
}
