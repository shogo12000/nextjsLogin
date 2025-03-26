import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto";
const prisma = new PrismaClient();

export async function POST(req) {
    const cookieStore = await cookies()
    try {
        const { email, password } = await req.json();
 
        const user = await prisma.testeUser.findUnique({
            where: { email },
        });
  
        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }
 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }
 
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "1h",
        }); 
 
        const response = NextResponse.json({ message: "Login bem-sucedido" });
 
        cookieStore.set("auth_token",token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hora
            path: "/",
        }); 

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Erro no login" }, { status: 500 });
    }
}