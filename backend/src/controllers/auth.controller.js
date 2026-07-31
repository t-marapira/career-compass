import { handleValidationErrors } from "../utils.js";
import prisma from "../prisma.js";
import { comparePasswords, hashPassword } from "../validation/hashing.js";

export async function getUser(req, res) {
  handleValidationErrors(req, res, async () => {
    const { email, password } = req.body;

    try {
      // try find user with email
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, msg: "Invalid email and/or password" });
      }

      const valid = await comparePasswords(password, user.password);

      if (!valid) {
        return res
          .status(404)
          .json({ success: false, msg: "Invalid email and/or password" });
      }

      return res.status(200).json({ success: true, user: { email } });

      return;
    } catch (error) {
      return res.status(500).json({ msg: "Server Error", error });
    }
  });
}

export async function createUser(req, res) {
  try {
    handleValidationErrors(req, res, async () => {
      const { email, password } = req.body;
      // create user
      const user = await prisma.user.findFirst({ where: { email } });
      if (user) {
        return res.status(409).json({
          success: false,
          msg: "A user with this email already exists",
        });
      }

      // hash password
      const hashed = await hashPassword(password);

      const newUser = await prisma.user.create({
        data: { email, password: hashed },
        select: { email: true },
      });

      if (!newUser) {
        return res
          .status(500)
          .json({ success: false, msg: "Internal Server Error" });
      }
      // user added successfully
      return res.status(201).json({
        success: true,
        msg: "User added successfully",
        createdUser: newUser,
      });
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", error });
  }
}
