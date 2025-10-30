import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { signIn } from "next-auth/react";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: credentials.email,
                    password: credentials.password,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok || !data.jwt)
            throw new Error(data.error?.message || "Login Failed")

        //Return user object to store in session
        return {
            id: data.user.id,
            name: data.user.username,
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            jwt: data.jwt,
        };
    },
  }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
    if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
    }
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.id;
    session.jwt = token.jwt;
    session.user.firstName = token.firstName;
    session.user.lastName = token.lastName;
    return session;
  },
},
pages: {
    signIn: '/login', //custom login page
},
secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };