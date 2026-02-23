import {
  User, Subject, Topic, Question, QuizAttempt, StudyPlanTask,
  Recommendation, ForumPost, LeaderboardEntry, DashboardStats, PerformanceData
} from "@/types";

export const currentUser: User = {
  id: "u1",
  name: "Aarav Sharma",
  email: "student@bitsathy.ac.in",
  role: "student",
  xp: 2450,
  level: 12,
  streak: 7,
  badges: [
    { id: "b1", name: "Quiz Master", icon: "🏆", description: "Complete 50 quizzes", earnedAt: "2025-12-01" },
    { id: "b2", name: "Streak King", icon: "🔥", description: "7-day streak", earnedAt: "2025-12-15" },
    { id: "b3", name: "DBMS Pro", icon: "💾", description: "Advanced mastery in DBMS", earnedAt: "2025-11-20" },
    { id: "b4", name: "Fast Learner", icon: "⚡", description: "Complete 10 quizzes in one day", earnedAt: "2025-10-05" },
  ],
  joinedAt: "2025-08-15",
};

export const adminUser: User = {
  id: "a1",
  name: "Dr. Priya Mehta",
  email: "admin@bitsathy.ac.in",
  role: "admin",
  xp: 0,
  level: 0,
  streak: 0,
  badges: [],
  joinedAt: "2024-01-01",
};

export const subjects: Subject[] = [
  { id: "s1", name: "C Programming", icon: "🔤", courseId: "c1", topics: [], progress: 72, mastery: "Intermediate", quizzesCompleted: 18, totalQuizzes: 25 },
  { id: "s2", name: "DBMS", icon: "💾", courseId: "c1", topics: [], progress: 85, mastery: "Advanced", quizzesCompleted: 22, totalQuizzes: 25 },
  { id: "s3", name: "Operating Systems", icon: "🖥️", courseId: "c1", topics: [], progress: 45, mastery: "Beginner", quizzesCompleted: 10, totalQuizzes: 25 },
  { id: "s4", name: "DSA", icon: "🧮", courseId: "c1", topics: [], progress: 60, mastery: "Intermediate", quizzesCompleted: 15, totalQuizzes: 25 },
  { id: "s5", name: "Computer Networks", icon: "🌐", courseId: "c1", topics: [], progress: 35, mastery: "Beginner", quizzesCompleted: 8, totalQuizzes: 25 },
];

export const topics: Topic[] = [
  { id: "t1", name: "Pointers", subjectId: "s1", isWeak: true, difficultyScore: 78, accuracy: 45, avgTime: 35, attempts: 5, lastPracticed: "2026-02-10" },
  { id: "t2", name: "Arrays", subjectId: "s1", isWeak: false, difficultyScore: 30, accuracy: 82, avgTime: 20, attempts: 8 },
  { id: "t3", name: "Normalization", subjectId: "s2", isWeak: false, difficultyScore: 25, accuracy: 88, avgTime: 18, attempts: 10 },
  { id: "t4", name: "SQL Joins", subjectId: "s2", isWeak: true, difficultyScore: 65, accuracy: 52, avgTime: 30, attempts: 4, lastPracticed: "2026-02-05" },
  { id: "t5", name: "Process Scheduling", subjectId: "s3", isWeak: true, difficultyScore: 82, accuracy: 38, avgTime: 40, attempts: 3, lastPracticed: "2026-01-20" },
  { id: "t6", name: "Deadlocks", subjectId: "s3", isWeak: true, difficultyScore: 90, accuracy: 30, avgTime: 45, attempts: 2 },
  { id: "t7", name: "Linked Lists", subjectId: "s4", isWeak: false, difficultyScore: 35, accuracy: 78, avgTime: 22, attempts: 12 },
  { id: "t8", name: "Binary Trees", subjectId: "s4", isWeak: true, difficultyScore: 72, accuracy: 48, avgTime: 38, attempts: 4 },
  { id: "t9", name: "TCP/IP", subjectId: "s5", isWeak: true, difficultyScore: 85, accuracy: 35, avgTime: 42, attempts: 2 },
  { id: "t10", name: "OSI Model", subjectId: "s5", isWeak: false, difficultyScore: 40, accuracy: 75, avgTime: 25, attempts: 6 },
];

