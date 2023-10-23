import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from '@/app/libs/mysql'

try {
    var conn = connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}


import axios from "axios";
import { findByEmailLog } from "../../users/route";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jhondoe@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        // console.log(credentials?.email + "eeee");
        const userFound = await findByEmailLog(credentials?.email);
        console.log(userFound);
        
        if (userFound.status === 404) {
          throw new Error("Usuario no encontrado, trata con otro de nuevo")
        }

        const verifyPass = await bcrypt.compare(credentials?.password, userFound.password);

        if (verifyPass ==  true) {
          return userFound;
        } else {
          throw new Error("verifica que la contraseña sea la correcta")
        }
        return null
      }
    })


  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (user) { token.user = user; }
      // console.log(token);
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  },

  pages: {
    signIn: '/login',
    newUser: '/register',
  },
})

export { handler as GET, handler as POST }