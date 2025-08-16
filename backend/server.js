const Project = require("../models/projectModel");

// GET ALL PROJECTS
async function getAllProjects() {
  return await Project.find();
}

// GET PROJECT BY ID
async function getProjectById(id) {
  return await Project.findById(id);
}

// ADD NEW PROJECT
async function addProject({ name, description, status }) {
  const project = new Project({ name, description, status });
  return await project.save();
}

// UPDATE PROJECT
async function updateProject(id, { name, description, status }) {
  return await Project.findByIdAndUpdate(
    id,
    { name, description, status },
    { new: true }
  );
}

// DELETE PROJECT
async function deleteProject(id) {
  return await Project.findByIdAndDelete(id);
}

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