export const quizQuestions: Question[] = [
  { id: "q1", topicId: "t1", text: "What is a pointer in C?", options: ["A variable that stores the address of another variable", "A function that points to memory", "A data type", "A loop construct"], correctAnswer: 0, difficulty: "easy" },
  { id: "q2", topicId: "t1", text: "What does the * operator do with pointers?", options: ["Multiplies values", "Dereferences a pointer", "Creates a pointer", "Deletes a pointer"], correctAnswer: 1, difficulty: "easy" },
  { id: "q3", topicId: "t1", text: "What is a null pointer?", options: ["A pointer to zero", "A pointer that doesn't point to any valid memory", "An empty array", "A void function"], correctAnswer: 1, difficulty: "medium" },
  { id: "q4", topicId: "t1", text: "What is pointer arithmetic?", options: ["Adding numbers", "Operations on pointer addresses", "Mathematical functions", "Array operations"], correctAnswer: 1, difficulty: "medium" },
  { id: "q5", topicId: "t1", text: "What is a dangling pointer?", options: ["A pointer to freed memory", "A pointer with no name", "A global pointer", "A static pointer"], correctAnswer: 0, difficulty: "hard" },
  { id: "q6", topicId: "t4", text: "What is an INNER JOIN?", options: ["Returns all rows from both tables", "Returns matching rows from both tables", "Returns rows from left table only", "Returns null values"], correctAnswer: 1, difficulty: "easy" },
  { id: "q7", topicId: "t4", text: "LEFT JOIN returns:", options: ["Only matching rows", "All rows from left table + matches from right", "All rows from right table", "Cartesian product"], correctAnswer: 1, difficulty: "medium" },
  { id: "q8", topicId: "t5", text: "Which scheduling algorithm has the minimum average waiting time?", options: ["FCFS", "SJF", "Round Robin", "Priority"], correctAnswer: 1, difficulty: "medium" },
  { id: "q9", topicId: "t5", text: "What is convoy effect?", options: ["Long processes block short ones in FCFS", "Starvation in priority scheduling", "Deadlock condition", "Race condition"], correctAnswer: 0, difficulty: "hard" },
  { id: "q10", topicId: "t8", text: "The height of a balanced BST with n nodes is:", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctAnswer: 1, difficulty: "medium" },
];

export const quizAttempts: QuizAttempt[] = [
  { id: "qa1", topicId: "t1", topicName: "Pointers", subjectName: "C Programming", score: 3, totalQuestions: 5, accuracy: 60, timeTaken: 180, date: "2026-02-18", answers: [] },
  { id: "qa2", topicId: "t3", topicName: "Normalization", subjectName: "DBMS", score: 4, totalQuestions: 5, accuracy: 80, timeTaken: 150, date: "2026-02-17", answers: [] },
  { id: "qa3", topicId: "t7", topicName: "Linked Lists", subjectName: "DSA", score: 5, totalQuestions: 5, accuracy: 100, timeTaken: 120, date: "2026-02-16", answers: [] },
  { id: "qa4", topicId: "t5", topicName: "Process Scheduling", subjectName: "Operating Systems", score: 2, totalQuestions: 5, accuracy: 40, timeTaken: 250, date: "2026-02-15", answers: [] },
  { id: "qa5", topicId: "t9", topicName: "TCP/IP", subjectName: "Computer Networks", score: 1, totalQuestions: 5, accuracy: 20, timeTaken: 300, date: "2026-02-14", answers: [] },
];

export const studyPlan: StudyPlanTask[] = [
  { id: "sp1", day: 1, title: "Watch Pointers Explained Video", type: "video", topicName: "Pointers", completed: true, resource: "https://youtube.com" },
  { id: "sp2", day: 2, title: "Practice Pointer Problems", type: "practice", topicName: "Pointers", completed: true },
  { id: "sp3", day: 3, title: "SQL Joins Tutorial", type: "video", topicName: "SQL Joins", completed: false, resource: "https://youtube.com" },
  { id: "sp4", day: 4, title: "Revision: Pointers & SQL", type: "revision", topicName: "Pointers", completed: false },
  { id: "sp5", day: 5, title: "Process Scheduling Video", type: "video", topicName: "Process Scheduling", completed: false, resource: "https://youtube.com" },
  { id: "sp6", day: 6, title: "Practice Scheduling Problems", type: "practice", topicName: "Process Scheduling", completed: false },
  { id: "sp7", day: 7, title: "Take Quiz: All Weak Topics", type: "quiz", topicName: "Mixed", completed: false },
];

export const recommendations: Recommendation[] = [
  { id: "r1", topicId: "t1", topicName: "Pointers", subjectName: "C Programming", type: "video", title: "Pointers in C - Complete Guide", url: "https://www.youtube.com/embed/zuegQmMdy8M", description: "Comprehensive video tutorial on C pointers" },
  { id: "r2", topicId: "t1", topicName: "Pointers", subjectName: "C Programming", type: "notes", title: "Pointers Cheat Sheet PDF", description: "Quick reference guide for pointer concepts" },
  { id: "r3", topicId: "t5", topicName: "Process Scheduling", subjectName: "Operating Systems", type: "video", title: "CPU Scheduling Algorithms", url: "https://www.youtube.com/embed/Jkmy2YLUbUY", description: "Learn FCFS, SJF, Round Robin, and Priority scheduling" },
  { id: "r4", topicId: "t6", topicName: "Deadlocks", subjectName: "Operating Systems", type: "quiz", title: "Deadlock Detection Practice", description: "Practice quiz for deadlock concepts" },
  { id: "r5", topicId: "t9", topicName: "TCP/IP", subjectName: "Computer Networks", type: "video", title: "TCP/IP Protocol Suite", url: "https://www.youtube.com/embed/OTwp3xtd4dg", description: "Deep dive into TCP/IP layers" },
];

