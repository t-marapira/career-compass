import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const apiUrl = `http://localhost:${PORT}/api`;

async function getRoleSkills(roleId) {
  const res = await fetch(`${apiUrl}/career/${roleId}`);

  const data = await res.json();

  if (!data.success) {
    throw new Error(`Error getting career data:${data.msg}`);
  }

  const skills = data.career.requiredSkills;

  return skills.map((skill) => skill.name);
}

async function getStudentSkills(studentId) {
  const response = await fetch(`/api/student/${studentId}/acquired-skills`);
  const data = await response.json();
  return data; // assuming backend already sends a flat array here
}

async function getModuleSkills(moduleId) {
  const res = await fetch(`${apiUrl}/module/${moduleId}`);

  const data = await res.json();

  if (!data.success) {
    throw new Error(`Error getting module data:${data.msg}`);
  }

  const skills = data.module.acquiredSkills;

  return skills.map((skill) => skill.name);
}

export async function runMatch(moduleIds, roleId) {
  const modulesSkills = (
    await Promise.all(moduleIds.map((id) => getModuleSkills(id)))
  ).flat();
  const roleSkills = await getRoleSkills(roleId);
  return calculateSkillMatch(roleSkills, modulesSkills);
}

//  async function runMatch(studentId, roleId) {
//   const requiredSkills = await getRoleSkills(roleId);
//   const acquiredSkills = await getStudentSkills(studentId);
//   return calculateSkillMatch(requiredSkills, acquiredSkills);
// }

function flattenRequiredSkills(requiredSkillClusters) {
  let allSkills = [];
  requiredSkillClusters.forEach((cluster) => {
    allSkills = allSkills.concat(cluster.required_skills);
  });
  return allSkills;
}

function calculateSkillMatch(requiredSkills, acquiredSkills) {
  // Normalize so "React.js" vs "react js" etc. still matches
  const normalize = (skill) => skill.toLowerCase().trim();

  const acquiredSet = new Set(acquiredSkills.map(normalize));

  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((skill) => {
    if (acquiredSet.has(normalize(skill))) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const matchPercentage =
    requiredSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / requiredSkills.length) * 100);

  const gapPercentage = 100 - matchPercentage;

  return {
    match_percentage: matchPercentage,
    gap_percentage: gapPercentage,
    skills_matched: matchedSkills,
    skills_missing: missingSkills,
  };
}
