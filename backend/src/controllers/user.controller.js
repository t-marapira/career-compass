import prisma from "../prisma.js";
import { handleValidationErrors } from "../utils.js";

export async function getUserSkills(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findFirst({
        where: { id },
        include: { completedModules: true, skills: true },
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "User with ID not found" });
      }

      const skills = user.skills;
      return res.status(200).json({ success: true, skills });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}

export async function addUserSkill(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { id } = req.params;
      const { skillIds } = req.body;

      const user = await prisma.user.findFirst({ where: { id } });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "User with provided id not found" });
      }

      const updated = await prisma.user.update({
        where: { id },
        data: {
          skills: {
            connect: skillIds.map((skillId) => ({
              id: skillId,
            })),
          },
        },

        select: {
          id: true,
          skills: true,
        },
      });

      return res
        .status(200)
        .json({ success: true, msg: "Skill added successfully", updated });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
        error,
      });
    }
  });
}

export async function addUserModules(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { id } = req.params;
      const { moduleIds } = req.body;

      const user = await prisma.user.findFirst({ where: { id } });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "User with provided id not found" });
      }

      const updated = await prisma.user.update({
        where: { id },
        data: {
          completedModules: {
            connect: moduleIds.map((moduleId) => ({
              id: moduleId,
            })),
          },
        },

        select: {
          id: true,
          completedModules: true,
        },
      });

      return res
        .status(200)
        .json({ success: true, msg: "Module added successfully", updated });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}
