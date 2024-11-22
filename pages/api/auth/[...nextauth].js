import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '/lib/prisma'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { 
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Attach user information to the session
      if (user) {
        session.user.id = user.id;
        session.user.image = user.image;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma)
}
export default NextAuth(authOptions)