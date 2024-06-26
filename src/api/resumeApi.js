import { api } from "./core";

export const resumeApi = {
  create: params => api.post("/resume/", params),
  delete: id => api.delete(`/resume/?resume_id=${id}`),
  copy: id => api.post(`/resume/copy?resume_id=${id}`),
  list: params => api.get("/resume/list", params),
  uploadImage: form => api.formPost("/resume/image", form),
  profile: params => api.post("/resume/profile", params),
  introduce: params => api.post("/resume/introduce", params),
  education: params => api.post("/resume/education", params),
  career: params => api.post("/resume/career", params),
  project: params => api.post("/resume/project", params),
  experience: params => api.post("/resume/experience", params),
  skill: params => api.post("/resume/skill", params),
  link: params => api.post("/resume/link", params),
};
