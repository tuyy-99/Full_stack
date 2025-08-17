const projects = require("../data/projectsData");

// GET ALL PROJECTS
function getAllProjects() {
  return projects;
}

// GET ONE PROJECT
function getProjectById(id) {
  return projects.find((p) => p.id === id) || null;
}

// ADD PROJECT
function addProject({ name, description, status }) {
  const nextId = projects.length
    ? Math.max(...projects.map((p) => p.id)) + 1
    : 1;
  const newProject = { id: nextId, name, description, status };
  projects.push(newProject);
  return newProject;
}

// UPDATE PROJECT
function updateProject(id, updates) {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...updates };
  return projects[idx];
}

// DELETE PROJECT
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
