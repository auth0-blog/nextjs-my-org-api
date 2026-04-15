import { Auth0Client, filterDefaultIdTokenClaims } from '@auth0/nextjs-auth0/server';
import type { SessionData } from '@auth0/nextjs-auth0/types';


if (!process.env.APP_BASE_URL) {
  throw new Error(
    'APP_BASE_URL environment variable is required. ' +
    'Set it to your application origin (e.g. https://your-app.com) in .env.local and all deployed environments.'
  );
}

export const auth0 = new Auth0Client({

  // authorizationParameters are passed to the /authorize endpoint. 
  // required scope of 'openid profile email offline_access' and custom scopes for API access. Audience is required to get a refresh token.
  authorizationParameters: {
    scope: 'openid profile email offline_access read:my_org:details update:my_org:details',
    ...(process.env.AUTH0_DOMAIN && {
      audience: `https://${process.env.AUTH0_DOMAIN.replace(/\/$/, '')}/my-org/`,
    }),
  },

  // The SDK will attempt to renew the token if the user is active and the token will expire within the next 180 seconds. 
  tokenRefreshBuffer: 180,

  // Filter out default ID token claims and promote custom namespaced claims (org_roles) to top-level claims for easier access throughout the app.
  async beforeSessionSaved(session: SessionData) {
    // Namespace for custom claims set via Auth0 Actions
    const namespace = 'https://my-app';
    const orgRoles = session.user[`${namespace}/org_roles`];
 
    return {
      ...session,
      user: {
        ...filterDefaultIdTokenClaims(session.user),
        // Promote namespaced org_roles to a top-level claim for app-wide use
        ...(orgRoles !== undefined ? { org_roles: orgRoles } : {}),
      },
    };
  },
});