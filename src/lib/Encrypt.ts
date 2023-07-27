import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export interface AccessTokenType {
  name: string;
  email: string;
  id: string;
  cellphone: string | null;
  city: string;
  firstName: string;
  userStatus: string | null;
  xsrfToken: string
}
export const verifyHash = (hash: string, password: string) =>
  bcrypt.compareSync(password, hash);
export const hashFromEncrypt = (password: string) =>
  bcrypt.hashSync(password, 10);
export const generateAccesToken = (input: AccessTokenType) =>
  jwt.sign(input, "Bearer " + process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
export const verifyWebToken = (token: string) =>
  jwt.verify(token, "Bearer " + process.env.JWT_SECRET) as AccessTokenType;

export const generateRandomRefreshToken = () =>
  crypto.randomBytes(128).toString("base64");
