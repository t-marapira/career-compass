import prisma from "../prisma.js";
import { handleValidationErrors } from "../utils.js";

export async function createModule(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { modules } = req.body;

      const created_modules = await prisma.module.createMany({
        data: modules,
        skipDuplicates: true,
      });
      //   Done
      return res.status(201).json({
        success: true,
        msg: "Module created successfully",
        created_modules,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error creating module:", error });
    }
  });
}

export async function getModules(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const modules = await prisma.module.findMany();

      return res.status(200).json({ success: true, modules });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}

export async function addSkills(req, res) {
  handleValidationErrors(req, res, async () => {
    const { id } = req.params;
    const { skillIds } = req.body;
    try {
      const module = await prisma.module.findFirst({ where: { id } });
      if (!module) {
        return res
          .status(404)
          .json({ success: false, msg: "Module not found" });
      }

      const updatedModule = await prisma.module.update({
        where: { id },
        data: {
          acquiredSkills: {
            connect: skillIds.map((skillId) => ({ id: skillId })),
          },
        },
        include: {
          acquiredSkills: true,
        },
      });

      return res.status(200).json({
        success: true,
        msg: "Skill added successfully",
        updatedModule,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}
