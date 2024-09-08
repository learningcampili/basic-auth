//import { compileWelcomeTemplate, sendMail } from "@/lib/mail";

export default async function Home() {
  // const send = async () => {
  //   "use server";
  //   await sendMail({
  //     to: "learning.campili@gmail.com",
  //     name: "Learning Campili",
  //     subject: "Test",
  //     body: compileWelcomeTemplate(
  //       "Learning Campili",
  //       "https://www.youtube.com/watch?v=81lt0qcXtHE",
  //       "PetFinder"
  //     ),
  //   });
  // };
  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-5 w-full">
      <h1 className="text-3xl font-bold ">Home Page</h1>
      {/* <form action={send}>
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded-lg">
          send email
        </button>
      </form> */}
    </div>
  );
}
