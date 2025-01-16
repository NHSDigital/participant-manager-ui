import fs from "fs";
import path from "path";
import NextAuth, { Profile } from "next-auth";
import { OAuthConfig } from "next-auth/providers";

// Function to convert PEM to CryptoKey
async function pemToPrivateKey(pemPath: string): Promise<CryptoKey> {
  // Read PEM file
  const pem = fs.readFileSync(pemPath, "utf8");

  // Remove headers and convert to binary
  const pemContents = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  // Convert base64 to buffer
  const keyBuffer = Buffer.from(pemContents, "base64");

  // Import as CryptoKey
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-512",
    },
    true,
    ["sign"]
  );

  return privateKey;
}

// Get private key path
const privateKeyPath = path.join(process.cwd(), "keys", "private_key.pem");

// Convert PEM to CryptoKey
const clientPrivateKey = await pemToPrivateKey(privateKeyPath);

const NHS_LOGIN: OAuthConfig<Profile> = {
  id: "nhs-login",
  name: "NHS login authentication",
  type: "oidc",
  issuer: `${process.env.AUTH_NHSLOGIN_ISSUER_URL}`,
  wellKnown: `${process.env.AUTH_NHSLOGIN_ISSUER_URL}/.well-known/openid-configuration`,
  clientId: process.env.AUTH_NHSLOGIN_CLIENT_ID,
  authorization: {
    params: {
      scope: "openid profile email basic_demographics profile_extended",
    },
  },
  idToken: true,
  client: {
    token_endpoint_auth_method: "private_key_jwt",
    userinfo_signed_response_alg: "RS512",
  },
  token: {
    clientPrivateKey: clientPrivateKey,
  },
  checks: [],
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [NHS_LOGIN],
});
