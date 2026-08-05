// =============================
// Career Compass Results Charts
// =============================

// {
//   "match_percentage": 25,
//   "gap_percentage": 75,
//   "skills_matched": [
//     "Database Management & SQL"
//   ],
//   "skills_missing": [
//     "Data Structures & Algorithms",
//     "Full-Stack Web Development",
//     "Software Engineering & Patterns"
//   ]
// }

let results = null;

document.addEventListener("DOMContentLoaded", () => {
  results = JSON.parse(localStorage.getItem("results"));

  const matchHeader = document.getElementById("match-value");
  if (matchHeader) {
    matchHeader.innerHTML = `${results.match_percentage}%`;
  }

  const missingHeader = document.getElementById("missing-value");
  if (missingHeader) {
    missingHeader.innerHTML = results.skills_missing.length;
  }

  const missingSkillsContainer = document.getElementById("missing-skills");
  if (missingSkillsContainer) {
    const skills_missing = results.skills_missing || [];
    skills_missing.forEach((skill) => {
      const li = document.createElement("li");
      li.innerHTML = skill;
      missingSkillsContainer.appendChild(li);
    });
  }
});

// ---------- Radar Chart ----------

const radarCanvas = document.getElementById("radarChart");

if (radarCanvas) {
  new Chart(radarCanvas, {
    type: "radar",

    data: {
      labels: [
        "Programming",
        "Databases",
        "Web Dev",
        "Git",
        "REST APIs",
        "Cloud",
        "Problem Solving",
      ],

      datasets: [
        {
          label: "Your Skills",

          data: [85, 80, 90, 50, 45, 35, 88],

          fill: true,

          backgroundColor: "rgba(37,99,235,0.2)",

          borderColor: "#2563EB",

          borderWidth: 2,

          pointBackgroundColor: "#2563EB",
        },

        {
          label: "Industry Requirement",

          data: [90, 85, 90, 85, 90, 80, 90],

          fill: true,

          backgroundColor: "rgba(16,185,129,0.15)",

          borderColor: "#10B981",

          borderWidth: 2,

          pointBackgroundColor: "#10B981",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      scales: {
        r: {
          beginAtZero: true,

          max: 100,

          ticks: {
            stepSize: 20,
          },
        },
      },
    },
  });
}

// ---------- Bar Chart ----------

const barCanvas = document.getElementById("barChart");

if (barCanvas) {
  new Chart(barCanvas, {
    type: "bar",

    data: {
      labels: ["Programming", "Database", "Web", "Git", "REST", "Cloud"],

      datasets: [
        {
          label: "Skill Level (%)",

          data: [85, 80, 90, 50, 45, 35],

          backgroundColor: [
            "#2563EB",
            "#2563EB",
            "#2563EB",
            "#10B981",
            "#10B981",
            "#10B981",
          ],

          borderRadius: 8,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          max: 100,
        },
      },
    },
  });
}
