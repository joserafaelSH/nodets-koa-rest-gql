import { compareHash, hashPassword } from "../libs/bcrypt";
import { createToken } from "../libs/jwt";

export type UserLogin = {
  email: string;
  pass: string;
};

export type CreateUser = {
  email: string;
  pass: string;
};

export type User = {
  email: string;
  pass: string;
  role: string;
};

export const VALID_ROLES = ["ADMIN", "USER"];
export const DEFAULT_ROLE = VALID_ROLES[1];

export function removePass(user: User): User {
  const newUser = { ...user };
  newUser.pass = "";
  return newUser;
}

export async function createUser(user: CreateUser): Promise<User> {
  const pass = await hashPassword(user.pass);
  const newUser: User = { email: user.email, role: DEFAULT_ROLE, pass };
  return newUser;
}

export const USERS: Map<string, User> = new Map<string, User>();

export async function setUsers() {
  USERS.set("user1@test.com", {
    email: "user1@test.com",
    pass: await hashPassword("123"),
    role: DEFAULT_ROLE,
  });
  USERS.set("user2@test.com", {
    email: "user2@test.com",
    pass: await hashPassword("123"),
    role: "ADMIN",
  });
}

export async function register(user: CreateUser): Promise<User> {
  if (!user.email || !user.pass) throw new Error("Invalid input");

  const foundedUser = USERS.get(user.email);
  if (foundedUser) throw new Error("User already exists");

  const newUser = await createUser(user);
  USERS.set(newUser.email, newUser);
  return removePass(newUser);
}

export async function login(user: UserLogin): Promise<string> {
  if (!user.email || !user.pass) throw new Error("Invalid input");
  const foundedUser = USERS.get(user.email);
  if (!foundedUser) throw new Error("Invalid user or pass");
  const isValidPass = await compareHash(user.pass, foundedUser.pass);
  if (!isValidPass) throw new Error("Invalid user or pass");
  const jwtToken = createToken({
    email: foundedUser.email,
    role: foundedUser.role,
  });

  return jwtToken;
}
