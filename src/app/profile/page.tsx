// app/profile/page.tsx
import { auth } from "@/auth";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex min-h-custom flex-col items-center justify-center p-24">
        <h1 className="text-3xl font-bold mb-5">No estas Autenticado</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-custom flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-5">Profile</h1>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
