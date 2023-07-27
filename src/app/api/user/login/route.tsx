import {
  generateAccesToken,
  generateRandomRefreshToken,
  verifyHash,
} from "@/lib/Encrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

interface LoginType {
  email: string;
  password: string;
}
export type UserTypeDTO = {
  id: string;
  cellphone: string | null;
  city: string;
  email: string;
  firstName: string;
  name: string;
  userStatus: string | null;
};
export async function POST(req: Request, res: Response) {
  const { email, password }: LoginType = await req.json();
  const user = await prisma.users.findUnique({
    where: { email: email },
  });

  if (!user) return NextResponse.json("error: Auth Failed", { status: 401 });
  const checkedPassword = verifyHash(user.password, password);
  if (!checkedPassword)
    return NextResponse.json({ error: "wrong password" }, { status: 401 });

  const { password: _, ...rest } = user;

  //generate xsrfToken token
  const xsrfToken = generateRandomRefreshToken();
  //generate Acces Token
  const accessToken = generateAccesToken({ ...rest, xsrfToken });
  //refresh token, not used actually maybe in futhur.
  const refreshToken = generateRandomRefreshToken();

  await prisma.refreshToken.create({
    data: {
      userid: user.id,
      token: refreshToken,
      expiration: String(Date.now() + 36000),
    },
  });
  cookies().set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 360000,
  });
  cookies().set("refeshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 360000,
    path: "/token",
  });

  let result: UserTypeDTO = { ...rest };
  return NextResponse.json({ result, xsrfToken });
}
