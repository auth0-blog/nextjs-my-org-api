import OrgSettingsForm from "./OrgSettingsForm";

export default async function AdminDashboard() {

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)] w-full p-4">
      <div className="bg-surface rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] p-8 px-10 max-w-[900px] w-[90%] animate-[fadeInScale_0.6s_ease-out]">
        <h1 className="text-[2rem] font-bold text-app-text mb-1 text-center [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">Admin Dashboard</h1>
        <p className="text-[0.95rem] text-text-muted text-center mb-8 font-normal">Manage your organization settings</p>
        {/* 👇 change code  */}
        <OrgSettingsForm />
        {/* 👆 change code  */}
      </div>
    </div>
  );
}
