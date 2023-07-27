import { hashFromEncrypt } from "@/lib/Encrypt";
import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function POST(req: Request, res: Response) {
  const { cellphone, city, email, password, firstName, name, userStatus } =
    await req.json();
  if ([name, password, email].some((e) => e.length < 4))
    return NextResponse.json({ error: "shortdata" }, { status: 401 });
  //check is email already exist:
  const check =
    (await prisma.users.findMany({ where: { email } })).length > 0 ?? true;
  if (check)
    return NextResponse.json({ error: "User Already exist" }, { status: 401 });
  //encrypt password
  const encryptedPassword = hashFromEncrypt(password);
  const data = {
    cellphone,
    city,
    email,
    firstName,
    name,
    userStatus,
    password: encryptedPassword,
  };
  //create Users
  const user = await prisma.users.create({ data });
  //return 401 on error Occurred
  if (!user) return NextResponse.json("error: create Failed", { status: 401 });
  //format result
  const { password: _, ...rest } = user;
  let result: Omit<typeof user, "password"> = { ...rest };
  return NextResponse.json(result);
}
