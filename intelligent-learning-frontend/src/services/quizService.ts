import API from "@/api/axios";

/* GET QUESTIONS BY TOPIC */
export const getQuizByTopic = async (topicId: string) => {
  const res = await API.get(`/quiz/${topicId}`);
  return res.data;
};

/* SUBMIT QUIZ */
export const submitQuiz = async (topicId: string, answers: any[]) => {
  const res = await API.post("/quiz/submit", {
    topicId,
    answers
  });
  return res.data;
};