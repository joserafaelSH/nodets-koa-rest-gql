import { DEFAULT_ROLE } from "../../app/dto/auth";
import { CreateUserDto, UserLoginDto } from "../../app/dto/user";
import { compareHash, hashPassword } from "../../infra/libs/bcrypt";
import { createToken } from "../../infra/libs/jwt";
import { removePass, User } from "../entities/user";
import { USERS } from "../repository/user";

export async function createUser(user: CreateUserDto): Promise<User> {
  const pass = await hashPassword(user.pass);
  const newUser: User = { email: user.email, role: DEFAULT_ROLE, pass };
  return newUser;
}

export async function register(user: CreateUserDto): Promise<User> {
  if (!user.email || !user.pass) throw new Error("Invalid input");

  const foundedUser = USERS.get(user.email);
  if (foundedUser) throw new Error("User already exists");

  const newUser = await createUser(user);
  USERS.set(newUser.email, newUser);
  return removePass(newUser);
}

export async function login(user: UserLoginDto): Promise<string> {
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
