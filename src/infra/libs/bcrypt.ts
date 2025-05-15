import * as bcrypt from "bcrypt";

const SALT = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT);
}

export async function compareHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
