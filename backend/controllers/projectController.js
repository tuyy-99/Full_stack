const projectService = require("../services/projectService");

// GET ALL PROJECTS
const getProjects = (req, res) => {
  const allProjects = projectService.getAllProjects();
  res.json(allProjects);
};

// GET SINGLE PROJECT
const getProject = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ message: "INVALID PROJECT ID" });

  const project = projectService.getProjectById(id);
  if (!project) return res.status(404).json({ message: "PROJECT NOT FOUND" });

  res.json(project);
};

// CREATE PROJECT
const createProject = (req, res) => {
  const { name, description, status } = req.body;
  if (!name || !description || !status) {
    return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  if (!["ongoing", "completed"].includes(status)) {
    return res.status(400).json({
      message: "STATUS MUST BE 'ongoing' OR 'completed'",
    });
  }
  const newProject = projectService.addProject({ name, description, status });
  res.status(201).json(newProject);
};

// UPDATE PROJECT
const updateProject = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ message: "INVALID PROJECT ID" });

  const { status } = req.body;
  if (status && !["ongoing", "completed"].includes(status)) {
    return res.status(400).json({
      message: "STATUS MUST BE 'ongoing' OR 'completed'",
    });
  }

  const updatedProject = projectService.updateProject(id, req.body);
  if (!updatedProject)
    return res.status(404).json({ message: "PROJECT NOT FOUND" });

  res.json(updatedProject);
};

// DELETE PROJECT
const deleteProject = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ message: "INVALID PROJECT ID" });

  const deleted = projectService.deleteProject(id);
  if (!deleted) return res.status(404).json({ message: "PROJECT NOT FOUND" });

  res.status(204).end();
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
