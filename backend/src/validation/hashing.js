import bcrypt from "bcrypt";

export async function hashPassword(plain) {
  const saltRounds = 11;
  const hashed = await bcrypt.hash(plain, saltRounds);

  return hashed;
}

export async function comparePasswords(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}
