import api from "./api";

//SINGUP

export const signupUser = async (formData) => {
  const response = await api.post("/register", {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });

  return response.data;
};

//LOGIN

export const loginUser = async (formData) => {
  const response = await api.post("/login", {
    email: formData.email,
    password: formData.password,
  });

  return response.data;
};

//PROFILE

export const getProfile = async () => {
  const response = await api.get("/profile");

  return response.data;
};

//IMPROVE RESUME

export const improveResume = async (resumeText) => {
  const response = await api.post("/resume-improve", {
    resumeText,
  });

  return response.data;
}

export const generateInterviewQuestions = async (role) => {
  const response = await api.post("/interview-generator", {
    role,
  });

  return response.data;
};

export const generateMockQuestion = async (role) => {
  const response = await api.post("/mock-interview/question", {
    role,
  });

  return response.data;
};

export const evaluateMockAnswer = async ({ role, question, answer }) => {
  const response = await api.post("/mock-interview/evaluate", {
    role,
    question,
    answer,
  });

  return response.data;
};

export const getInterviewHistory = async () => {
  const response = await api.get("/mock-interview/history");

  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get("/dashboard");

  return response.data;
};