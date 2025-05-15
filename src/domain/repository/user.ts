import { DEFAULT_ROLE } from "../../app/dto/auth";
import { hashPassword } from "../../infra/libs/bcrypt";
import { User } from "../entities/user";

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
