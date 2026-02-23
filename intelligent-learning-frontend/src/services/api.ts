// API Service Layer - Ready to connect to Express backend
// Currently uses mock data, replace baseURL when backend is ready

const API_BASE = "/api";

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private headers() {
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (this.token) h["Authorization"] = `Bearer ${this.token}`;
    return h;
  }

  // Auth
  async register(data: { name: string; email: string; password: string; role: string }) {
    return fetch(`${API_BASE}/auth/register`, { method: "POST", headers: this.headers(), body: JSON.stringify(data) });
  }

  async login(data: { email: string; password: string }) {
    return fetch(`${API_BASE}/auth/login`, { method: "POST", headers: this.headers(), body: JSON.stringify(data) });
  }

  // Courses
  async createCourse(data: { name: string; description: string }) {
    return fetch(`${API_BASE}/course`, { method: "POST", headers: this.headers(), body: JSON.stringify(data) });
  }

  // Quiz
  async getQuiz(topicId: string) {
    return fetch(`${API_BASE}/quiz/${topicId}`, { headers: this.headers() });
  }

  async submitQuiz(data: { topicId: string; answers: { questionId: string; selected: number }[]; timeTaken: number }) {
    return fetch(`${API_BASE}/quiz/submit`, { method: "POST", headers: this.headers(), body: JSON.stringify(data) });
  }

  // Analytics
  async getDashboard() {
    return fetch(`${API_BASE}/student/dashboard`, { headers: this.headers() });
  }

  async getWeakTopics() {
    return fetch(`${API_BASE}/student/weak-topics`, { headers: this.headers() });
  }

  async getRecommendations() {
    return fetch(`${API_BASE}/student/recommendations`, { headers: this.headers() });
  }

  // Gamification
  async getLeaderboard() {
    return fetch(`${API_BASE}/leaderboard`, { headers: this.headers() });
  }

  // Forum
  async getForumPosts(topic?: string) {
    const url = topic ? `${API_BASE}/forum/${topic}` : `${API_BASE}/forum`;
    return fetch(url, { headers: this.headers() });
  }

  async createForumPost(data: { title: string; content: string; topicTag: string }) {
    return fetch(`${API_BASE}/forum/question`, { method: "POST", headers: this.headers(), body: JSON.stringify(data) });
  }

  async replyToPost(data: { postId: string; content: string }) {
    return fetch(`${API_BASE}/forum/reply`, { method: "POST", headers: this.headers(), body: JSON.stringify(data) });
  }
}

export const api = new ApiService();
