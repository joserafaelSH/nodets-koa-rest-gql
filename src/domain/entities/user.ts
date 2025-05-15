export type User = {
  email: string;
  pass: string;
  role: string;
};

export function removePass(user: User): User {
  const newUser = { ...user };
  newUser.pass = "";
  return newUser;
}
