import { Auth0Client, filterDefaultIdTokenClaims } from '@auth0/nextjs-auth0/server';
import type { SessionData } from '@auth0/nextjs-auth0/types';


if (!process.env.APP_BASE_URL) {
  throw new Error(
    'APP_BASE_URL environment variable is required. ' +
    'Set it to your application origin (e.g. https://your-app.com) in .env.local and all deployed environments.'
  );
}

export const auth0 = new Auth0Client({

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