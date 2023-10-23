import { url } from "inspector";
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest){
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET})
  const ROLE_EMAIL = "ADMIN@gmail.com";
  const requestedPage = req.nextUrl.pathname;
  console.log(requestedPage);
  

  // revisar este aspecto 
  if(requestedPage.includes("/admin")){

    if(session !== null && session.email !== ROLE_EMAIL){
      const url = req.nextUrl.clone();
      url.pathname = `/home`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }else if(!session){
      const url = req.nextUrl.clone();
      url.pathname = `/login`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
  }

  if(requestedPage.includes("/home/:path*") || requestedPage.includes("/home")){
    if(!session){
      
      const url = req.nextUrl.clone();
      url.pathname = `/login`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
  }

  if(requestedPage.includes("/login") || requestedPage.includes("/register")){
    if(session){
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/home`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
  }
 

  // verificar los roles

  return NextResponse.next();
  

}

// export const config = { matcher: ["/admin"] }


// export const config = {
//   matcher: ["/home"],
// }

