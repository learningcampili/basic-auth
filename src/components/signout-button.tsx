import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red 800"
      >
        Sign Out
      </button>
    </form>
  );
}
