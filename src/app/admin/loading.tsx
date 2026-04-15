/**
 * Streaming loading UI for the /admin route.
 * Shown automatically by Next.js while admin/page.tsx is fetching data server-side.
 */
export default function AdminLoading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-72px)] w-full p-4">
      <div className="bg-surface-2 rounded-[15px] shadow-[0_15px_40px_rgba(0,0,0,0.4)] p-12 text-center">
        <div className="text-[1.8rem] font-medium text-text-muted animate-[pulse_1.5s_infinite_ease-in-out]">
          Loading admin dashboard...
        </div>
      </div>
    </div>
  );
}
