// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// import { cookies } from "next/headers";

// const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto";

// export async function middleware(req) {
//   const cookieStore =  cookies();
//   const token = cookieStore.get("auth_token")?.value;

//   console.log(token);
//   console.log("middleware 0");
  
//   if (!token) {
//     console.log("Token não encontrado, redirecionando para /login");
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   console.log("middleware 1");
//   try {
//     // Verifica o token JWT usando jose
//     const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
//     console.log("Token verificado com sucesso:", payload);

//     // Configura cabeçalhos para evitar cache
//     const response = NextResponse.next();
//     response.headers.set("Cache-Control", "no-store");
//     return response;
//   } catch (error) {
//     console.error("Erro na verificação do token:", error.message);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// // Aplica o middleware apenas em páginas protegidas
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

export const config = {
  matcher: ["/:path*"],
};

export async function middleware(req) {
  console.log("Middleware executado para:", req.nextUrl.pathname);
  return NextResponse.next();
}