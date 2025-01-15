import NextAuth, { Profile } from "next-auth";
import { OAuthConfig } from "next-auth/providers";

const NHS_LOGIN: OAuthConfig<Profile> = {
  id: "nhs-login",
  name: "NHS login authentication",
  type: "oidc",
  issuer: `${process.env.AUTH_NHSLOGIN_ISSUER_URL}`,
  wellKnown: `${process.env.AUTH_NHSLOGIN_ISSUER_URL}/.well-known/openid-configuration`,
  clientId: process.env.AUTH_NHSLOGIN_CLIENT_ID,
  clientSecret: process.env.AUTH_NHSLOGIN_CLIENT_SECRET,
  authorization: {
    params: {
      scope: "",
    },
  },
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  idToken: false,
  checks: ["state"],
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [NHS_LOGIN],
});
