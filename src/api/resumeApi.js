import { api } from "./core";

export const resumeApi = {
  create: params => api.post("/resume/", params),
  delete: id => api.delete(`/resume/?resume_id=${id}`),
  copy: id => api.post(`/resume/copy?resume_id=${id}`),
  list: params => api.get("/resume/list", params),
  uploadImage: form => api.formPost("/resume/image", form),
  profile: {
    detail: id => api.get(`/resume/profile?resume_id=${id}`),
    create: params => api.post("/resume/profile", params),
    update: params => api.put("/resume/profile", params),
    delete: id => api.delete(`/resume/profile?profile_id=${id}`),
  },
  createIntroduce: params => api.post("/resume/introduce", params),
  createEducation: params => api.post("/resume/education", params),
  createCareer: params => api.post("/resume/career", params),
  createProject: params => api.post("/resume/project", params),
  createExperience: params => api.post("/resume/experience", params),
  createSkill: params => api.post("/resume/skill", params),
  createLink: params => api.post("/resume/link", params),
};
