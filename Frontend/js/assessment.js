const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://career-compass-api-allb.onrender.com";

const assessmentForm = document.querySelector("form");

async function validateCareerInput() {
  const career = document.querySelector("select").value;
  if (career === "Select a Career") {
    await alert("Please select a career.");

    throw new Error("Please select a career");
  }

  return career;
}

async function getSelectedModules() {
  const checkedModules = [];

  const checkboxes = document.querySelectorAll(".module-list input");

  checkboxes.forEach((box) => {
    if (box.checked) {
      checkedModules.push(box.value);
    }
  });

  if (checkedModules.length === 0) {
    await alert("Please select at least one completed module.");

    return;
  }

  return checkedModules;
}

assessmentForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const careerId = await validateCareerInput();
  const checkedModulesIds = await getSelectedModules();

  //   get results from data pipeline
  const res = await fetch(`${API_BASE_URL}/api/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      targetRoleId: careerId,
      moduleIds: checkedModulesIds,
    }),
  });

  if (!res.ok) {
    throw new Error("Unable to fetch results");
  }

  const data = await res.json();

  const results = data.results;
  localStorage.setItem("results", JSON.stringify(results));

  window.location.href = "results.html";
});

// function to add all of the careers listed in backend
async function getCareers() {
  const res = await fetch(`${API_BASE_URL}/api/career`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Unable to fetch careers");
  }

  const data = await res.json();

  const careers = data.careers;

  const career_list_ele = document.getElementById("career-list");

  if (career_list_ele) {
    careers.forEach((career) => {
      const optEle = document.createElement("option");
      optEle.value = career.id;
      optEle.innerHTML = career.name;

      career_list_ele.appendChild(optEle);
    });
  }
}

async function getModules() {
  // <label><input type="checkbox" /> Mathematics</label>
  const res = await fetch(`${API_BASE_URL}/api/module`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Unable to fetch modules");
  }

  const data = await res.json();

  const modules = data.modules;
  const modulesContainer = document.getElementById("module-list");
  if (modulesContainer && modules) {
    modules.forEach((module) => {
      const lbl = document.createElement("label");
      const input = document.createElement("input");

      lbl.innerHTML = `<input type="checkbox" value="${module.id}" /> ${module.fullName}`;
      modulesContainer.appendChild(lbl);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getCareers();
  getModules();
});
