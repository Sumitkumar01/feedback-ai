"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <section>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </section>
    );
  }
  return (
    <section className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-2xl font-bold drop-shadow-2xl shadow-orange-500">
        Not signed in ?
      </h1>
      <button
        onClick={() => signIn()}
        className="text-orange-500 active:scale-50 shadow-2xl shadow-orange-500 mt-14 border-2 border-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white hover:shadow-none transition duration-1000 ease-in-out"
      >
        {" "}
        Sign in
      </button>
    </section>
  );
}
