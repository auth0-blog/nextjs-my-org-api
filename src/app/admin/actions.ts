"use server";

import { auth0 } from "@/lib/auth0";
import { isOrgAdmin } from "@/lib/auth0-utils";
import { MyOrganizationClient, MyOrganization } from "@auth0/myorganization-js";
import { applyColorDefaults, pruneEmpty } from "@/lib/org-utils";

export async function saveOrgSettings(settings: MyOrganization.OrgDetails) {
    // Guard this Server Action to ensure only authenticated org admins can call it.
    const session = await auth0.getSession();
    if (!session) throw new Error("Not authenticated");
    if (!isOrgAdmin(session.user)) throw new Error("Admin access required");

     // 👇 new code 
    if (!process.env.AUTH0_DOMAIN) throw new Error('AUTH0_DOMAIN environment variable is not set');

    // getAccessToken will automatically refresh the token if it's expired or about to expire.
    const { token } = await auth0.getAccessToken();
    const client = new MyOrganizationClient({
        domain: process.env.AUTH0_DOMAIN,
        token: async () => token,
    });
    // 👆 new code


    // 👇 new code 
    // Build branding with color defaults, then prune empty strings/null/undefined.
    const rawBranding = settings.branding ? {
        logo_url: settings.branding.logo_url,
        colors: applyColorDefaults(settings.branding.colors),
    } : undefined;
  
    const branding = rawBranding ? pruneEmpty(rawBranding) : undefined;
    
    // Only send fields the Auth0 PATCH endpoint accepts.
    const updatePayload = {
        name: settings.name,
        display_name: settings.display_name,
        ...(branding !== undefined && { branding }),
    };
    // 👆 new code

    // 👇 new code
    const prunedUpdatePayload = pruneEmpty(updatePayload);
    if (Object.keys(prunedUpdatePayload).length === 0) {
        throw new Error("No valid fields to update");
    }
    return await client.organizationDetails.update(prunedUpdatePayload);
     // 👆 new code
}