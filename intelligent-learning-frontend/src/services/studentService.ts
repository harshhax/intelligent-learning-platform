import API from "@/api/axios";

// weak topics
export const getWeakTopics = async () => {
  const res = await API.get("/student/weak-topics");
  return res.data;
};

// recommendations
export const getRecommendations = async () => {
  const res = await API.get("/student/recommendations");
  return res.data;
};

// study plan
export const getStudyPlan = async () => {
  const res = await API.get("/student/study-plan");
  return res.data;
};