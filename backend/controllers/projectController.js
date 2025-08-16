const projectService = require("../services/projectService");

// GET ALL PROJECTS
const getProjects = (req, res) => {
  const allProjects = projectService.getAllProjects();
  res.json(allProjects);
};

// GET SINGLE PROJECT BY ID
const getProject = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ message: "Invalid project ID" });

  const project = projectService.getProjectById(id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  res.json(project);
};

// CREATE NEW PROJECT
const createProject = (req, res) => {
  const { name, description, status } = req.body;
  if (!name || !description || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!["ongoing", "completed"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Status must be 'ongoing' or 'completed'" });
  }
  const newProject = projectService.addProject({ name, description, status });
  res.status(201).json(newProject);
};

// UPDATE EXISTING PROJECT
const updateProject = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ message: "Invalid project ID" });

  const { status } = req.body;
  if (status && !["ongoing", "completed"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Status must be 'ongoing' or 'completed'" });
  }

  const updatedProject = projectService.updateProject(id, req.body);
  if (!updatedProject)
    return res.status(404).json({ message: "Project not found" });

  res.json(updatedProject);
};

// DELETE PROJECT BY ID
const deleteProject = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ message: "Invalid project ID" });

  const deleted = projectService.deleteProject(id);
  if (!deleted) return res.status(404).json({ message: "Project not found" });

  res.status(204).end();
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
