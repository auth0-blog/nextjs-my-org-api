import OrgSettingsForm from "./OrgSettingsForm";
// add imports
import { auth0 } from "@/lib/auth0";
import { MyOrganization, MyOrganizationClient } from "@auth0/myorganization-js";

export default async function AdminDashboard() {

    // 👇 new code 

  if (!process.env.AUTH0_DOMAIN) throw new Error('AUTH0_DOMAIN environment variable is not set');    
  const session = await auth0.getSession();
  const token = session?.tokenSet?.accessToken;
  if (!token) throw new Error("No access token in session");
  // Initialize the MyOrganizationClient.
  const client = new MyOrganizationClient({
    domain: process.env.AUTH0_DOMAIN,
    token: token,
  });

  // 👆 new code

  // 👇 new code 
  // Fetch initial org settings to populate the form. This is a Server Component, so the data is fresh on each request.
  const initialSettings: MyOrganization.OrgDetailsRead =
    (await client.organizationDetails.get()) ?? {};
  // 👆 new code

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)] w-full p-4">
      <div className="bg-surface rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] p-8 px-10 max-w-[900px] w-[90%] animate-[fadeInScale_0.6s_ease-out]">
        <h1 className="text-[2rem] font-bold text-app-text mb-1 text-center [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">Admin Dashboard</h1>
        <p className="text-[0.95rem] text-text-muted text-center mb-8 font-normal">Manage your organization settings</p>
        {/* 👇 change code  */}
        <OrgSettingsForm initialSettings={initialSettings} />
        {/* 👆 change code  */}
      </div>
    </div>
  );
}
