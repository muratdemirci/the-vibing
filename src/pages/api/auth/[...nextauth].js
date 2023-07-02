import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      // create default user tag
      const username = session.user.name
      .split(" ")
      .join("")
      .toLocaleLowerCase();

      // const randomStr = (Math.random() + 1).toString(36).substring(7);

      // const userTag = username + randomStr

      session.user.tag = username;

      session.user.uid = token.sub;
      return session;
    },
  },
});
