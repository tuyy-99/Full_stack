const projects = require("../data/projectsData");

function getAllProjects() {
  return projects;
}

function getProjectById(id) {
  return projects.find((p) => p.id === id) || null;
}

function addProject({ name, description, status }) {
  const nextId = projects.length
    ? Math.max(...projects.map((p) => p.id)) + 1
    : 1;
  const newProject = { id: nextId, name, description, status };
  projects.push(newProject);
  return newProject;
}

function updateProject(id, updates) {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...updates };
  return projects[idx];
}

function deleteProject(id) {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  projects.splice(idx, 1);
  return true;
}

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
