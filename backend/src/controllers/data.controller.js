import { runMatch } from "../../data/data.js";
import { handleValidationErrors } from "../utils.js";

export async function getData(req, res) {
  handleValidationErrors(req, res, async () => {
    try {
      const { moduleIds, targetRoleId } = req.body;

      const results = await runMatch(moduleIds, targetRoleId);

      return res.status(200).json({ success: true, results });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  });
}
