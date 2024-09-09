import { getUserServer } from "@/actions/auth-actions";
import { redirect } from "next/navigation";
import React from "react";

const AdminPage = async () => {
  const user = await getUserServer();

  if (!user || !user.role || user.role !== "admin") {
    return (
      <div className="flex min-h-custom flex-col items-center justify-center gap-5 w-full">
        <h1 className="text-3xl font-bold">No estas Autorizado</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-custom flex-col items-center justify-center gap-5 w-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default AdminPage;
