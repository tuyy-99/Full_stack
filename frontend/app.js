const API_URL = "http://localhost:3000/api/projects";

const projectsList = document.getElementById("projects-list");
const projectForm = document.getElementById("project-form");
const submitBtn = document.getElementById("submit-btn");
const formTitle = document.getElementById("form-title");

let editingId = null;

async function fetchProjects() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("FAILED TO FETCH PROJECTS");
    const projects = await res.json();
    renderProjects(projects);
  } catch (err) {
    console.error(err);
    projectsList.innerHTML = "<p>Failed to load projects.</p>";
  }
}

function renderProjects(projects) {
  if (!projects.length) {
    projectsList.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projectsList.innerHTML = projects
    .map(
      (p) => `
    <div class="project-card">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="project-status ${
        p.status === "completed" ? "status-completed" : "status-ongoing"
      }">
        ${p.status.charAt(0).toUpperCase() + p.status.slice(1)}
      </div>

      <div class="actions">
        <button class="btn edit-btn"   data-id="${p.id}">Edit</button>
        <button class="btn delete-btn" data-id="${p.id}">Delete</button>
      </div>
    </div>
  `
    )
    .join("");

  // ATTACH BUTTON LISTENERS
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => startEdit(btn.getAttribute("data-id")));
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      handleDelete(btn.getAttribute("data-id"))
    );
  });
}

async function startEdit(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("FAILED TO LOAD PROJECT");
    const project = await res.json();

    projectForm.elements["name"].value = project.name;
    projectForm.elements["description"].value = project.description;
    projectForm.elements["status"].value = project.status;

    // SET EDIT STATE
    editingId = Number(id);
    formTitle.textContent = "Edit Project";
    submitBtn.textContent = "Update Project";
  } catch (err) {
    alert(err.message);
  }
}

// DELETE A PROJECT BY ID
async function handleDelete(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error("FAILED TO DELETE");
    fetchProjects();
    if (editingId === Number(id)) resetFormMode();
  } catch (err) {
    alert(err.message);
  }
}

// SUBMIT HANDLER: ADD OR UPDATE BASED ON editingId
projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(projectForm);
  const payload = {
    name: formData.get("name").trim(),
    description: formData.get("description").trim(),
    status: formData.get("status"),
  };

  if (!payload.name || !payload.description || !payload.status) {
    alert("PLEASE FILL ALL FIELDS");
    return;
  }

  try {
    if (editingId !== null) {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("FAILED TO UPDATE PROJECT");
      resetFormMode();
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("FAILED TO ADD PROJECT");
    }
    fetchProjects();
  } catch (err) {
    alert(err.message);
  }
});
function resetFormMode() {
  projectForm.reset();
  editingId = null;
  formTitle.textContent = "Add New Project";
  submitBtn.textContent = "Add Project";
}
fetchProjects();
