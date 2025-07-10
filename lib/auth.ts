import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import smoastersApi from './http';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 6 * 24 * 60 * 60, // 6 days
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          value: 'munashemailers@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      //Note: @ralph temporary fix when dealing with next-auth credentials provider with ts
      async authorize(credentials): Promise<any> {
        return (
          smoastersApi
            .post(`/login`, {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((response) => {
              return {
                ...response.data,
                accessToken: response.data.access_token,
              };
            })
            .catch((error) => {
              console.log(error);
              throw new Error(error.response.data.message);
            }) || null
        );
      },
    }),
  ],
  secret: 'RvHUu3anYw6Zm0v65aQTubNkXeWtRbl031imBS3+t9E',
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          accessToken: user?.accessToken,
        };
      }
      return token;
    },
  },
};
