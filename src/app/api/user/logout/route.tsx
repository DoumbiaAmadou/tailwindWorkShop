import { AccessTokenType, verifyWebToken } from "@/lib/Encrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function POST(req: Request, res: Response) {
  const { userId } = await req.json();
  const xsrfToken = req.headers.get("Authorization")?.split(" ")[1];
  const encodedToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refeshToken")?.value;
  if (!encodedToken || !xsrfToken)
    return NextResponse.json({ error: "Need Access Token", status: 401 });

  const accessToken: AccessTokenType = verifyWebToken(encodedToken);
  if (xsrfToken === accessToken.xsrfToken && userId === accessToken.id) {
    cookies().delete("access_token");
    cookies().delete("refeshToken");
    await prisma.refreshToken.deleteMany({ where: { token: xsrfToken } });
    return NextResponse.json({ response: true, status: 200 });
  }
  return NextResponse.json({ error: "HackTry Log IN", status: 401 });
}
