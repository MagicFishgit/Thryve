"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import LiquidEther from "@/components/LiquidEther";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      //Step 1: Register user only with username, email and password. Apparently because something to do with strapi not accepting post requests for custom fields will investigate later.
      const registerRes = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
        username: formData.email,
        email: formData.email,
        password: formData.password,
      });

      const jwt = registerRes.data.jwt;
      const userId = registerRes.data.user.id;

      //Step 2: Update the user with firstName and lastName.
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userId}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!registerRes?.error) {
        toast.success("Registration successful!");
        router.replace("/login");
      }

    }catch(error){
      toast.error(error?.response?.data?.error?.message || "Registration failed. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="relative h-dvh">
      <LiquidEther autoDemo={false} className="absolute inset-0">
        {/* NAV (optional) */}
        <header className="absolute inset-x-0 top-0 z-20 px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-cut-transparent.png"
                alt="Thryve"
                width={120}
                height={28}
                priority
              />
              <span className="sr-only">Home</span>
            </Link>

            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* MAIN — *not* full-height; we add vertical padding so it never “touches” top/bottom */}
        <main className="relative z-10 grid min-h-dvh place-items-center px-4">
          <Card className="border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full max-w-3xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>
                Sign up to start{" "}
                <strong style={{ color: "#14b8a6" }}>Thryving.</strong>
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Two-column layout on md+, stacked on mobile */}
              <div className="flex flex-col gap-6 md:flex-row">
                {/* LEFT: Register form */}
                <div className="flex-1">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium"
                        >
                          First name
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          autoComplete="given-name"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="e.g., John"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium"
                        >
                          Last name
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="e.g., Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    {/* Add confirm password or other fields here */}

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account…" : "Create account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="underline underline-offset-4"
                      >
                        Log in
                      </Link>
                    </p>
                  </form>
                </div>

                {/* Divider (desktop) */}
                <div className="hidden w-px self-stretch bg-border md:block" />

                {/* RIGHT: Social sign-in */}
                <div className="flex-1">
                  {/* Divider (mobile) */}
                  <div className="mb-4 block md:hidden">
                    <div className="h-px bg-border" />
                    <div className="mt-2 text-center text-xs uppercase text-muted-foreground">
                      or
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                          fill="currentColor"
                        />
                      </svg>
                      Continue with Apple
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    By continuing you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline underline-offset-4"
                    >
                      Terms
                    </Link>{" "}
                    &{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-4"
                    >
                      Privacy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </LiquidEther>
    </div>
  );
}
