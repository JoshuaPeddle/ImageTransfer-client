import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { createUser, getUser } from '@/lib/User';
export const authOptions = {
  callbacks: {
    async jwt({ token }:any) {
      // Initial sign in
      const user = await getUser(token.email);
      if (user) {
        token.num_tokens = user.num_tokens;
        return token;
      }
      // User doesnt exist, create them
      const new_user = await createUser(token.email, token.name);
      if (new_user) {
        token.num_tokens = new_user.num_tokens;
        return token;
      }
      console.log('Error creating user');
      return token;
    },
    async session({ session, token }:any) {
      // Add the user id to the session right after signin
      session.user.num_tokens = token.num_tokens;
      return session;
    }
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);