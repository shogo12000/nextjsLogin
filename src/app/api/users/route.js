import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
 

    const existingUser = await prisma.testeUser.findUnique({
      where: { email },
    });
 

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe!" }, { status: 400 });
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.testeUser.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}