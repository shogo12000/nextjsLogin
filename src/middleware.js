import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto";

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verifica o token JWT usando jose
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
 
    return NextResponse.next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Aplica o middleware apenas em páginas protegidas
export const config = {
  matcher: ["/dashboard/:path*"],
};
