
async function getRoleSkills(roleId) {
  return ["HTML5/CSS"]

  const response = await fetch(`/api/role-requirements/${roleId}`);
  const data = await response.json();
//   return flattenRequiredSkills(data.required_skill_clusters);
}

async function getStudentSkills(studentId) {
  const response = await fetch(`/api/student/${studentId}/acquired-skills`);
  const data = await response.json();
  return data; // assuming backend already sends a flat array here
}

async function runMatch(studentId, roleId) {
  const requiredSkills = await getRoleSkills(roleId);
  const acquiredSkills = await getStudentSkills(studentId);
  return calculateSkillMatch(requiredSkills, acquiredSkills);
}
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

  const matchPercentage = requiredSkills.length === 0
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

const roleSkills = await getRoleSkills(34)

console.log(calculateSkillMatch(roleSkills,["HTML5/CSS"]))