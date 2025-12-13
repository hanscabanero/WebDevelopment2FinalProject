"use client";

import { useRouter } from "next/navigation";
import { useUserAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function SignInPage() {
  const { user, gitHubSignIn } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (err) {
      console.error("GitHub sign-in failed:", err);
    }
  };

  if (user === undefined) return null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 to-green-950">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-900 mb-2">
          Welcome to College Suite
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to manage your budget, tasks, and journal in one place.
        </p>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-900 hover:bg-green-800 text-white rounded-lg shadow transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.262.793-.583 0-.288-.01-1.05-.016-2.062-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.304-.536-1.528.117-3.184 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.404c1.018.005 2.043.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.656.243 2.88.12 3.184.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.622-5.48 5.92.432.372.816 1.102.816 2.222 0 1.606-.015 2.898-.015 3.293 0 .324.19.7.8.58C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Sign in with GitHub
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Secure authentication powered by GitHub
        </p>
      </div>
    </main>
  );
}
