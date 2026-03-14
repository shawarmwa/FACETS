"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    if (response?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full rounded border p-2" name="email" type="email" placeholder="Email" required />
        <input
          className="w-full rounded border p-2"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded bg-blue-600 p-2 text-white" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}
