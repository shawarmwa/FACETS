"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role")
      })
    });

    if (!response.ok) {
      setError("Registration failed.");
      return;
    }

    router.push("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <h1 className="mb-4 text-2xl font-semibold">Register</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full rounded border p-2" name="name" placeholder="Full Name" required />
        <input className="w-full rounded border p-2" name="email" type="email" placeholder="Email" required />
        <input
          className="w-full rounded border p-2"
          name="password"
          type="password"
          minLength={8}
          placeholder="Password"
          required
        />
        <select className="w-full rounded border p-2" name="role" required>
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </select>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded bg-blue-600 p-2 text-white" type="submit">
          Create account
        </button>
      </form>
    </main>
  );
}
