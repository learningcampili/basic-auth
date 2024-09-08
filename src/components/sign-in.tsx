import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-500"
      >
        Signin with Google
      </button>
    </form>
  );
}
