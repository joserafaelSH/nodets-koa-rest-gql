import jwt from "jsonwebtoken";

const jwtOptions: jwt.SignOptions = {
  algorithm: "HS256",
  expiresIn: "30m",
  notBefore: "10s",
  audience: "leaky-bucket-fe",
  issuer: "leaky-bucket-be",
  jwtid: "unique-jwt-id-12345",
};

const secret = process.env["JWT_SECRET"] || "lol";

export type JwtPayload = {
  email: string;
  role: string;
};

export function createToken(payload: JwtPayload) {
  return jwt.sign(payload, secret, jwtOptions);
}

export function validateToken(token: string) {
  return jwt.verify(token, secret);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
