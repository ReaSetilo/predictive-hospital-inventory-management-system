// app/routes/sign-in.tsx (continued)
import { Link, useNavigation } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useState } from "react";

export default function SignIn() {
  const { signInWithEmail } = useAuth();
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);
  const isSubmitting = navigation.state === "submitting";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = await signInWithEmail(email, password);
    if (error) setError(error.message);
  };

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
            </Link>
            <h1 className="p-28-bold text-dark-100">MediCare</h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Unlock the future of health‑care
            </h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with email to manage, and keep track of medical supplies with ease.
            </p>
          </article>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <ButtonComponent
              type="submit"
              className="button-class !h-11 !w-full"
              disabled={isSubmitting}
            >
              <span className="p-18-semibold text-white">
                {isSubmitting ? "Signing in…" : "Sign in with Email"}
              </span>
            </ButtonComponent>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}