export const forumPosts: ForumPost[] = [
  {
    id: "fp1", authorId: "u1", authorName: "Aarav Sharma", title: "How to understand pointer arithmetic?",
    content: "I'm confused about how pointer arithmetic works in C. Can someone explain with examples?",
    topicTag: "C Programming", createdAt: "2026-02-20", upvotes: 12,
    replies: [
      { id: "fr1", authorId: "u2", authorName: "Meera Patel", content: "Think of it as moving through memory by the size of the data type. If int is 4 bytes, p+1 moves 4 bytes forward.", createdAt: "2026-02-20", upvotes: 8 },
      { id: "fr2", authorId: "u3", authorName: "Ravi Kumar", content: "Great explanation Meera! Also remember that array[i] is equivalent to *(array + i).", createdAt: "2026-02-20", upvotes: 5 },
    ],
  },
  {
    id: "fp2", authorId: "u4", authorName: "Sneha Gupta", title: "Difference between INNER JOIN and LEFT JOIN?",
    content: "Can someone explain with a real-world example when to use INNER JOIN vs LEFT JOIN?",
    topicTag: "DBMS", createdAt: "2026-02-19", upvotes: 9,
    replies: [
      { id: "fr3", authorId: "u5", authorName: "Arjun Singh", content: "Use INNER JOIN when you only want records that exist in both tables. LEFT JOIN when you want all records from the left table even if there's no match.", createdAt: "2026-02-19", upvotes: 6 },
    ],
  },
  {
    id: "fp3", authorId: "u6", authorName: "Divya Nair", title: "Best approach for Binary Tree traversal?",
    content: "What's the most efficient way to implement in-order, pre-order, and post-order traversal?",
    topicTag: "DSA", createdAt: "2026-02-18", upvotes: 15, replies: [],
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "u7", name: "Vikram Reddy", xp: 3200, accuracy: 92, level: 15, streak: 14 },
  { rank: 2, userId: "u8", name: "Ananya Joshi", xp: 2980, accuracy: 89, level: 14, streak: 10 },
  { rank: 3, userId: "u1", name: "Aarav Sharma", xp: 2450, accuracy: 76, level: 12, streak: 7 },
  { rank: 4, userId: "u9", name: "Karthik Iyer", xp: 2300, accuracy: 74, level: 11, streak: 5 },
  { rank: 5, userId: "u10", name: "Priya Desai", xp: 2100, accuracy: 71, level: 10, streak: 3 },
  { rank: 6, userId: "u4", name: "Sneha Gupta", xp: 1950, accuracy: 68, level: 9, streak: 2 },
  { rank: 7, userId: "u3", name: "Ravi Kumar", xp: 1800, accuracy: 65, level: 8, streak: 4 },
  { rank: 8, userId: "u2", name: "Meera Patel", xp: 1650, accuracy: 63, level: 7, streak: 1 },
];

export const dashboardStats: DashboardStats = {
  xp: 2450,
  streak: 7,
  quizzesAttempted: 73,
  overallAccuracy: 76,
  weakTopicsCount: 5,
  level: 12,
  recentActivity: [
    { date: "2026-02-20", action: "Completed Quiz", detail: "Pointers - Score: 3/5" },
    { date: "2026-02-19", action: "Watched Video", detail: "SQL Joins Tutorial" },
    { date: "2026-02-18", action: "Earned Badge", detail: "Quiz Master 🏆" },
    { date: "2026-02-17", action: "Completed Quiz", detail: "Normalization - Score: 4/5" },
    { date: "2026-02-16", action: "Study Plan", detail: "Completed Day 2 tasks" },
  ],
  notifications: [
    "You haven't practiced DBMS for 5 days!",
    "New quiz available: Binary Trees",
    "You're 550 XP away from Level 13!",
  ],
};

export const performanceData: PerformanceData[] = [
  { date: "Week 1", accuracy: 55, score: 60 },
  { date: "Week 2", accuracy: 62, score: 65 },
  { date: "Week 3", accuracy: 58, score: 62 },
  { date: "Week 4", accuracy: 70, score: 72 },
  { date: "Week 5", accuracy: 68, score: 70 },
  { date: "Week 6", accuracy: 75, score: 78 },
  { date: "Week 7", accuracy: 72, score: 74 },
  { date: "Week 8", accuracy: 76, score: 80 },
];
