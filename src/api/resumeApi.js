import { api } from "./core";

export const resumeApi = {
  auth: () => api.get("/user"),
  create: params => api.post("/resume/", params),
  delete: id => api.delete(`/resume/?resume_id=${id}`),
  copy: id => api.post(`/resume/copy?resume_id=${id}`),
  list: params => api.get("/resume/list", params),
  uploadImage: form => api.formPost("/resume/image", form),
  detail: id => api.get(`/resume/?resume_id=${id}`),
  profile: {
    detail: id => api.get(`/resume/profile?resume_id=${id}`),
    create: params => api.post("/resume/profile", params),
    update: params => api.put("/resume/profile", params),
    delete: id => api.delete(`/resume/profile?profile_id=${id}`),
  },
  introduce: {
    detail: id => api.get(`/resume/introduce?resume_id=${id}`),
    create: params => api.post("/resume/introduce", params),
    update: params => api.put("/resume/introduce", params),
    delete: id => api.delete(`/resume/introduce?introduce_id=${id}`),
  },
  education: {
    detail: id => api.get(`/resume/education?resume_id=${id}`),
    create: params => api.post("/resume/education", params),
    update: params => api.put("/resume/education", params),
    delete: id => api.delete(`/resume/education?education_id=${id}`),
  },
  career: {
    detail: id => api.get(`/resume/career?resume_id=${id}`),
    create: params => api.post("/resume/career", params),
    update: params => api.put("/resume/career", params),
    delete: id => api.delete(`/resume/career?career_id=${id}`),
  },
  project: {
    detail: id => api.get(`/resume/project?resume_id=${id}`),
    create: params => api.post("/resume/project", params),
    update: params => api.put("/resume/project", params),
    delete: id => api.delete(`/resume/project?project_id=${id}`),
  },
  experience: {
    detail: id => api.get(`/resume/experience?resume_id=${id}`),
    create: params => api.post("/resume/experience", params),
    update: params => api.put("/resume/experience", params),
    delete: id => api.delete(`/resume/experience?experience_id=${id}`),
  },
  skill: {
    detail: id => api.get(`/resume/skill?resume_id=${id}`),
    create: params => api.post("/resume/skill", params),
    update: params => api.put("/resume/skill", params),
    delete: id => api.delete(`/resume/skill?skill_id=${id}`),
  },
  link: {
    detail: id => api.get(`/resume/link?resume_id=${id}`),
    create: params => api.post("/resume/link", params),
    update: params => api.put("/resume/link", params),
    delete: id => api.delete(`/resume/link?link_id=${id}`),
  },
};
