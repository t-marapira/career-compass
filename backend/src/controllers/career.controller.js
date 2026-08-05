import prisma from "../prisma.js";
import { handleValidationErrors } from "../utils.js";

export async function createCareer(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { name, skillIds } = req.body;

      const career = await prisma.career.create({
        data: {
          name,
          requiredSkills: {
            connect: skillIds.map((skillId) => ({ id: skillId })),
          },
        },
        include: {
          requiredSkills: true,
        },
      });

      return res.status(201).json({ success: true, career });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}

export async function addSkill(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { id } = req.params;
      const { skillIds } = req.body;

      const career = await prisma.career.findFirst({ where: { id } });

      if (!career) {
        return res
          .status(404)
          .json({ success: false, msg: "Career with ID not found" });
      }

      const updated = await prisma.career.update({
        where: { id },
        data: { requiredSkills: { connect: skillIds.map((id) => ({ id })) } },
        include: { requiredSkills: true },
      });

      return res.status(200).json({ success: true, updated });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}

export async function getCareerByID(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { id } = req.params;

      const career = await prisma.career.findFirst({
        where: { id },
        include: { requiredSkills: true },
      });

      if (!career) {
        return res
          .status(404)
          .json({ success: false, msg: "Career with ID not found" });
      }

      return res.status(200).json({ success: true, career });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}
