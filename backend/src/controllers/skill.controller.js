import prisma from "../prisma.js";
import { handleValidationErrors } from "../utils.js";

export async function createSkill(req, res) {
    handleValidationErrors(req, res, async () => {
        const { name, recommendations } = req.body
        try {
            const skill = await prisma.skill.create({ data: { name, recommendations } })
            if(!skill){
                return res.status(500).json({ success: false, msg: "internal server error" })
            }
            return res.status(201).json({ success: true, msg: "skill created successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, msg: "internal server error", error })
        }




    })
}

export async function getSkill(req,res){
    const { name, recommendations } = req.body
     try {
        const skills = await prisma.skill.findMany();
        return res.status(200).json({ success: true, data: skills });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "internal server error", error });
    }
}